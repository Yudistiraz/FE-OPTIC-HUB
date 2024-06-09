import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/lib/MuiTheme";
import AuthContext from "@/components/providers/SessionProvider";
import { getServerSession } from "next-auth";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { UserProvider } from "@/context/User";
import { ScreenSizeProvider } from "@/context/MediaQuery";
import { LanguageProvider } from "@/context/Language";
const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Optic Hub App",
  description: "Optic Hub",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`!tw-bg-white ${nunitoSans.className}`}>
        <AuthContext session={session}>
          <TanstackProvider>
            <UserProvider>
              <ScreenSizeProvider>
                <LanguageProvider>
                  <ThemeProvider theme={theme}>{children}</ThemeProvider>
                </LanguageProvider>
              </ScreenSizeProvider>
            </UserProvider>
          </TanstackProvider>
        </AuthContext>
      </body>
    </html>
  );
}
