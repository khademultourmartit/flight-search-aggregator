import * as React from "react";
import Container from "@mui/material/Container";
import SearchResultsClient from "./SearchResultsClient";
import LoadingState from "@/components/LoadingState";

export const metadata = {
  title: "Search results | iBox Air",
};

export default function SearchPage() {
  return (
    <React.Suspense
      fallback={
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <LoadingState />
        </Container>
      }
    >
      <SearchResultsClient />
    </React.Suspense>
  );
}
