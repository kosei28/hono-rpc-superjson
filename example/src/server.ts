import { Hono } from "hono";
import { cors } from "hono/cors";
import { jsonS } from "hono-superjson";
import { serve } from "@hono/node-server";

export const app = new Hono();

app.use(
  cors({
    origin: "http://localhost:5173",
    exposeHeaders: ["x-superjson"],
  })
);

const route = app.get("/currentDate", (c) => {
  return jsonS(c, {
    date: new Date(),
  });
});

export type AppRoute = typeof route;

serve({
  fetch: app.fetch,
  port: 8787,
});
