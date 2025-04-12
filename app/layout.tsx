import type { Metadata } from "next";
import { Inter, Azeret_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper";
import { Header } from "@/components/header";
import ClientLayout from "@/components/client-layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhoisJason.me",
  description: "Jason's personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${azeretMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>
          <ThemeProviderWrapper>
            <Header />
            {children}
          </ThemeProviderWrapper>
        </ClientLayout>
      </body>
    </html>
  );
}


