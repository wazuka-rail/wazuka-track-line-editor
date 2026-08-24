"use client";
import Divider from "@/components/Divider";
import {
  Pane as OriginalPane,
  SplitPane as OriginalSplitPane,
} from "react-split-pane";

export const Pane = OriginalPane;

export default function SplitPane({ children }: { children: React.ReactNode }) {
  return (
    <OriginalSplitPane
      direction="horizontal"
      divider={Divider}
    >
      {children}
    </OriginalSplitPane>
  );
}
