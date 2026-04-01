"use client";

import { cn } from "@/lib/cn";

type TabItem = {
  id: string;
  label: string;
};

type TabNavProps = {
  items: TabItem[];
  activeId: string;
  onTabChange: (id: string) => void;
  className?: string;
};

export default function TabNav({
  items,
  activeId,
  onTabChange,
  className,
}: TabNavProps) {
  return (
    <nav
      className={cn(
        "max-w-[1400px] mx-auto px-[60px] border-b border-border",
        className,
      )}
    >
      <div className="flex gap-8">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={cn(
              "font-[family-name:var(--font-karla)] text-[12px] font-bold tracking-[2px] uppercase pb-3 cursor-pointer transition-colors duration-200",
              item.id === activeId
                ? "border-b-2 border-text text-text"
                : "text-text-muted hover:text-text",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
