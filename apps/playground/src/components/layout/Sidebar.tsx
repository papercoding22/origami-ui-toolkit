import React from 'react';
import ExpandCollapse, { type ExpandCollapseItem } from '@/components/ui/Expandable';

/**
 * The Demo type now supports nesting via an optional `children` array.
 * Child items don't need their own icons or further children for this example.
 */
export type SidebarMenuItem = {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children?: Omit<SidebarMenuItem, 'icon' | 'children'>[];
};

type SidebarProps = {
  demos: SidebarMenuItem[];
  selectedDemoId: string;
  onSelectDemo: (id: string) => void;
  isOpen: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ demos, selectedDemoId, onSelectDemo, isOpen }) => {
  // We transform our `demos` data into the format required by `ExpandCollapse`.
  const navItems: ExpandCollapseItem[] = demos.map((demo) => ({
    id: demo.id,
    // `title` is a custom-rendered element for our sidebar item.
    title: (
      <div
        className={`w-full flex items-center space-x-3 px-3 py-2.5 text-left rounded-md transition-colors duration-200 ${
          selectedDemoId === demo.id && !demo.children
            ? 'bg-blue-600 text-white' // Active style for non-parent items
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
      >
        <span
          className={selectedDemoId === demo.id && !demo.children ? 'text-white' : 'text-gray-400'}
        >
          {demo.icon}
        </span>
        <span className="font-medium">{demo.title}</span>
      </div>
    ),
    // `content` is the list of child navigation links, if they exist.
    content: demo.children ? (
      <ul className="pl-8 pt-1 space-y-1">
        {demo.children.map((child) => (
          <li key={child.id}>
            <button
              onClick={() => onSelectDemo(child.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                selectedDemoId === child.id
                  ? 'bg-blue-600 text-white' // Active style for child items
                  : 'text-gray-400 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {child.title}
            </button>
          </li>
        ))}
      </ul>
    ) : null, // No content if the item has no children.
  }));

  return (
    <aside
      className={`absolute lg:relative z-20 w-64 bg-gray-800 text-white h-full flex-shrink-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white">Component Demos</h2>
        <p className="text-sm text-gray-400 mt-1">Powered by React</p>
      </div>
      <nav className="mt-4 px-3">
        <ExpandCollapse
          items={navItems}
          onItemClick={(item) => {
            // Find the original demo object.
            const demo = demos.find((d) => d.id === item.id);
            // Only trigger selection if the clicked item is a root-level item
            // that doesn't have children. Clicks on children are handled separately.
            if (demo && !demo.children) {
              onSelectDemo(demo.id);
            }
          }}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
