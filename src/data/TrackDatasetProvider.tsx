"use client";

import initialTrackDataset from "@/data/track-dataset.json";
import { parseTrackDatasetFromJson } from "@/data/trackDatasetIO";
import { TrackDataset } from "@/data/trackDatasetSchema";
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type TrackDatasetContextValue = {
  activeTrackId: string | null;
  dataset: TrackDataset;
  replaceDataset: (dataset: TrackDataset) => void;
  resetDataset: () => void;
  serializeDataset: () => string;
  setActiveTrackId: (trackId: string | null) => void;
  updateDataset: (updater: (dataset: TrackDataset) => TrackDataset) => void;
};

const TrackDatasetContext = createContext<TrackDatasetContextValue | null>(
  null,
);

const cloneDataset = (dataset: TrackDataset): TrackDataset =>
  structuredClone(dataset);

export const TrackDatasetProvider = ({ children }: PropsWithChildren) => {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [dataset, setDataset] = useState<TrackDataset>(() =>
    cloneDataset(parseTrackDatasetFromJson(initialTrackDataset))
  );

  const replaceDataset = useCallback((nextDataset: TrackDataset) => {
    setDataset(cloneDataset(nextDataset));
  }, []);

  const resetDataset = useCallback(() => {
    setDataset(cloneDataset(parseTrackDatasetFromJson(initialTrackDataset)));
  }, []);

  const updateDataset = useCallback(
    (updater: (currentDataset: TrackDataset) => TrackDataset) => {
      setDataset((currentDataset) =>
        cloneDataset(updater(cloneDataset(currentDataset)))
      );
    },
    [],
  );

  const serializeDataset = useCallback(
    () => JSON.stringify(dataset, null, 2),
    [dataset],
  );

  return (
    <TrackDatasetContext.Provider
      value={{
        activeTrackId,
        dataset,
        replaceDataset,
        resetDataset,
        serializeDataset,
        setActiveTrackId,
        updateDataset,
      }}
    >
      {children}
    </TrackDatasetContext.Provider>
  );
};

export const useTrackDataset = () => {
  const context = useContext(TrackDatasetContext);

  if (context === null) {
    throw new Error(
      "`useTrackDataset` must be used within `TrackDatasetProvider`.",
    );
  }

  return context;
};

export default TrackDatasetProvider;
