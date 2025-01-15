import type { Metadata } from "next";
import { ApolloWrapper } from "./client/apolloWrapper";
import { Header } from "./components/header/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mathonline",
  description: "Web application create randominized exams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <Header />
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
