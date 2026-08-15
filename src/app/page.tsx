"use client";

import { redirect } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { useEffect } from "react";

export default function RootPage() {
  useEffect(() => {
    const lang = window.navigator?.language ?? "";
    const locale = hasLocale(["ja", "ja-JP"], lang)
      ? "ja"
      : routing.defaultLocale;

    redirect({ href: "/", locale: locale });
  }, []);
  return (
    <html>
      <body></body>
    </html>
  );
}
