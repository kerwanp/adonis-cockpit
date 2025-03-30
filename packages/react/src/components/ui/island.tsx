import { ComponentProps, useEffect, useState } from "react";
import { cn } from "../../utils/cn.js";
import { router } from "@inertiajs/react";
import { motion } from "motion/react";

const shakeVariants = {
  shaking: {
    x: [-20, -30, 30, -30, 30, 0], // larger left/right shake
    y: [-15, -25, 25, -25, 25, 0], // larger up/down shake
  },
  rest: {
    x: 0,
    y: 0,
  },
};

export const Island = ({
  className,
  preventNavigation,
  ...props
}: ComponentProps<typeof motion.div> & { preventNavigation?: boolean }) => {
  const [variant, setVariant] = useState("idle");

  useEffect(() => {
    const listener = router.on("before", (event: any) => {
      if (preventNavigation) {
        setVariant("shaking");
        event.preventDefault();
      }
    });

    return () => listener();
  }, [preventNavigation]);

  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-8 w-[calc(100vw-var(--sidebar-width)-1.5rem)] flex justify-center"
    >
      <motion.div
        variants={shakeVariants}
        animate={variant}
        onAnimationComplete={(def) => {
          if (def === "shaking") setVariant("idle");
        }}
        transition={{ duration: 0.5 }}
        className={cn(
          "bg-background rounded-full py-4 px-6 border flex transition",
          {
            "border-destructive": variant === "shaking",
          },
          className,
        )}
        {...props}
      />
    </motion.div>
  );
};

export const IslandContent = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return <div className={cn(className)} {...props} />;
};

export const IslandActions = ({
  className,
  ...props
}: ComponentProps<"div">) => {
  return <div className={cn("flex items-center gap-3")} {...props} />;
};
