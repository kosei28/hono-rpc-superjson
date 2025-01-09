import { hcs } from "./hcs";
import { AppRoute } from "./server";

const client = hcs<AppRoute>("http://localhost:8787/");

async function getCurrentDate() {
  const res = await client.currentDate.$get();
  const data = await res.json();

  console.log(data);
}

getCurrentDate();
