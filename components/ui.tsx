'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, useSyncExternalStore, type ReactNode } from 'react';

const mobileQuery = '(max-width: 600px)';
function subscribeToMobile(change: () => void) {
  const media = window.matchMedia(mobileQuery);
  media.addEventListener('change', change);
  return () => media.removeEventListener('change', change);
}
export function useMobileMotion() {
  return useSyncExternalStore(subscribeToMobile, () => window.matchMedia(mobileQuery).matches, () => false);
}

export function Reveal({ children, className = '', delay = 0, effect = 'rise' }: { children: ReactNode; className?: string; delay?: number; effect?: 'rise' | 'left' | 'right' | 'zoom' }) {
  const reduce = useReducedMotion();
  const mobile = useMobileMotion();
  const [entered, setEntered] = useState(false);
  const [focused, setFocused] = useState(false);
  const distance = mobile ? 22 : 44;
  const from = {
    opacity: 0,
    x: mobile ? 0 : effect === 'left' ? -30 : effect === 'right' ? 30 : 0,
    y: effect === 'rise' || mobile ? distance : effect === 'zoom' ? 18 : 0,
    scale: effect === 'zoom' && !mobile ? 0.965 : 1,
  };
  const visible = { opacity: 1, x: 0, y: 0, scale: 1 };
  return <motion.div
    className={className}
    data-scroll-reveal
    data-reveal-visible={entered || focused}
    initial={reduce ? false : from}
    animate={reduce || focused ? visible : undefined}
    whileInView={visible}
    onViewportEnter={() => setEntered(true)}
    onFocusCapture={() => setFocused(true)}
    viewport={{ once: true, amount: 0.16 }}
    transition={{ duration: reduce || focused ? 0 : mobile ? 0.55 : 0.85, delay: reduce || focused ? 0 : mobile ? Math.min(delay, 0.12) : delay, ease: [0.22, 1, 0.36, 1] }}
  >{children}</motion.div>;
}
export function WhatsAppIcon({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.6a8.5 8.5 0 0 1-12.7 7.4L3 20.4l1.4-4.7a8.5 8.5 0 1 1 16.1-4.1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m8.2 7.6 1.5-.3 1.1 2.5-.9 1.1c.7 1.3 1.6 2.2 3 2.9l1.1-.9 2.5 1.1-.3 1.5c-.2 1-1.3 1.4-2.2 1.1-3.8-1-6.8-4-7.8-7.8-.3-.9.1-2 1-2.2Z" fill="currentColor" transform="translate(1 0) scale(.92)"/></svg>;
}
