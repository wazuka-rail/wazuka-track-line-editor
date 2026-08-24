import {
  parseTrackDatasetFromJson,
  toKilometrage,
  toMetersWithCompletion,
  toMetres,
} from "@/data/trackDatasetIO";
import {
  TrackDataset,
  TrackEdge,
  TrackGroup,
  TrackNode,
  TrackProperty,
} from "@/data/trackDatasetSchema";
import { describe, expect, expectTypeOf, it } from "vitest";

describe("parseTrackDatasetFromJson", () => {
  const jsonNoData = {
    formatVersion: "0.1.0",
    id: "nodata-0.1.0",
    name: "No Data (v0.1.0)",
    version: "test",
    geoSrid: "EPSG:4326",
    planeSrid: "EPSG:6690",
    trackGroups: [] as any[],
    trackNodes: [] as any[],
    tracks: [] as any[],
  };
  const propN1 = [0.0, {
    m: "nod",
    refId: "n1",
    km: "0k000m000",
    pos: { lat: 0, lon: 0, h: 0 },
    bearing: null,
    hTol: 0,
    vTol: 0,
  }, "N1"];

  const propN2 = [0.0, {
    m: "nod",
    refId: "n2",
    km: "0k000m000",
    pos: { lat: 0, lon: 0, h: 0 },
    bearing: null,
    hTol: 0,
    vTol: 0,
  }, "N2"];

  it("should parse valid JSON (\"No Data\") into TrackDataset", () => {
    const dataset = parseTrackDatasetFromJson(jsonNoData);
    expectTypeOf(dataset).toMatchObjectType<TrackDataset>();
    expect(dataset.formatVersion).toBe("0.1.0");
    expect(dataset.id).toBe("nodata-0.1.0");
    expect(dataset.name).toBe("No Data (v0.1.0)");
    expect(dataset.version).toBe("test");
    expect(dataset.geoSrid).toBe("EPSG:4326");
    expect(dataset.planeSrid).toBe("EPSG:6690");
    expect(dataset.trackGroups).toHaveLength(0);
    expect(dataset.trackNodes).toHaveLength(0);
    expect(dataset.tracks).toHaveLength(0);
  });

  it("should parse valid JSON (\"Minimal\") into TrackDataset", () => {
    let jsonMinimal = structuredClone(jsonNoData);
    jsonMinimal.id = "minimal-0.1.0";
    jsonMinimal.name = "Minimal (v0.1.0)";
    jsonMinimal.trackGroups = [
      {
        id: "g1",
        name: "Group 1",
        trackIds: ["e1"],
      },
    ];
    jsonMinimal.trackNodes = [
      {
        id: "n1",
        name: "Node 1",
        pos: { lat: 0, lon: 0, h: 0 },
      },
      {
        id: "n2",
        name: "Node 2",
        pos: { lat: 0, lon: 0, h: 0 },
      },
    ];
    jsonMinimal.tracks = [
      {
        id: "e1",
        name: "Edge 1",
        startNodeId: "n1",
        endNodeId: "n2",
        properties: [propN1, propN2],
      },
    ];
    const dataset = parseTrackDatasetFromJson(jsonMinimal);
    expectTypeOf(dataset).toEqualTypeOf<TrackDataset>();
    expect(dataset.formatVersion).toBe("0.1.0");
    expect(dataset.id).toBe("minimal-0.1.0");
    expect(dataset.name).toBe("Minimal (v0.1.0)");

    expect(dataset.trackGroups).toHaveLength(1);
    const group1 = dataset.trackGroups[0];
    expectTypeOf(group1).toEqualTypeOf<TrackGroup>();
    expect(group1.id).toBe("g1");
    expect(group1.name).toBe("Group 1");
    expect(group1.trackIds).toEqual(["e1"]);

    expect(dataset.trackNodes).toHaveLength(2);
    const node1 = dataset.trackNodes[0];
    expectTypeOf(node1).toEqualTypeOf<TrackNode>();
    expect(node1.id).toBe("n1");
    expect(node1.name).toBe("Node 1");
    expect(node1.pos).toEqual({ lat: 0, lon: 0, h: 0 });
    const node2 = dataset.trackNodes[1];
    expectTypeOf(node2).toEqualTypeOf<TrackNode>();
    expect(node2.id).toBe("n2");
    expect(node2.name).toBe("Node 2");
    expect(node2.pos).toEqual({ lat: 0, lon: 0, h: 0 });

    expect(dataset.tracks).toHaveLength(1);
    const edge1 = dataset.tracks[0];
    expectTypeOf(edge1).toEqualTypeOf<TrackEdge>();
    expect(edge1.id).toBe("e1");
    expect(edge1.name).toBe("Edge 1");
    expect(edge1.startNodeId).toBe("n1");
    expect(edge1.endNodeId).toBe("n2");

    expect(edge1.properties).toHaveLength(2);
    expectTypeOf(edge1.properties[0]).toEqualTypeOf<TrackProperty>();
    expect(edge1.properties[0]).toEqual(propN1);
    expect(edge1.properties[1]).toEqual(propN2);
  });

  it("should throw an error for invalid JSON", () => {
    const jsonInvalidVer = structuredClone(jsonNoData);
    jsonInvalidVer.formatVersion = "0.2.0";
    expect(() => parseTrackDatasetFromJson(jsonInvalidVer)).toThrow();

    const { name: _name, ...jsonMissingField } = structuredClone(jsonNoData);
    expect(() => parseTrackDatasetFromJson(jsonMissingField)).toThrow();
  });
});

