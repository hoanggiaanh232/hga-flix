import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'HGA Flix - Xem Phim Online Miễn Phí',
  description: 'Xem phim online miễn phí với chất lượng cao. Cập nhật phim chiếu rạp, phim bộ, phim lẻ mỗi ngày.',
  keywords: 'xem phim, phim online, netflix clone, ophim',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://hga-flix.vercel.app',
    siteName: 'HGA Flix',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-primary text-white`}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
