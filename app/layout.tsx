// RootLayout.tsx
import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { mergedLocalization } from "../localizations";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/DesignerContext";
import NextTopLoader from "nextjs-toploader";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
});

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forms Creator",
  description: "Criador de formularios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#41C9E2",
          colorBackground: "#222831",
          colorInputBackground: "#222831",
        },
        baseTheme: dark,
      }}
      localization={mergedLocalization}
    >
      <html lang="en">
        <body className={`${inter.variable} ${nunito.className} `}>
          <main>
            <NextTopLoader />
            <DesignerContextProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </DesignerContextProvider>
          </main>{" "}
        </body>
      </html>
    </ClerkProvider>
  );
}
