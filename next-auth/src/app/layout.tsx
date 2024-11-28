import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";




export const metadata: Metadata = {
  title: "Auth app",
  description: "Created by mehdi",
  icons:{
    icon:"/favi.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
