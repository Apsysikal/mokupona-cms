import type { Schema, Attribute } from '@strapi/strapi';

export interface LocationAddress extends Schema.Component {
  collectionName: 'components_location_addresses';
  info: {
    displayName: 'Address';
    description: '';
  };
  attributes: {
    street: Attribute.String & Attribute.Required;
    number: Attribute.String;
    zipcode: Attribute.String & Attribute.Required;
    city: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'location.address': LocationAddress;
    }
  }
}
