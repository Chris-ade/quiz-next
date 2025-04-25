import type { Metadata } from "next";
import "../public/static/css/app.css";
import "./globals.css";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import ActivityIndicator from "@/components/preloader";

const inter = Inter({
  subsets: ["cyrillic"],
});

export const metadata: Metadata = {
  title: "Quiz",
  description: "A quiz web app developed by Chris Adebiyi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="stylesheet" href="/static/css/all.min.css" />
      </head>
      <body>
        <main>
          <ActivityIndicator isContent={false} />
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
