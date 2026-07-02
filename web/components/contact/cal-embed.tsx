"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useTheme } from "next-themes";
import { CAL_URL } from "@/content/nav";

// "kevin-cohen-utwpmj/consultation", derived from the canonical CAL_URL.
const CAL_LINK = CAL_URL.replace("https://cal.com/", "");
const CAL_NAMESPACE = "consultation";

export function CalEmbed() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) {
        return;
      }
      cal("ui", {
        theme: resolvedTheme === "light" ? "light" : "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#6e63ff" },
          dark: { "cal-brand": "#6e63ff" },
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [resolvedTheme]);

  return (
    <div className="overflow-hidden rounded-[18px] border border-border bg-card">
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        style={{ width: "100%", height: "100%", minHeight: "560px" }}
        config={{ layout: "month_view" }}
      />
    </div>
  );
}
