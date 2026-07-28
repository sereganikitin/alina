"use client";

import { useContent } from "@/lib/useContent";
import LegalPage from "@/components/LegalPage";

export default function OfferPage() {
  const c = useContent();
  return (
    <main className="flex-1">
      <LegalPage
        kicker="Документы"
        title="Договор оферты"
        body={c.legal.offerBody}
      />
    </main>
  );
}
