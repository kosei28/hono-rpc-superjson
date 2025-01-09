import type { TypedResponse } from "hono";
import { ResponseHeader } from "hono/utils/headers";
import type { ContentfulStatusCode, StatusCode } from "hono/utils/http-status";
import { BaseMime } from "hono/utils/mime";
import { SuperJSONValue } from "./superjson";

type ResponseHeadersInit =
  | [string, string][]
  | Record<"Content-Type", BaseMime>
  | Record<ResponseHeader, string>
  | Record<string, string>
  | Headers;

interface ResponseInit<T extends StatusCode = StatusCode> {
  headers?: ResponseHeadersInit;
  status?: T;
  statusText?: string;
}

export type ResponseOrInit<T extends StatusCode = StatusCode> =
  | ResponseInit<T>
  | Response;

export type HeaderRecord =
  | Record<"Content-Type", BaseMime>
  | Record<ResponseHeader, string | string[]>
  | Record<string, string | string[]>;

export type SuperJSONRespondReturn<
  T extends SuperJSONValue,
  U extends ContentfulStatusCode
> = Response & TypedResponse<T, U, "json">;
