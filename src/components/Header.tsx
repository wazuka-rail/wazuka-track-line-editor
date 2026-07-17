"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AppIcon } from "./icons";

const Header = () => {
  const t = useTranslations("Common");

  return (
    <header className="bg-white shadow">
      <div className="mx-0 px-4 flex flex-col">
        <div className="flex items-center justify-between">
          <Link href="/">
            <button className="text-2xl font-normal">
              <AppIcon className="size-12" />
              <span>{t("appname")}</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
