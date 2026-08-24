"use client";

import TreeView, { type TreeViewItem } from "@/components/ui/TreeView";
import { useTrackDataset } from "@/data/TrackDatasetProvider";
import { useTranslations } from "next-intl";

export default function TrackSelector() {
  const t = useTranslations("TrackSelector");
  const { activeTrackId, dataset, setActiveTrackId } = useTrackDataset();
  const treeItemIdByTrackId = new Map<string, string>();
  const trackIdByTreeItemId = new Map<string, string>();
  const items: TreeViewItem[] = dataset.trackGroups.map((group) => ({
    id: group.id,
    label: group.name,
    children: group.trackIds.map((trackId) => {
      const treeItemId = `${group.id}-${trackId}`;
      treeItemIdByTrackId.set(trackId, treeItemId);
      trackIdByTreeItemId.set(treeItemId, trackId);

      return {
        id: treeItemId,
        label: dataset.tracks.find((track) => track.id === trackId)?.name
          ?? trackId,
      };
    }),
  }));
  const activeTreeItemId = activeTrackId === null
    ? null
    : treeItemIdByTrackId.get(activeTrackId) ?? null;

  const handleSelect = (treeItemId: string) => {
    const trackId = trackIdByTreeItemId.get(treeItemId);
    if (trackId !== undefined) setActiveTrackId(trackId);
  };

  return (
    <div className="h-full min-h-0">
      <section
        aria-labelledby="track-selector-title"
        className="flex h-full min-h-0 flex-col gap-3"
      >
        <h2 id="track-selector-title">
          {t("title")}
        </h2>
        <TreeView
          ariaLabel={t("treeLabel")}
          defaultExpandedIds={dataset.trackGroups.map(({ id }) => id)}
          items={items}
          onSelect={handleSelect}
          selectedId={activeTreeItemId}
        />
      </section>
    </div>
  );
}
