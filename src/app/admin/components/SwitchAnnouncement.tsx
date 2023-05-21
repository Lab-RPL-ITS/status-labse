import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';

const SwitchAnnouncement = () => {
  const [status, setStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

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

  const handleStatusChange = async (event: { target: { value: any; }; }) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    const { data, error } = await supabase.from('status').select('id').order('created_at', { ascending: false }).limit(1);
    if (error) {
      console.error('Error fetching latest status:', error.message);
    } else if (data && data.length > 0) {
      const latestStatusId = data[0].id;
      const { data: updatedData, error: updateError } = await supabase.from('status').update({ status: newStatus }).eq('id', latestStatusId);
      if (updateError) {
        console.error('Error updating status:', updateError.message);
      } else if (updatedData) {
        setStatus(newStatus);
      }
    } else {
      const { data: insertedData, error: insertError } = await supabase.from('status').insert([{ status: newStatus }]);
      if (insertError) {
        console.error('Error inserting new status:', insertError.message);
      } else if (insertedData) {
        setStatus(newStatus);
      }
    }
  };

  return (
    <div>
      <h2>Status: {status}</h2>
      <div>
        <label>
          <input type="radio" name="status" value="maintenance" checked={selectedStatus === 'maintenance'} onChange={handleStatusChange} />
          Maintenance
        </label>
        <label>
          <input type="radio" name="status" value="open" checked={selectedStatus === 'open'} onChange={handleStatusChange} />
          Open
        </label>
        <label>
          <input type="radio" name="status" value="close" checked={selectedStatus === 'close'} onChange={handleStatusChange} />
          Close
        </label>
      </div>
    </div>
  );
};

export default SwitchAnnouncement;
