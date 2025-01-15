import { hcs } from "hono-superjson/client";
import { AppRoute } from "./server";

const client = hcs<AppRoute>("http://localhost:8787/");

const url = client.currentDate.$url();
console.log("request url:", url);

const res = await client.currentDate.$get();
const data = await res.json();
console.log("response data:", data);

const output = document.getElementById("output")!;
output.textContent = `The current date is ${data.date}`;
