import { trackDataset } from "@/data/trackDatasetSchema";
import { describe, expect, it } from "vitest";

// @ts-ignore
import jsonSchemaString from "@/data/track-dataset.schema.json?raw";

describe("JSON schema", () => {
  it("should be defined", () => {
    const expectedSchema = trackDataset.toJSONSchema({
      io: "input",
      reused: "ref",
    });
    const expectedSchemaString = JSON.stringify(expectedSchema, null, 2) + "\n";
    if (expectedSchemaString !== jsonSchemaString) {
      console.log("Expected schema:", expectedSchemaString);
    }
    expect(expectedSchemaString).toBe(jsonSchemaString);
  });
});
