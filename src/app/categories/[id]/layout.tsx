import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/app/components/theme-provider';
import { Navbar } from '@/app/components/navbar';
import { Category } from '@prisma/client';
import { withAxios } from '@/app/util/axios';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({ params }: { params: { id: string } }) {
  const result = await withAxios.get(`/api/categories/${params.id}`);
  const data = result.data as Category;

  return {
    title: data.name + ' page',
    description: data.description,
  };
}

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