describe("toMetres", () => {
  it("should convert kilometrage to metres correctly", () => {
    expect(toMetres(" 12k345m678")).toBe(12345.678);
    expect(toMetres("0k000m")).toBe(0);
    expect(toMetres("-1k234m5")).toBe(-1234.5);
  });

  it("should throw an error for invalid formats", () => {
    expect(() => toMetres("invalid")).toThrow(
      "Invalid kilometrage format: invalid",
    );
    expect(() => toMetres("1k23m456")).toThrow(
      "Invalid kilometrage format: 1k23m456",
    );
    expect(() => toMetres("1k234m5678")).toThrow(
      "Invalid kilometrage format: 1k234m5678",
    );
  });
});

describe("toKilometrage", () => {
  it("should convert metres to kilometrage correctly", () => {
    expect(toKilometrage(12345.678)).toBe(" 12k345m678");
    expect(toKilometrage(0)).toBe("  0k000m000");
    expect(toKilometrage(-1234.5)).toBe(" -1k234m500");
  });
});

describe("toMetersWithCompletion", () => {
  it("should convert kilometrage to metres correctly with completion", () => {
    expect(toMetersWithCompletion(" 12k345m678")).toBe(12345.678);
    expect(toMetersWithCompletion("0k000m")).toBe(0);
    expect(toMetersWithCompletion("-1k234m5")).toBe(-1234.5);
    expect(toMetersWithCompletion("1k")).toBe(1000);
    expect(toMetersWithCompletion("1k23")).toBe(1230);
    expect(toMetersWithCompletion("1k234")).toBe(1234);
    expect(toMetersWithCompletion("1k23m")).toBe(1023);
    expect(toMetersWithCompletion("1k234m5")).toBe(1234.5);
    expect(toMetersWithCompletion("1k234m56")).toBe(1234.56);
    expect(toMetersWithCompletion("1k234m567")).toBe(1234.567);
    expect(toMetersWithCompletion("1234m5")).toBe(1234.5);
  });

  it("should return 0 for invalid formats", () => {
    expect(toMetersWithCompletion("invalid")).toBe(0);
    expect(toMetersWithCompletion("1k23m4567")).toBe(0);
    expect(toMetersWithCompletion("1k234m5678")).toBe(0);
  });
});
