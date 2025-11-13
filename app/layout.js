import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import ClientProviders from "./components/ClientProviders";

export const metadata = {
  title: "Spolia",
  description: "Spolia is a design research studio building products and experiences that navigate a rapidly changing world.",
  applicationName: "Spolia",
  metadataBase: new URL("https://spolialab.com"),
  openGraph: {
    type: "website",
    siteName: "Spolia",
    title: "Spolia",
    description: "SPOLIA is a design research studio building products and experiences that navigate a rapidly changing world.",
    url: "https://spolialab.com",
    images: [
      {
        url: "/spolia-og.png",
        width: 1200,
        height: 630,
        alt: "Spolia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spolia",
    description: "SPOLIA is a design research studio building products and experiences that navigate a rapidly changing world.",
    images: ["/spolia-og.png"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <ClientProviders>{children}</ClientProviders>
        </body>
      </html>
    </ViewTransitions>
  );
}
