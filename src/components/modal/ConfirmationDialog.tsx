import React, { useState } from 'react';

type ConfirmationDialogProps = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
  };
  

const ConfirmationDialog = ({ isOpen, onCancel, onConfirm }:ConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4">
        <p className="text-gray-800 text-lg mb-4">Are you sure you want to change the status?</p>
        <div className="flex justify-end">
          <button className="mr-2 px-4 py-2 bg-gray-300 rounded-lg text-gray-800 font-medium" onClick={onCancel}>Cancel</button>
          <button className="px-4 py-2 bg-blue-500 rounded-lg text-white font-medium" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
