"use client";

import { motion } from "framer-motion";

export default function AnimateIn({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  once = true,
  amount = 0.2,
  className,
  as = "div",
  ...rest
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}
