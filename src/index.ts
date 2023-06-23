module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Strapi.Strapi }) {
    if (process.env.NODE_ENV === "development") {
      const adminUserExists = await strapi.service("admin::user").exists();

      if (adminUserExists) {
        console.info("Admin user already exists. Skipping admin user creation");
        return;
      }

      const adminRole = await strapi.service("admin::role").getSuperAdmin();

      if (!adminRole) {
        console.info(
          "Super Admin role doesn't exist. Skipping admin user creation"
        );
        return;
      }

      await strapi.service("admin::user").create({
        username: "Admin",
        password: "lets-dev",
        firstname: "John",
        lastname: "Doe",
        email: "dev@mokupona.ch",
        blocked: false,
        isActive: true,
        roles: [adminRole.id],
      });
    }
  },
};
