'use client'

import { useEffect, useState } from 'react';
import Announcement from './container/Announcement';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      const { data, error } = await supabase.from('status').select('status').order('created_at', { ascending: false }).limit(1);
      if (error) {
        console.error('Error fetching status:', error.message);
      } else if (data && data.length > 0) {
        setStatus(data[0].status);
      }
    };

    fetchStatus();
  }, []);

  return (
    <main>
      <Announcement variant={status} />
    </main>
  );
}
