"use client";

import { useState } from "react";

export type TreeViewItem = {
  id: string;
  label: React.ReactNode;
  children?: readonly TreeViewItem[];
};

type TreeViewProps = {
  ariaLabel: string;
  defaultExpandedIds?: readonly string[];
  items: readonly TreeViewItem[];
  onSelect?: (id: string) => void;
  selectedId?: string | null;
};

const Chevron = ({ expanded }: { expanded: boolean }) => (
  <svg
    aria-hidden="true"
    className={`h-4 w-4 shrink-0 transition-transform ${
      expanded ? "rotate-90" : ""
    }`}
    fill="none"
    viewBox="0 0 16 16"
  >
    <path
      d="m6,3 5,5 -5,5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

export default function TreeView({
  ariaLabel,
  defaultExpandedIds = [],
  items,
  onSelect,
  selectedId: controlledSelectedId,
}: TreeViewProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedIds),
  );
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState<
    string | null
  >(null);
  const selectedId = controlledSelectedId === undefined
    ? uncontrolledSelectedId
    : controlledSelectedId;

  const toggleItem = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectItem = (id: string) => {
    if (controlledSelectedId === undefined) setUncontrolledSelectedId(id);
    onSelect?.(id);
  };

  const renderItems = (nodes: readonly TreeViewItem[], level = 1) => (
    <ul
      className={level === 1
        ? "w-max min-w-full"
        : "ml-4 border-l border-black/15 dark:border-white/20 py-0.5 pl-2"}
      role={level === 1 ? "tree" : "group"}
    >
      {nodes.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        const isExpanded = expandedIds.has(item.id);
        const isSelected = selectedId === item.id;

        return (
          <li key={item.id} className="list-none">
            <button
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-level={level}
              aria-selected={isSelected}
              className={`w-full whitespace-nowrap rounded-md px-2 py-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                isSelected
                  ? "bg-primary font-bold text-white hover:bg-primary-light"
                  : "hover:bg-black/5 dark:hover:bg-white/10 "
                    + (hasChildren ? "font-bold" : "font-normal")
              }`}
              onClick={() => {
                if (hasChildren) {
                  toggleItem(item.id);
                } else {
                  selectItem(item.id);
                }
              }}
              role="treeitem"
              type="button"
            >
              {hasChildren && <Chevron expanded={isExpanded} />}
              {item.label}
            </button>
            {hasChildren && isExpanded
              && renderItems(item.children!, level + 1)}
          </li>
        );
      })}
    </ul>
  );

  return (
    <nav
      aria-label={ariaLabel}
      className="inset-shadow-sm min-h-0 flex-1 overflow-y-auto bg-white p-0.5"
    >
      {renderItems(items)}
    </nav>
  );
}
