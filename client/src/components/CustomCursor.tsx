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
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-[#E94560] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{
          type: "spring",
          mass: 0.2,
          stiffness: 100,
          damping: 10
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#E94560] rounded-full pointer-events-none z-50 mix-blend-difference"
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
      />
    </>
  );
}
