import { getTranslations } from "next-intl/server";
import { AppIcon } from "./icons";

export default async function Header() {
  const t = await getTranslations("Common");

  return (
    <header className="bg-white shadow">
      <div className="mx-0 px-4 flex flex-col">
        <div className="flex items-center justify-between">
          <button className="text-2xl font-normal">
            <AppIcon className="size-12" />
            <span>{t("appname")}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
