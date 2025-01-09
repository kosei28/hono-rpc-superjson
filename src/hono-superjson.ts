import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import superjson from "superjson";
import {
  HeaderRecord,
  ResponseOrInit,
  SuperJSONRespondReturn,
} from "./types/hono";
import { SuperJSONValue } from "./types/superjson";

export const jsonS = <
  T extends SuperJSONValue,
  U extends ContentfulStatusCode = ContentfulStatusCode
>(
  c: Context,
  object: T,
  arg?: U | ResponseOrInit<U>,
  headers?: HeaderRecord
): SuperJSONRespondReturn<T, U> => {
  const body = superjson.stringify(object);
  c.header("content-type", "application/json; charset=UTF-8");
  c.header("x-superjson", "true");
  return (
    typeof arg === "number"
      ? c.newResponse(body, arg, headers)
      : c.newResponse(body, arg)
  ) as any;
};
