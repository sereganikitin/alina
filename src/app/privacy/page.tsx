"use client";

import { useContent } from "@/lib/useContent";
import LegalPage from "@/components/LegalPage";

export default function PrivacyPage() {
  const c = useContent();
  return (
    <main className="flex-1">
      <LegalPage
        kicker="Документы"
        title="Политика конфиденциальности"
        body={c.legal.privacyBody}
      />
    </main>
  );
}
