import Header from "@/components/Header";
import { routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Noto_Sans_JP } from "next/font/google";
import { notFound } from "next/navigation";

import "@/app/globals.css";

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  preload: false,
  variable: "--font-noto-sans",
});

export default async function LocaleLayout(
  { children }: LayoutProps<"/[locale]">,
) {
  const locale = await getLocale();

  if (!(hasLocale(routing.locales, locale))) {
    notFound();
  }

  return (
    <html
      lang={locale}
      className={`${noto.variable} antialiased`}
    >
      <body>
        <NextIntlClientProvider messages={{}}>
          <Header />
          <main>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
