import { supabase } from '@/lib/supabaseClient';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmationDialog from '../../../components/modal/ConfirmationDialog'
import { useRouter } from 'next/navigation';

const SwitchAnnouncement = () => {
  const [status, setStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const router = useRouter();

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

  const handleStatusChange = async (event: { target: { value: string } }) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    setIsConfirmationOpen(true);

  };

  const handleConfirmStatusChange = async () => {
    setIsConfirmationOpen(false);

    const { data, error } = await supabase.from('status').select('id').order('created_at', { ascending: false }).limit(1);
    if (error) {
      console.error('Error fetching latest status:', error.message);
    } else if (data && data.length > 0) {
      const latestStatusId = data[0].id;
      const { data: updatedData, error: updateError } = await supabase
        .from('status')
        .update({ status: selectedStatus })
        .eq('id', latestStatusId);
      if (updateError) {
        console.error('Error updating status:', updateError.message);
        setStatus(selectedStatus);
      }
    } else {
      const { data: insertedData, error: insertError } = await supabase.from('status').insert([{ status: selectedStatus }]);
      if (insertError) {
        console.error('Error inserting new status:', insertError.message);
      } else if (insertedData) {
        setStatus(selectedStatus);       
      }
    }
    toast.success(`Berhasil mengubah status menjadi ${selectedStatus}`)
    router.replace('/')
  };

  const handleCancelConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  return (
    <div>
      <h2>Status: {status}</h2>
      <div>
        <label>
          <input
            type="radio"
            name="status"
            value="maintenance"
            checked={selectedStatus === 'maintenance'}
            onChange={handleStatusChange}
          />
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
      <ConfirmationDialog
        isOpen={isConfirmationOpen}
        status={selectedStatus}
        onCancel={handleCancelConfirmation}
        onConfirm={handleConfirmStatusChange}
      />
    </div>
  );
};

export default SwitchAnnouncement;
