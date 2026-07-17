"use client";

import { useTranslations } from "next-intl";

const TrackEditor = () => {
  const t = useTranslations("TrackEditor");
  return (
    <div>
      {t("title")}
    </div>
  );
};

export default TrackEditor;
