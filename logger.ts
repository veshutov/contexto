import { configure, getConsoleSink, getLogger } from "@logtape/logtape";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: "my-app", lowestLevel: "debug", sinks: ["console"] }
  ]
});

export const logger = getLogger();