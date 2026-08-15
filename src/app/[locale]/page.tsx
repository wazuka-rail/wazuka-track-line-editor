import Map from "@/components/Map";
import SplitPane from "@/components/SplitPane";
import TrackEditor from "@/components/TrackEditor";
import TrackSelector from "@/components/TrackSelector";
import { getTranslations } from "next-intl/server";
import { Pane } from "react-split-pane";

export async function generateMetadata() {
  const t = await getTranslations("Common");
  return {
    title: t("appname"),
  };
}

export default function Home() {
  return (
    <SplitPane>
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
