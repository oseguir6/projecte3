import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[#E94560] rounded-full pointer-events-none z-50"
        animate={{
          x: position.x - 1,
          y: position.y - 1,
          scale: isPointer ? 2.5 : 1
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 100,
          damping: 10
        }}
      />

      {/* Tech-style outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 50,
          damping: 8
        }}
      >
        {/* Decorative elements */}
        <div className="relative w-full h-full">
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-[#E94560]" />
          <div className="absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 border-[#E94560]" />
          <div className="absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 border-[#E94560]" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-[#E94560]" />

          {/* Coordinates (only show when hovering over clickable elements) */}
          {isPointer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -right-16 -top-6 text-[10px] text-[#E94560] font-mono"
            >
              x: {Math.round(position.x)} y: {Math.round(position.y)}
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}