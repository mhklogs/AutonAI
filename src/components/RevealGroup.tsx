import { useEffect, useRef, type ReactNode, type Key } from 'react';

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    el.querySelectorAll<HTMLElement>('.reveal').forEach((child) => io.observe(child));
    return () => io.disconnect();
  }, []);
  return ref;
}

export function RevealGroup(props: { children: ReactNode; className?: string; key?: Key }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  );
}