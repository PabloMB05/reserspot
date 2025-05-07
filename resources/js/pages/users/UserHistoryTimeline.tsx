import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { TimeLineSection } from '../users/components/TimeLine';
import { TimeLineLayout } from '@/layouts/timeline/timelinelayout';
import { Book } from 'lucide-react';

interface ProfileProps {
  loans: {
    id: number;
    book: {
      title: string;
    };
    expedit: string | null;
    return: string | null;
    due_date: Date;
    end_due: string | null;
    deleted_at?: string | null;
    remaining_days?: number;
    remaining_hours?: number;
    is_overdue?: boolean;
  }[];
  reservations: {
    id: number;
    book: {
      title: string;
    };
    expedit: string | null;
    deleted_at?: string | null;
  }[];
}

export default function UserHistoryTimeline({loans, reservations}:ProfileProps) {

  return (
    <div className="space-y-6">
      {/* <h2 className="text-lg font-semibold text-gray-900">Historial de Usuario: {user.name}</h2> */}

        <TimeLineLayout> 
          <TimeLineSection loans={loans} reservations={reservations}></TimeLineSection>
        </TimeLineLayout>
    </div>
  );
}
