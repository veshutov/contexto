import { configure, getConsoleSink, getLogger } from "@logtape/logtape";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: "1context", lowestLevel: "debug", sinks: ["console"] }
  ]
});

export const logger = getLogger();