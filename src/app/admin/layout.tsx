import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin | RPL',
  description: 'Check Status Lab RPL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang='en'>
        <body className={inter.className}>
          <a href='/'>Back to home</a>
          {children}
        </body>
      </html>
    </>
  );
}
