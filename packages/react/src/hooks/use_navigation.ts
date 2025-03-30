import { router } from "@inertiajs/react";
import { useEffect } from "react";

export function useNavigation({ previousPath }: { previousPath?: string }) {
  function navigateBack() {
    if (previousPath) {
      router.visit(previousPath);
    }
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const el = document.activeElement as HTMLElement;
    if (e.key !== "Escape") return;

    if (el === document.body) {
      navigateBack();
    } else {
      el.blur();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
}
