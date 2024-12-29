import Breadcrumb from "@/components/Breadcrumb";
import ReduxProvider from '@/components/ReduxProvider';
import Sidebar from "@/components/Sidebar";
import Title from "@/components/Title";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Menu Management",
  description: "View and edit the hierarchy of menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <Sidebar>
            <Breadcrumb />
            <Title />
            {children}
          </Sidebar>
        </ReduxProvider>
      </body>
    </html>
  );
}
