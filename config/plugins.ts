export default ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: env("SMTP_USERNAME"),
        defaultReplyTo: env("SMTP_USERNAME"),
      },
    },
  },
  upload: {
    config: {
      providerOptions: {
        provider: "local",
        providerOptions: {
          sizeLimit: 100000,
        },
      },
    },
  },
  documentation: {
    config: {
      info: {
        version: "0.1.0",
        title: "The mokupona api documentation",
        description: "",
        termsOfService: "",
        contact: {
          name: "",
          email: "",
          url: "",
        },
        license: {
          name: "",
          url: "",
        },
      },
      "x-strapi-config": {
        path: "/documentation",
        plugins: [],
        mutateDocumentation: null,
      },
      servers: [],
      externalDocs: null,
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
});
