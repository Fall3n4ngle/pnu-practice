import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { myStructure } from "./deskStructure";

import { apiVersion } from "./sanity/env";
import { schema } from "./sanity/schema";

export default defineConfig({
  basePath: "/studio",
  projectId: "9ot4fejx",
  dataset: "production",
  schema,
  plugins: [
    deskTool({
      structure: myStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
