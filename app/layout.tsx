import type { Metadata } from "next";
import "./globals.css";
import { workSans } from "./fonts/font";
import "easymde/dist/easymde.min.css";

export const metadata: Metadata = {
  title: "Startify",
  description: "A place to post your startups",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.variable} font-workSans`}>
        {children}
      </body>
    </html>
  );
}
