import type { Metadata } from "next";
import "./globals.css";
import { workSans } from "./fonts/font";
import "easymde/dist/easymde.min.css";
import { Toaster } from "@/components/ui/sonner";

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
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              error: "bg-red-400",
              success: "text-green-400",
              warning: "text-yellow-400",
              info: "bg-blue-400",
            },
          }}
        />
      </body>
    </html>
  );
}
