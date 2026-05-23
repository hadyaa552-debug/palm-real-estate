"use client"
import { useEffect } from "react"

export default function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-18172939254/t9hvCOnysbIcEPaXxNlD'
      })
    }
  }, [])

  return (
    <main dir="rtl" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem", fontFamily: "'Almarai',sans-serif", background: "#FAFAF7",
    }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: ".5rem", color: "#1a1a1a" }}>تم الإرسال بنجاح!</h1>
        <p style={{ color: "#888", marginBottom: "2rem", fontSize: ".9rem", lineHeight: 1.7 }}>شكراً لاهتمامك بمشروع Palm Hills رأس الحكمة. فريقنا هيتواصل معاك خلال 24 ساعة بالبروشور والأسعار التفصيلية.</p>
        <div style={{ background: "#fff", border: "1px solid rgba(0,0,0,.06)", borderRadius: 12, padding: "20px", marginBottom: "20px" }}>
          <a href="tel:+201001050018" dir="ltr" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,.05)", textDecoration: "none", color: "#1a1a1a" }}>
            <span style={{ fontWeight: 700, fontSize: ".95rem" }}>0100 900 5579</span>
            <span style={{ fontSize: ".72rem", color: "#8B1A1A", fontWeight: 600 }}>📞 اتصال مباشر</span>
          </a>
          <a href="https://wa.me/201001050018" target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", textDecoration: "none" }}>
            <span style={{ fontWeight: 700, color: "#25D366", fontSize: ".95rem" }}>واتساب</span>
            <span style={{ fontSize: ".72rem", color: "#888" }}>💬 رد فوري</span>
          </a>
        </div>
        <a href="/" style={{ display: "inline-block", background: "#8B1A1A", color: "#fff", padding: "14px 36px", fontWeight: 700, fontSize: ".88rem", textDecoration: "none", borderRadius: 8, fontFamily: "'Almarai',sans-serif" }}>
          العودة للرئيسية
        </a>
      </div>
    </main>
  )
}
