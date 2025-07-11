import { Card } from '@/components/ui';
import { Check, Plus, User } from 'lucide-react';

const BookingScheduleDemo = () => {
  const schedule = {
    '06:00PM': [
      { time: '06:00 PM', type: 'add' },
      { time: '06:15 PM', type: 'add' },
      { time: '06:30 PM', type: 'add' },
      {
        time: '06:45 PM',
        type: 'booking',
        name: 'Alex Smith',
        table: 5,
        pax: 4,
        status: 'confirmed',
      },
      {
        time: '06:45 PM',
        type: 'booking',
        name: 'Jonn Smith',
        table: 2,
        pax: 4,
        status: 'confirmed',
      },
      {
        time: '06:45 PM',
        type: 'booking',
        name: 'David Alnasur',
        table: 19,
        pax: 5,
        status: 'arrived',
      },
      { time: '06:45 PM', type: 'add' },
    ],
    '07:00PM': [
      { time: '07:00 PM', type: 'add' },
      {
        time: '07:15 PM',
        type: 'booking',
        name: 'Mathieu Valayer',
        table: 7,
        pax: 2,
        status: 'confirmed',
      },
      {
        time: '07:15 PM',
        type: 'booking',
        name: 'Walk-in',
        table: 21,
        pax: 4,
        status: 'confirmed',
      },
      {
        time: '07:15 PM',
        type: 'booking',
        name: 'Sara Winnicott',
        table: 3,
        pax: 4,
        status: 'confirmed',
      },
      {
        time: '07:15 PM',
        type: 'booking',
        name: 'Walk-in',
        table: 10,
        pax: 4,
        status: 'confirmed',
      },
      {
        time: '07:15 PM',
        type: 'booking',
        name: 'Walk-in',
        table: 18,
        pax: 5,
        status: 'arrived',
      },
      { time: '07:15 PM', type: 'add' },
      { time: '07:30 PM', type: 'add' },
    ],
    '08:00PM': [
      { time: '08:00 PM', type: 'add' },
      { time: '08:15 PM', type: 'add' },
      { time: '08:30 PM', type: 'add' },
      { time: '08:45 PM', type: 'add' },
    ],
  };

  const StatusIcon = ({ status }) => {
    if (status === 'confirmed') {
      return (
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
          <Check size={16} />
        </div>
      );
    }
    if (status === 'arrived') {
      return (
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <User size={16} />
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-gray-50 p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(schedule).map(([hour, bookings]) => (
          <div key={hour} className="space-y-2">
            <div className="text-center font-semibold text-gray-600 py-2">
              {hour}
            </div>
            {bookings.map((booking, index) => (
              <div key={index}>
                {booking.type === 'add' ? (
                  <div className="flex items-center bg-green-500 text-white rounded-md p-3 font-medium text-sm">
                    <div className="w-24 text-left">{booking.time}</div>
                    <button className="flex items-center justify-center w-full hover:bg-green-600 rounded-md py-1">
                      <Plus size={16} className="mr-2" />
                      ADD BOOKING
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center bg-white border border-gray-200 rounded-md p-3 shadow-sm">
                    <div className="font-bold text-gray-800 w-24 text-sm text-left">
                      {booking.time}
                    </div>
                    <div className="flex-grow">
                      <div className="font-bold text-gray-900">
                        {booking.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>TABLE: {booking.table}</span>
                        <span className="ml-4">PAX: {booking.pax}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <StatusIcon status={booking.status} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BookingScheduleDemo;
