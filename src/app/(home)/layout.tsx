import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import { Navbar } from '@/app/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Inventory Application',
  description: 'Inventory Application project from The Odin Project curriculum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
