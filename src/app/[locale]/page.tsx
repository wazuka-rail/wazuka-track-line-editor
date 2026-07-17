"use client";

import Divider from "@/components/Divider";
import Map from "@/components/Map";
import TrackEditor from "@/components/TrackEditor";
import TrackSelector from "@/components/TrackSelector";
import { Pane, SplitPane } from "react-split-pane";

export default function Home() {
  return (
    <SplitPane
      direction="horizontal"
      className="h-full v-full"
      divider={Divider}
    >
      <Pane>
        <TrackSelector />
      </Pane>
      <Pane>
        <TrackEditor />
      </Pane>
      <Pane>
        <Map />
      </Pane>
    </SplitPane>
  );
}
