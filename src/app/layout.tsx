import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "SAP CertPrep - SuccessFactors Certification Practice",
  description: "Master your SAP SuccessFactors Employee Central certification with 300+ practice questions, mock exams, and smart learning recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
