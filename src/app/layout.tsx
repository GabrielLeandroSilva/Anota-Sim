import type { Metadata } from "next";
import "./globals.css";
import { NavigationProvider } from "../providers/NavigationProvider";
import { ThemeToggleProvider } from "../providers/ThemeToggleProvider";

export const metadata = {
  title: "AnotaSim",
  description: "Seu app simples para organizar o dia",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#009767" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased bg-gray-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50">
        <ThemeToggleProvider>
          <NavigationProvider>
            {children}
          </NavigationProvider>
        </ThemeToggleProvider>
      </body>
    </html>
  );
}
