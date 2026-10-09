import { SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/types";

export function CalculateButton({
  copy,
  onClick,
}: {
  copy: Dictionary["constructionCalculator"];
  onClick: () => void;
}) {
  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        icon={<SlidersHorizontal />}
        onClick={onClick}
        type="button"
      >
        {copy.result.calculate}
      </Button>
      <p className="text-center text-xs leading-5 text-[var(--text-secondary)]">
        {copy.result.calculateDescription}
      </p>
    </div>
  );
}
