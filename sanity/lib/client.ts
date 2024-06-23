import { createClient } from "next-sanity";

import { apiVersion, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset: "production",
  projectId: "9ot4fejx",
  useCdn,
});
