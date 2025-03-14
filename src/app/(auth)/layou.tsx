import type { Metadata } from "next";

// import { suwannaphum } from "../font";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-background_color`}>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
