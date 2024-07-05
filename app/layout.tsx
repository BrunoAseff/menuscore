// RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { mergedLocalization } from "../localizations";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

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
          colorPrimary: "#008DDA",
          colorText: "#222831",
          colorBackground: "#f8f7ff",
          colorInputBackground: "#f8f7ff",
        },
      }}
      localization={mergedLocalization}
    >
      <html lang="en">
        <body>
          <body className={inter.className}>
            <main>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>{" "}
            </main>{" "}
          </body>
        </body>
      </html>
    </ClerkProvider>
  );
}
