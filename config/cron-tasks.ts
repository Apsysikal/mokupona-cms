import type { Strapi } from "@strapi/strapi";
import { addDays, isAfter } from "date-fns";
import type { ApiEventResponseEventResponse } from "../schemas";
import "./email";
import { sendEmailTemplate } from "./email";
import { v4 as uuid } from "uuid";

type AttributeMap = {
  string: string;
  text: string;
  email: string;
  datetime: string;
  boolean: boolean;
  enumeration: string;
  relation: unknown;
};
type ResponseObject = ApiEventResponseEventResponse["attributes"];
type Keys = keyof ResponseObject;
type Value<K extends Keys> = ResponseObject[K];
type EventResponse = {
  [K in Keys]: AttributeMap[Value<K>["type"]];
} & { id: number };

type Event = {
  id: number;
  title: string;
  slots: number;
  event_responses: EventResponse[];
};

export default {
  checkMailQueue: {
    task: async ({ strapi }: { strapi: Strapi }) => {
      const events = await getEvents(strapi);
      events.forEach(async (event) => {
        const pendingInvitations = getPendingInvitations(event);
        const expiredInvitations = getExpiredInvitations(pendingInvitations);
        const confirmedInvitations = getConfirmedInvitations(event);
        const freeSlots = calculateFreeSlots(
          event.slots,
          confirmedInvitations,
          pendingInvitations,
          expiredInvitations
        );
        expiredInvitations.forEach(async ({ id }) => {
          await updateEventResponse(strapi, id, { state: "invite_cancelled" });
        });
        if (freeSlots <= 0) return;
        const waitingInvitations = await getWaitingEventResponsesForEvent(
          strapi,
          event.id,
          freeSlots
        );
        waitingInvitations.forEach(async ({ id, name, email }) => {
          const token = generateToken();
          const host =
            process.env.NODE_ENV === "production"
              ? "https://www.mokupona.com"
              : "http://localhost:3000";
          const query = new URLSearchParams({ id: String(id), email, token });
          const link = `${host}/dinners/${event.id}/confirm?${query}`;
          await sendEmailTemplate(
            email,
            `Confirm your participation in the ${event.title} event.`,
            `We reserved a slot in the ${event.title} event for you. Confirm your participation by clicking on the link below. ${link}`,
            "seat-confirmation.html",
            {
              title: event.title,
              name,
              link,
            }
          );
          await updateEventResponse(strapi, id, {
            state: "invite_sent",
            invite_date: new Date().toISOString(),
            confirm_token: token,
          });
        });
      });
    },
    options: {
      rule: "* * * * *",
    },
  },
};

async function getEvents(strapi: Strapi): Promise<Event[]> {
  return strapi.entityService.findMany("api::event.event", {
    filters: {
      date: { $gt: new Date().toISOString() },
    },
    fields: ["id", "slots", "title"],
    populate: ["event_responses"],
  });
}

async function getWaitingEventResponsesForEvent(
  strapi: Strapi,
  eventId: number,
  limit?: number
): Promise<Pick<EventResponse, "id" | "email" | "name">[]> {
  return strapi.entityService.findMany("api::event-response.event-response", {
    filters: {
      $and: [
        {
          event: { id: { $eq: eventId } },
          state: { $eq: "waiting" },
        },
      ],
    },
    fields: ["id", "email", "name"],
    limit,
  });
}

async function updateEventResponse(
  strapi: Strapi,
  id: number,
  data: Partial<EventResponse>
) {
  return strapi.entityService.update("api::event-response.event-response", id, {
    data,
  });
}

function calculateFreeSlots(
  total: number,
  confirmed: EventResponse[],
  pending: EventResponse[],
  expired: EventResponse[]
): number {
  return total - confirmed.length - (pending.length - expired.length);
}

function getExpiredInvitations(responses: EventResponse[]) {
  const now = new Date();

  return responses.filter(({ invite_date }) => {
    const created = new Date(invite_date);
    const expiryDate = addDays(created, 1); // Expires after one day
    return isAfter(now, expiryDate);
  });
}

function getPendingInvitations(event: Event) {
  return event.event_responses.filter((response) => {
    return response.state === "invite_sent";
  });
}

function getConfirmedInvitations(event: Event) {
  return event.event_responses.filter((response) => {
    return response.state === "invite_confirmed";
  });
}

function getWaitingInvitations(event: Event) {
  return event.event_responses.filter((response) => {
    return response.state === "waiting";
  });
}

function generateToken() {
  return uuid();
}
