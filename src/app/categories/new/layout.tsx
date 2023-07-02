import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/components/theme-provider';
import { Navbar } from '@/app/components/navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'New category',
  description: 'Add a new category',
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
