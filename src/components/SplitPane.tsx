"use client";
import Divider from "@/components/Divider";
import { SplitPane as OriginalSplitPane } from "react-split-pane";

export default function SplitPane({ children }: { children: React.ReactNode }) {
  return (
    <OriginalSplitPane
      direction="horizontal"
      className="h-full w-full"
      divider={Divider}
    >
      {children}
    </OriginalSplitPane>
  );
}
