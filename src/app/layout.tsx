import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Codebase AI Explainer",
  description: "Understand any codebase in minutes, not days.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
