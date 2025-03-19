import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
