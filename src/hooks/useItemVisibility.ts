import { useEffect } from "react";

export default function useItemVisibility() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add("visibleItem");
          } else {
            target.classList.remove("visibleItem");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const items = document.querySelectorAll(".item");
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  }, []);
}