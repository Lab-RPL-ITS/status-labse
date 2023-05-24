import Emoji from '@/components/Emoji';
import React from 'react';
import clsx from 'clsx';

const AnnouncementVariant = ['close', 'open', 'maintenance'] as const;

type AnnouncementProps = {
  isLoading?: boolean;
  variant: string;
} & React.ComponentPropsWithRef<'div'>;

const Announcement = ({
  isLoading = false,
  variant = 'open',
}: AnnouncementProps) => {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'maintenance':
        return 'bg-amber-500';
      case 'open':
        return 'bg-emerald-500';
      case 'close':
        return 'bg-rose-500';
      default:
        return '';
    }
  };

  const containerClasses = clsx(
    'flex min-h-screen flex-col items-center justify-between p-24',
    getBackgroundColor()
  );

  return (
    <>
      {isLoading ? (
        <>
          <div className='flex min-h-screen justify-center items-center'>
            <span>Sedang mendapatkan status...</span>
          </div>
        </>
      ) : (
        <div className={containerClasses}>
          <div className='z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex flex-col'>
            <span className='text-gray-500 font-semibold text-6xl '>
              <span>Halo, Moorple!</span>
            </span>
            <>
              {variant === 'maintenance' && (
                <>
                  <span className='text-white font-medium text-2xl mt-2'>
                    Lab RPL sedang dalam masa maintenance
                  </span>
                  <span className='text-white text-xl mt-2'>
                    Tunggu kabar lanjutan atau hubungi admin yaa
                  </span>
                </>
              )}
              {variant === 'open' && (
                <>
                  <span className='text-white font-medium text-2xl mt-2'>
                    Yeay, Lab RPL sekarang sedang terbuka
                  </span>
                  <span className='text-white text-xl mt-2'>
                    Bisa segera masuk sebelum penuh yaa
                  </span>
                </>
              )}
              {variant === 'close' && (
                <>
                  <span className='text-white font-medium text-2xl mt-2'>
                    Maaf, Lab RPL sekarang masih belum buka
                  </span>
                  <span className='text-white text-xl mt-2'>
                    Tunggu kabar lanjutan atau hubungi admin yaa
                  </span>
                </>
              )}
            </>

            <Emoji />
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
