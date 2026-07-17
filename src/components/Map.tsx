"use client";

import { useTranslations } from "next-intl";

const Map = () => {
  const t = useTranslations("Map");

  return (
    <div>
      {t("title")}
    </div>
  );
};

export default Map;
