import { getTranslations } from "next-intl/server";

export default async function TrackEditor() {
  const t = await getTranslations("TrackEditor");

  return (
    <div>
      {t("title")}
    </div>
  );
}
