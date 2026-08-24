import * as z from "zod";

const kilometrage = z.string().regex(/^[ ]*-?\d+k\d{3}m\d{0,3}$/);

const bearing = z.number().min(0).max(360).nullable(); // in [deg]
const angle = z.number().min(-180).max(180); // in [deg]

const height = z.number().min(-1000).max(10000).nullable(); // in [m]

const datasetId = z.string();
const groupId = z.string();
const trackId = z.string();
const trackNodeId = z.string();
const trackEdgeId = z.string();

const llhPos = z.object({
  lat: angle,
  lon: angle,
  h: height,
});

export type LlhPos = z.infer<typeof llhPos>;

const marker = z.literal([
  "rem", // Remark
  "nod", // Node (geographical point)

  /* Curve */
  "btc", // Begin of Transition Curve
  "etc", // End of Transition Curve
  "bcc", // Begin of Circular Curve
  "ecc", // End of Circular Curve

  /* Gradient */
  "bvc", // Begin of Vertical Curve
  "evc", // End of Vertical Curve

  /* Tunnel */
  "btn", // Begin of Tunnel
  "etn", // End of Tunnel

  /* Bridge */
  "bbr", // Begin of Bridge
  "ebr", // End of Bridge
]);

export type Marker = z.infer<typeof marker>;

const paramsRem = z.object({
  m: z.literal("rem"), // Remark
});

export type ParamsRem = z.infer<typeof paramsRem>;

const paramsNod = z.object({
  m: z.literal("nod"), // Node (geographical point)
  refId: trackNodeId,
  km: kilometrage,
  pos: llhPos,
  bearing: bearing,
  hTol: z.number().nonnegative(), // horizontal tolerance [m]
  vTol: z.number().nonnegative(), // vertical tolerance [m]
});

export type ParamsNod = z.infer<typeof paramsNod>;

const trackProperty = z.tuple([
  z.number(), // distance from the start node [m]
  z.discriminatedUnion("m", [
    paramsRem,
    paramsNod,
  ]), // optional parameters
  z.string(), // comment
]);

export type TrackProperty = z.infer<typeof trackProperty>;

const trackNode = z.object({
  id: trackNodeId,
  name: z.string(),
  pos: llhPos,
});

export type TrackNode = z.infer<typeof trackNode>;

const trackEdge = z.object({
  id: trackEdgeId,
  name: z.string(),
  startNodeId: trackNodeId,
  endNodeId: trackNodeId,
  properties: z.array(trackProperty),
});

export type TrackEdge = z.infer<typeof trackEdge>;

const trackGroup = z.object({
  id: groupId,
  name: z.string(),
  trackIds: z.array(trackId),
});

export type TrackGroup = z.infer<typeof trackGroup>;

export const trackDataset = z.object({
  formatVersion: z.literal("0.1.0"),
  id: datasetId,
  name: z.string(),
  version: z.string(),
  geoSrid: z.string(),
  planeSrid: z.string(),
  trackGroups: z.array(trackGroup),
  trackNodes: z.array(trackNode),
  tracks: z.array(trackEdge),
});

export type TrackDataset = z.infer<typeof trackDataset>;
