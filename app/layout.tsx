import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Palm Hills — رأس الحكمة | 1,400 فدان",
  description: "Palm Hills رأس الحكمة — أول مطور مصري في رأس الحكمة. 1,400 فدان، 4.8 كم شاطئ، تصميم OBMI. فلل وشاليهات وبيتش هومز.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Ads Base Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18172939254"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18172939254');

          // WhatsApp conversion
          function trackWhatsapp(url) {
            var callback = function() {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-18172939254/6dOsCO_ysbIcEPaXxNlD',
              'event_callback': callback
            });
            return false;
          }

          // Call conversion
          function trackCall(url) {
            var callback = function() {
              if (typeof(url) != 'undefined') { window.location = url; }
            };
            gtag('event', 'conversion', {
              'send_to': 'AW-18172939254/2YNBCOzysbIcEPaXxNlD',
              'event_callback': callback
            });
            return false;
          }
        `}</Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
