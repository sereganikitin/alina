"use client";

import { useContent } from "@/lib/useContent";
import LegalPage from "@/components/LegalPage";

export default function PersonalDataPage() {
  const c = useContent();
  return (
    <main className="flex-1">
      <LegalPage
        kicker="Документы"
        title="Согласие на обработку персональных данных"
        body={c.legal.personalDataBody}
      />
    </main>
  );
}
