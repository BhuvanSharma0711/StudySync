import ClientLayout from "@/components/clientLayout";
import "./globals.css";
import {Providers} from "./providers";

export const metadata = {
  title: "𝒞αмρυѕ✘",
  description: "Your AI-powered campus guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </main>
      </body>
    </html>
  );
}
