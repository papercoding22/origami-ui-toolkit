import { useState, useMemo } from 'react';
import { BarChart, Users, CheckSquare } from 'lucide-react';

import Sidebar from '@/components/layout/Sidebar';
import MainContent from '@/components/layout/MainContent';
import { FormDemo, ProfileCardDemo, TableDemo, BookingScheduleDemo } from '@/demo';

type ChildDemo = Omit<Demo, 'icon' | 'children'>;
interface Demo {
  id: string;
  title: string;
  subtitle?: string;
  component: React.ReactNode;
  icon: React.ReactNode;
  children?: ChildDemo[];
}

// --- DEMO CONFIGURATION ---
const demos: Demo[] = [
  {
    id: 'profileCard',
    title: 'Profile Card',
    subtitle:
      'A composite component built from smaller, pure elements to display user information.',
    component: <ProfileCardDemo />,
    icon: <Users size={20} />,
  },
  {
    id: 'interactiveForm',
    title: 'Interactive Form',
    subtitle: 'Demonstrates various input types and validation states within a form.',
    component: <FormDemo />,
    icon: <CheckSquare size={20} />,
  },
  {
    id: 'dataTable',
    title: 'Data Table',
    subtitle: 'A responsive table for displaying and organizing tabular data.',
    component: <TableDemo />,
    icon: <BarChart size={20} />,
  },
  {
    id: 'bookingSchedule',
    title: 'Booking Schedule',
    subtitle: 'A complex component for managing bookings and schedules with interactive features.',
    component: <BookingScheduleDemo />,
    icon: <Users size={20} />,
  },
];

// --- MAIN APP LAYOUT ---
const DemoPage = () => {
  const [selectedDemoId, setSelectedDemoId] = useState(demos[0].id);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const selectedDemo = useMemo(() => {
    return demos.reduce<Demo | ChildDemo | undefined>((acc, demo) => {
      if (acc) return acc;
      if (demo.id === selectedDemoId) return demo;

      // Check children recursively
      const child = demo.children?.find((child) => child.id === selectedDemoId);
      return child ?? undefined;
    }, undefined);
  }, [selectedDemoId]);

  const handleSelectDemo = (id: string) => {
    setSelectedDemoId(id);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-screen w-full bg-gray-100 font-sans flex overflow-hidden">
      <Sidebar
        demos={demos}
        selectedDemoId={selectedDemoId}
        onSelectDemo={handleSelectDemo}
        isOpen={isSidebarOpen}
      />
      <MainContent selectedContent={selectedDemo} onToggleSidebar={handleToggleSidebar} />

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-10"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DemoPage;
