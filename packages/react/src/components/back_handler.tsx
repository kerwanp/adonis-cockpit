import { PropsWithChildren, useEffect } from "react";

export const BackHandler = ({
  children,
}: PropsWithChildren<{ previousPath?: string }>) => {
  function navigateBack() {
    window.history.back();
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

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return children;
};
