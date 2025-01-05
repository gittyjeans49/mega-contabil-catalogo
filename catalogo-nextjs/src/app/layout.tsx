import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";

export const metadata: Metadata = {
  title: "Fechamento Contábil Megasult",
  description: "Fechamento Contábil Megasult",
};

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700']
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
