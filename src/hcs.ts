import { hc } from "hono/client";
import superjson from "superjson";

export type Callback = (opts: { path: string[]; args: any[] }) => unknown;

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

export const hcs: typeof hc = (baseUrl, options) =>
  createProxy(async ({ path, args }) => {
    let client: any = hc(baseUrl, options);

    for (const part of path) {
      client = client[part];
    }

    const res = await client(...args);

    if (res instanceof Response && res.headers.get("x-superjson") === "true") {
      res.json = async () => {
        const text = await res.text();
        return superjson.parse(text);
      };
    }

    return res;
  }, []) as any;
