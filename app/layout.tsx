import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/lib/MuiTheme";
import AuthContext from "@/components/providers/SessionProvider";
import { getServerSession } from "next-auth";
import TanstackProvider from "@/components/providers/TanstackProvider";
import { UserProvider } from "@/context/User";
const inter = Inter({ subsets: ["latin"] });

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
      <body className={`!tw-bg-white ${inter.className}`}>
        <AuthContext session={session}>
          <TanstackProvider>
            <UserProvider>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </UserProvider>
          </TanstackProvider>
        </AuthContext>
      </body>
    </html>
  );
}
