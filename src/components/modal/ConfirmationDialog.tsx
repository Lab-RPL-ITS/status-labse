import React, { useState } from 'react';
import { BsQuestion } from 'react-icons/bs';

type ConfirmationDialogProps = {
  status: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog = ({
  status,
  isOpen,
  onCancel,
  onConfirm,
}: ConfirmationDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <span className='hidden sm:inline-block sm:h-screen sm:align-middle'></span>
        &#8203;
        <div
          className='inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-400 sm:mx-0 sm:h-10 sm:w-10'>
                <BsQuestion className='h-6 w-6 text-gray-400' />
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h2
                  className='pt-2 text-xl font-bold leading-6 text-gray-900'
                  id='modal-headline'
                >
                  Change the Status
                </h2>
                <h3
                  className='pt-5 text-lg font-medium leading-6 text-gray-900'
                  id='modal-headline'
                >
                  Are you sure want to change the status to {`'${status}'`} ?
                </h3>
              </div>
            </div>
          </div>
          <div className='bg-gray-100 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:space-y-0 space-y-2'>
            <button
              className='inline-flex w-full justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button
              className='inline-flex w-full justify-center rounded-md border border-transparent bg-gray-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
