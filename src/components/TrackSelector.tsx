"use client";

import { useTranslations } from "next-intl";

const TrackSelector = () => {
  const t = useTranslations("TrackSelector");

  return (
    <div>
      {t("title")}
    </div>
  );
};

export default TrackSelector;
