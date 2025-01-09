import type { ClientRequestOptions, Hono } from "hono";
import { hc } from "hono/client";
import type { UnionToIntersection } from "hono/utils/types";
import superjson from "superjson";
import { Callback, Client } from "./types/hc";

const createProxy = (callback: Callback, path: string[]) => {
  const proxy: unknown = new Proxy(() => {}, {
    get(_obj, key) {
      if (typeof key !== "string" || key === "then") {
        return undefined;
      }
      return createProxy(callback, [...path, key]);
    },
    apply(_1, _2, args) {
      return callback({
        path,
        args,
      });
    },
  });
  return proxy;
};

export const hcs = <T extends Hono<any, any, any>>(
  baseUrl: string,
  options?: ClientRequestOptions
) =>
  createProxy(async ({ path, args }) => {
    let client: any = hc(baseUrl, options);

    for (const part of path) {
      client = client[part];
    }

    const res: Response = await client(...args);

    if (res.headers.get("x-superjson") === "true") {
      res.json = async () => {
        const text = await res.text();
        return superjson.parse(text);
      };
    }

    return res;
  }, []) as UnionToIntersection<Client<T>>;
