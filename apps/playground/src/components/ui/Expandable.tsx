import React, { useState } from 'react';

export interface ExpandCollapseItem {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface ExpandCollapseProps {
  items: ExpandCollapseItem[];
  /**
   * Callback fired when an item's title area is clicked.
   */
  onItemClick?: (item: ExpandCollapseItem) => void;
}

const ExpandCollapse: React.FC<ExpandCollapseProps> = ({
  items,
  onItemClick,
}) => {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const handleToggle = (id: string | number) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    // We remove the outer div with `bg-white` and `shadow` to make it themable by the parent.
    // The list itself has no specific styling, making it a clean, reusable component.
    <ul>
      {items.map((item) => {
        const isExpanded = item.id === expandedId;

        return (
          <li key={item.id} className="mb-1">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => {
                // Only toggle if there's content to show.
                if (item.content) {
                  handleToggle(item.id);
                }
                // Fire the onItemClick callback regardless.
                if (onItemClick) {
                  onItemClick(item);
                }
              }}
            >
              {/* The title is passed in as a ReactNode for maximum flexibility. */}
              <div className="flex-grow">{item.title}</div>

              {/* Only show a chevron icon if the item is expandable (has content). */}
              {item.content && (
                <span
                  className={`flex-shrink-0 ml-2 transform transition-transform duration-300 ${
                    isExpanded ? 'rotate-90' : 'rotate-0'
                  }`}
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </span>
              )}
            </div>
            {isExpanded && item.content && (
              // The content area for sub-items.
              <div className="mt-1">{item.content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ExpandCollapse;
