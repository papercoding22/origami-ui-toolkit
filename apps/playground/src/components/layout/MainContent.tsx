import React, { type ReactNode } from 'react';

type SelectedContent = {
  title: string;
  subtitle?: string;
  component: ReactNode;
};

type MainContentProps = {
  selectedContent?: SelectedContent;
  onToggleSidebar: () => void;
};

const MainContent: React.FC<MainContentProps> = ({
  selectedContent,
  onToggleSidebar,
}) => {
  if (!selectedContent) {
    return null; // Or a loading/error state
  }

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between lg:justify-end">
        {/* Mobile Menu Button */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <h1 className="text-xl font-bold text-gray-800 lg:hidden">
          {selectedContent.title}
        </h1>
        <div className="flex items-center space-x-4">
          {/* Can add header items here like profile dropdown */}
        </div>
      </header>

      <div className="p-4 md:p-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {selectedContent.title}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {selectedContent.subtitle}
            </p>
          </div>

          {/* Render the selected demo component */}
          <div className="bg-white/50 p-4 rounded-lg border border-dashed border-gray-300">
            {selectedContent.component}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
