import { Hono } from "hono";
import { jsonS } from "./hono-superjson";
import { serve } from "@hono/node-server";

export const app = new Hono();

const route = app.get("/currentDate", (c) => {
  return jsonS(c, {
    datetime: new Date(),
  });
});

export type AppRoute = typeof route;

serve({
  fetch: app.fetch,
  port: 8787,
});
