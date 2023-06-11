import ApplicationError from "@strapi/utils";
import { format } from "date-fns";
import { sendEmailTemplate } from "../../../../../config/email";

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    const { email, eventId } = getQueryParamsFromData(data);
    const response = await getEventResponseForEmailAndEventId({
      strapi,
      email,
      eventId,
    });

    if (response.length) {
      throw new ApplicationError(
        "EventResponse using this email for this event already exists"
      );
    }
  },
  async afterCreate({ params }) {
    const { data } = params;
    const { email, eventId } = getQueryParamsFromData(data);
    const event = await getEventById({ strapi, id: eventId });
    sendEmailTemplate(
      email,
      `We received your signup for the ${event.title} event`,
      `We received your signup for the ${event.title} event. You'll get an email to confirm your participation once we checked availability.`,
      "signup-received.html",
      {
        title: event.title,
        name: data.name,
        date: format(new Date(event.date), "do 'of' MMMM yyyy"),
      }
    );
  },
  async afterUpdate({ result }) {
    if (result.state !== "invite_confirmed") return;
    const response = await getEventResponseById({ strapi, id: result.id });
    const { event } = response;
    sendEmailTemplate(
      response.email,
      "Thank you for confirming",
      `Thank you for confirming your participation in the ${event.title} event.`,
      "seat-confirmed.html",
      {
        title: event.title,
        name: response.name,
        date: format(new Date(event.date), "do 'of' MMMM yyyy"),
        price: event.price,
      }
    );
  },
};

async function getEventResponseById({
  strapi,
  id,
}: {
  strapi: Strapi.Strapi;
  id: any;
}) {
  return strapi.entityService.findOne(
    "api::event-response.event-response",
    id,
    {
      populate: ["event"],
    }
  );
}

async function getEventById({
  strapi,
  id,
}: {
  strapi: Strapi.Strapi;
  id: any;
}) {
  return strapi.entityService.findOne("api::event.event", id);
}

async function getEventResponseForEmailAndEventId({
  strapi,
  email,
  eventId,
}: {
  strapi: Strapi.Strapi;
  email: any;
  eventId: any;
}) {
  return strapi.entityService.findMany("api::event-response.event-response", {
    filters: {
      $and: [
        {
          email,
          event: {
            id: { $eq: eventId },
          },
        },
      ],
    },
  });
}

function getQueryParamsFromData(data: any) {
  let eventId;

  if (Array.isArray(data.event?.connect)) {
    eventId = data.event.connect[0]?.id;
  } else {
    eventId = data.event;
  }

  if (!eventId) throw new ApplicationError("Event id must be provided");

  return {
    email: data.email,
    eventId,
  };
}
