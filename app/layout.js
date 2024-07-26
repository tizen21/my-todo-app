import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "./DarkModeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Todo App",
  description: "My Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <DarkModeProvider>{children}</DarkModeProvider>
      </body>
    </html>
  );
}
