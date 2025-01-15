import { hcs } from "hono-superjson/client";
import { AppRoute } from "./server";

const client = hcs<AppRoute>("http://localhost:8787/");

async function getCurrentDate() {
  const url = client.currentDate.$url();
  const res = await client.currentDate.$get();
  const data = await res.json();

  console.log(url, data);
}

getCurrentDate();
