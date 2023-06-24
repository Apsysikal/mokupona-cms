import { faker } from "@faker-js/faker";

export async function createEvent(strapi: Strapi.Strapi) {
  const data = {
    title: faker.lorem.words({ min: 2, max: 5 }),
    subtitle: faker.lorem.words({ min: 2, max: 5 }),
    summary: faker.lorem.lines({ min: 4, max: 6 }),
    description: faker.lorem.paragraphs({ min: 2, max: 5 }),
    tags: faker.lorem.words(3),
    date: faker.date.soon({ days: 10 }),
    signupDate: faker.date.soon({ days: 5 }),
    slots: faker.number.int({ min: 5, max: 30 }),
    price: faker.number.int({ min: 15, max: 40 }),
    address: {
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      zipcode: faker.location.zipCode("####"),
      city: faker.location.city(),
    },
    cover: [1],
    event_responses: [],
  };

  return strapi.entityService.create("api::event.event", {
    data,
  });
}
