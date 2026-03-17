"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSyncExternalStore } from "react";

// Use useSyncExternalStore to handle hydration mismatch without triggering "cascading render" lint errors.
// This is the modern React recommendation for client-only state.
const emptySubscribe = () => () => {};

export function TransparentDonorList() {
  const { t } = useLanguage();
  
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Mock data as the backend isn't connected right now in the UI directly, but we show the structure.
  const donors = [
    { id: 1, name: "A Devotee", amount: 11000, purpose: t("needs.flooring"), date: "2024-03-16", is_anonymous: true },
    { id: 2, name: "Rajesh Sahu", amount: 5100, purpose: t("needs.general"), date: "2024-03-15", is_anonymous: false },
    { id: 3, name: "Smita Dash", amount: 2100, purpose: t("needs.lighting"), date: "2024-03-15", is_anonymous: false },
    { id: 4, name: "A Devotee", amount: 1001, purpose: t("needs.general"), date: "2024-03-14", is_anonymous: true },
    { id: 5, name: "Manas Kumar", amount: 501, purpose: t("needs.festival"), date: "2024-03-14", is_anonymous: false },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-maroon/5 overflow-hidden">
      <div className="bg-sandstone px-6 py-4 border-b border-maroon/10">
        <h3 className="font-serif font-bold text-xl text-maroon">{t("donate.donor_list_title")}</h3>
        <p className="text-sm text-foreground/70">{t("donate.donor_list_subtitle")}</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-saffron/5">
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">{t("donate.donor_label")}</th>
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">{t("donate.amount_label")}</th>
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">{t("donate.purpose_label")}</th>
              <th className="px-6 py-3 font-medium text-maroon text-sm uppercase tracking-wider">{t("donate.date_label")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-maroon/5">
            {donors.map((donor) => (
              <tr key={donor.id} className="hover:bg-sandstone/30 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground">
                  {donor.is_anonymous ? t("donate.anonymous_donor") : donor.name}
                </td>
                <td className="px-6 py-4 font-bold text-saffron">₹{donor.amount.toLocaleString('en-IN')}</td>
                <td className="px-6 py-4 text-sm text-foreground/80">{donor.purpose}</td>
                <td className="px-6 py-4 text-sm text-foreground/60">
                  {isClient ? new Date(donor.date).toLocaleDateString('en-IN') : '--/--/----'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-sandstone/50 px-6 py-3 text-center text-sm text-foreground/60 italic">
        {t("donate.donor_list_footer")}
      </div>
    </div>
  );
}
