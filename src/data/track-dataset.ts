export type Track = {
  id: string;
  name: string;
};

export type TrackGroup = {
  id: string;
  name: string;
  tracks: Track[];
};

export type TrackDataset = {
  id: string;
  name: string;
  version: number;
  trackGroups: TrackGroup[];
};
