module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT2", 1337),
  url: "https://www.lectonet.de/api",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "de4a9f1e828e11d712e4fea5fde780d1"),
    },
  },
});
