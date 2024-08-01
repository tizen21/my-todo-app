import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "./DarkModeContext";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./Components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Todo App",
  description: "My Todo App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <body className="dark:bg-gray-900">
        <ClerkProvider>
          <DarkModeProvider>
            {" "}
            <Header />
            {children}
          </DarkModeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
