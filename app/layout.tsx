import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "هاسيندا رأس الحكمة بالم هيلز | أسعار وتقسيط 10 سنوات",
  description:
    "هاسيندا رأس الحكمة من بالم هيلز عند الكيلو 238 على الساحل الشمالي - 1,400 فدان و4.8 كم بيتش فرونت. تبدأ من 11.7 مليون جنيه، 5% مقدم وتقسيط حتى 10 سنوات.",
  keywords:
    "هاسيندا رأس الحكمة,Hacienda Ras El Hekma,هاسيندا بالم هيلز,Palm Hills Hacienda,بالم هيلز رأس الحكمة,الساحل الشمالي 2026,أسعار هاسيندا رأس الحكمة,شاليهات هاسيندا,فيلات بيتش فرونت",
  openGraph: {
    title: "هاسيندا رأس الحكمة بالم هيلز - الكيلو 238 الساحل الشمالي",
    description:
      "مشروع ساحلي فاخر من بالم هيلز على 1,400 فدان مع 4.8 كم بيتش فرونت. بيتش هومز، شاليهات، توين هاوس وفيلات تبدأ من 11.7 مليون جنيه - تقسيط حتى 10 سنوات.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
