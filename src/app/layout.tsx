import type { Metadata } from "next";
import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "iBox Air | Flight Search & Booking",
  description: "Search, compare, and book flights.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Box component="main" sx={{ flexGrow: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
