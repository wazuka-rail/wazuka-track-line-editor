import { getTranslations } from "next-intl/server";

export default async function TrackSelector() {
  const t = await getTranslations("TrackSelector");

  return (
    <div>
      {t("title")}
    </div>
  );
}
