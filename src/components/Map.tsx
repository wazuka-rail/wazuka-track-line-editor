import { getTranslations } from "next-intl/server";

export default async function Map() {
  const t = await getTranslations("Map");

  return (
    <div>
      {t("title")}
    </div>
  );
}
