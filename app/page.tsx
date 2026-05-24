"use client"
import React, { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

const PHONE = "+201001050018"
const WA = "https://wa.me/201001050018"
const WEB3_KEY = "9ccc38bd-3017-4286-a082-e3aae869c3fa"

/* ── Data ── */
const UNITS = [
  { type: "Beach Home — 1 غرفة", price: "11,700,000 ج", tag: "أقل سعر" },
  { type: "Beach Home — 2 غرفة", price: "14,700,000 ج", tag: "الأكثر طلباً" },
  { type: "Beach Home — 3 غرف", price: "21,900,000 ج", tag: "" },
  { type: "Junior Chalet", price: "23,500,000 ج", tag: "" },
  { type: "Senior Chalet صغير", price: "27,500,000 ج", tag: "" },
  { type: "Senior Chalet كبير", price: "32,500,000 ج", tag: "" },
  { type: "Duo — توين هاوس", price: "44,000,000 ج", tag: "الأعلى فخامة" },
]

const VILLAS = [
  { row: "الصف الأول", beds: "7 غرف نوم", land: "1,300 م²", bua: "1,150 م²", floor: "طابق واحد", view: "إطلالة بحر مباشرة — الصف الأقرب للشاطئ" },
  { row: "الصف الثاني", beds: "6 غرف نوم", land: "850 م²", bua: "700 م²", floor: "طابق واحد", view: "إطلالة بحر كاملة بدون أي عوائق" },
  { row: "الصف الثالث", beds: "5 غرف نوم", land: "750 م²", bua: "700 م²", floor: "طابقين", view: "إطلالة بحر مرتفعة من الطابق الثاني" },
  { row: "الصف الرابع", beds: "—", land: "770 م²", bua: "515 م²", floor: "طابقين", view: "إطلالة بحر كاملة — كل الصفوف sea view" },
]

/* ── Reveal ── */
function useReveal(th = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [v, setV] = useState(false)
  useEffect(() => { const el = ref.current; if (!el) return; const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); ob.disconnect() } }, { threshold: th }); ob.observe(el); return () => ob.disconnect() }, [th]); return { ref, v }
}
function R({ children, d = 0, className = "" }: { children: React.ReactNode; d?: number; className?: string }) {
  const { ref, v } = useReveal()
  return <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(24px)", transition: `all .6s cubic-bezier(.16,1,.3,1) ${d}s` }}>{children}</div>
}

/* ── Lead Form (redirects to /thank-you) ── */
function Form({ dark = false, label = "سجّل الآن — احصل على البروشور" }: { dark?: boolean; label?: string }) {
  const router = useRouter()
  const [f, setF] = useState({ name: "", phone: "" })
  const [loading, setLoading] = useState(false)
  const go = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true)
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, name: f.name, phone: f.phone, project: "Palm Hills Ras El Hekma 1400 Feddan", subject: "Lead — Palm Hills رأس الحكمة" }),
      })
      if (r.ok) router.push("/thank-you"); else setLoading(false)
    } catch { setLoading(false) }
  }
  const bg = dark ? "rgba(139,26,26,.08)" : "#fff"
  const brd = dark ? "rgba(139,26,26,.15)" : "rgba(0,0,0,.08)"
  const col = dark ? "#1a1a1a" : "#1a1a1a"
  const ph = dark ? "#bbb" : "#aaa"
  return (
    <form onSubmit={go}>
      <style>{`.fi${dark ? "d" : "l"}::placeholder{color:${ph}}.fi${dark ? "d" : "l"}:focus{border-color:#8B1A1A!important;box-shadow:0 0 0 3px rgba(139,26,26,.06)!important}`}</style>
      {[{ p: "الاسم الكريم *", k: "name", t: "text" }, { p: "رقم الهاتف *", k: "phone", t: "tel" }].map(x => (
        <input key={x.k} className={`fi${dark ? "d" : "l"}`} type={x.t} placeholder={x.p} required
          value={(f as any)[x.k]} onChange={e => setF({ ...f, [x.k]: e.target.value })}
          style={{ width: "100%", padding: "15px 16px", marginBottom: 10, background: bg, border: `1px solid ${brd}`, borderRadius: 8, color: col, fontSize: ".88rem", outline: "none", fontFamily: "'Almarai',sans-serif", transition: "all .2s", direction: x.k === "phone" ? "ltr" : "rtl" }} />
      ))}
      <button type="submit" disabled={loading} style={{ width: "100%", padding: "16px", background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".9rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", opacity: loading ? .7 : 1, transition: "all .2s" }}>
        {loading ? "جاري الإرسال..." : label}
      </button>
    </form>
  )
}

/* ══════════ MAIN ══════════ */
export default function Page() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const router = useRouter()
  const [popupForm, setPopupForm] = useState({ name: "", phone: "" })
  const [popupLoading, setPopupLoading] = useState(false)

  useEffect(() => { setMounted(true); const fn = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn) }, [])
  useEffect(() => { try { if (!sessionStorage.getItem("ph_pop")) { const t = setTimeout(() => { setShowPopup(true); sessionStorage.setItem("ph_pop", "1") }, 5000); return () => clearTimeout(t) } } catch { } }, [])

  const submitPopup = async (e: React.FormEvent) => {
    e.preventDefault(); setPopupLoading(true)
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3_KEY, name: popupForm.name, phone: popupForm.phone, project: "Palm Hills Ras El Hekma 1400 Feddan", subject: "Lead — Palm Hills رأس الحكمة (Popup)" }),
      })
      if (r.ok) router.push("/thank-you"); else setPopupLoading(false)
    } catch { setPopupLoading(false) }
  }

  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <div dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}html{scroll-behavior:smooth}
        body{background:#FAFAF7;color:#1a1a1a;font-family:'Almarai',sans-serif;font-size:16px;direction:rtl}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        @keyframes slowZoom{0%{transform:scale(1)}100%{transform:scale(1.05)}}

        @media(max-width:768px){
          .nav{padding:0 16px!important;height:54px!important}
          .desk-links{display:none!important}
          .hero-grid{flex-direction:column!important;padding:80px 20px 32px!important;gap:20px!important}
          .hero-form{width:100%!important;position:relative!important}
          .hero-text h1{font-size:2.2rem!important}
          .split{grid-template-columns:1fr!important}
          .split-pad{padding:36px 20px!important}
          .split-img{min-height:240px!important}
          .grid4{grid-template-columns:1fr 1fr!important}
          .grid3{grid-template-columns:1fr!important}
          .grid2{grid-template-columns:1fr!important}
          .unit-row{flex-direction:column!important;gap:10px!important;align-items:stretch!important}
          .unit-cta{width:100%!important;justify-content:center!important}
          .footer-inner{flex-direction:column!important;gap:10px!important;text-align:center!important;padding-bottom:76px!important}
          .float-desktop{display:none!important}
          .stat-bar{flex-wrap:wrap!important}
          .stat-bar>div{flex:1 1 50%!important}
          .villa-cards{grid-template-columns:1fr!important}
          .mid-cta-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* NAV */}
      <nav className="nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 36px", height: 60, transition: "all .35s",
        background: scrolled ? "rgba(250,250,247,.97)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,.06)" : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 22, height: 22, background: "#8B1A1A", transform: "rotate(45deg)" }} />
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 600, letterSpacing: ".14em", color: scrolled ? "#1a1a1a" : "#fff" }}>PALM HILLS</span>
        </div>
        <div className="desk-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[["المشروع", "project"], ["الماستر بلان", "masterplan"], ["الأسعار", "prices"], ["المطور", "developer"], ["تواصل", "contact"]].map(([l, id]) => (
            <button key={id} onClick={() => scroll(id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: ".74rem", fontWeight: 600, color: scrolled ? "#8B7355" : "rgba(255,255,255,.55)", fontFamily: "'Almarai',sans-serif", letterSpacing: ".04em", transition: "color .2s" }}>{l}</button>
          ))}
          <a href={`tel:${PHONE}`} onClick={() => (window as any).trackCall(`tel:${PHONE}`)} dir="ltr" style={{ fontSize: ".82rem", fontWeight: 700, textDecoration: "none", color: scrolled ? "#8B1A1A" : "#fff" }}>01001050018</a>
          <button onClick={() => scroll("contact")} style={{ background: "#8B1A1A", color: "#fff", border: "none", padding: "9px 18px", fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", borderRadius: 6 }}>سجّل الآن</button>
        </div>
      </nav>

      {/* ═══ HERO — FORM FIRST ═══ */}
      <section style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
        {mounted && <img src="/images/masterplan.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", animation: "slowZoom 18s ease infinite alternate" }} />}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.92) 0%, rgba(26,26,26,.6) 50%, rgba(26,26,26,.45) 100%)" }} />

        <div className="hero-grid" style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: 1200, margin: "0 auto", width: "100%", padding: "100px 40px 60px", gap: 48 }}>
          {/* Text */}
          <div className="hero-text" style={{ flex: 1, maxWidth: 540 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 18, padding: "6px 14px", background: "rgba(139,26,26,.8)", borderRadius: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.5s infinite" }} />
              <span style={{ fontSize: ".7rem", fontWeight: 700, color: "#fff" }}>🏖 Palm Hills — ثقة 35+ سنة في التطوير العقاري</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,5.5vw,4.2rem)", fontWeight: 500, color: "#fff", lineHeight: 1.05, marginBottom: 18 }}>
              1,400 فدان<br />
              <span style={{ fontStyle: "italic", color: "rgba(255,255,255,.3)", fontWeight: 400 }}>في قلب</span>{" "}
              <span style={{ color: "#C8A97E" }}>رأس الحكمة</span>
            </h1>
            <p style={{ fontSize: ".9rem", color: "rgba(255,255,255,.45)", lineHeight: 1.9, marginBottom: 28, maxWidth: 440 }}>
              منتجع ساحلي على مدار العام — 4.8 كم شاطئ · تصميم OBMI العالمي · مارينا دولية · مطار خاص · 3 فنادق فاخرة · 95% وحدات بإطلالة بحر.
            </p>
            {/* Stats */}
            <div style={{ display: "flex", gap: 0, borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 18 }}>
              {[{ v: "1,400", l: "فدان" }, { v: "4.8 كم", l: "شاطئ" }, { v: "كيلو 238", l: "رأس الحكمة" }, { v: "OBMI", l: "التصميم" }].map((s, i) => (
                <div key={i} style={{ paddingLeft: i > 0 ? 18 : 0, marginLeft: i > 0 ? 18 : 0, borderLeft: i > 0 ? "1px solid rgba(255,255,255,.08)" : "none" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 500, color: "#C8A97E" }}>{s.v}</div>
                  <div style={{ fontSize: ".55rem", color: "rgba(255,255,255,.2)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="hero-form" style={{ width: 370, flexShrink: 0, background: "rgba(255,255,255,.97)", backdropFilter: "blur(20px)", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
            <div style={{ background: "#8B1A1A", padding: "18px 22px", textAlign: "center" }}>
              <p style={{ fontSize: ".62rem", fontWeight: 700, color: "rgba(255,255,255,.55)", letterSpacing: ".2em", marginBottom: 4 }}>سجّل واحصل على</p>
              <p style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>البروشور والأسعار التفصيلية</p>
            </div>
            <div style={{ padding: "22px" }}>
              <Form label="سجّل الآن" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
                <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة 1400 فدان")}`} onClick={() => (window as any).trackWhatsapp()} target="_blank" rel="noopener noreferrer"
                  style={{ padding: "11px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".72rem", textAlign: "center", textDecoration: "none", borderRadius: 8 }}>💬 واتساب</a>
                <a href={`tel:${PHONE}`} onClick={() => (window as any).trackCall(`tel:${PHONE}`)} style={{ padding: "11px", border: "1px solid rgba(0,0,0,.08)", color: "#1a1a1a", fontWeight: 700, fontSize: ".72rem", textAlign: "center", textDecoration: "none", borderRadius: 8 }}>📞 اتصل</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className="stat-bar" style={{ display: "flex", background: "#fff", borderBottom: "1px solid rgba(0,0,0,.04)" }}>
        {[{ i: "🌊", v: "95%", l: "إطلالة بحر/لاجون" }, { i: "🏖", v: "4.8 كم", l: "واجهة شاطئية" }, { i: "💧", v: "84%", l: "مياه وخضرة" }, { i: "📐", v: "1,400 فدان", l: "المساحة الكلية" }].map((s, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", padding: "22px 12px", borderLeft: i > 0 ? "1px solid rgba(0,0,0,.04)" : "none" }}>
            <div style={{ fontSize: "1rem", marginBottom: 4 }}>{s.i}</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", fontWeight: 600, color: "#8B1A1A" }}>{s.v}</div>
            <div style={{ fontSize: ".62rem", color: "#8B7355", marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ═══ PROJECT DETAILS ═══ */}
      <section id="project" style={{ padding: "64px 40px", background: "#FAFAF7" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <R>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#8B1A1A", marginBottom: 8 }}>PALM HILLS DEVELOPMENTS</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 500, marginBottom: 12 }}>منتجع ساحلي فاخر في رأس الحكمة</h2>
              <p style={{ fontSize: ".9rem", color: "#666", maxWidth: 650, margin: "0 auto", lineHeight: 1.9 }}>
                أول مطور مصري في رأس الحكمة — منتجع ساحلي متكامل على مدار العام على مساحة 1,400 فدان بتصميم OBMI الحائز على جوائز عالمية. يقع على كيلو 238 بواجهة شاطئية 4.8 كم. المشروع يضم مارينا دولية ومطار خاص و3 فنادق فاخرة ونوادي بحرية وبرايفت بيتشز ومناطق دايننج حصرية. 84% من المشروع مساحات مائية وخضرة و95% من الوحدات بإطلالة لاجونز أو بحر مباشر.
              </p>
            </div>
          </R>

          {/* Key numbers */}
          <R d={.1}>
            <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 32 }}>
              {[{ v: "كيلو 238", l: "موقع استراتيجي في رأس الحكمة" }, { v: "4.8 كم", l: "واجهة شاطئية على البحر" }, { v: "OBMI", l: "شركة التصميم العالمية" }, { v: "1,400", l: "فدان — المساحة الكلية" }].map((s, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "20px 16px", textAlign: "center", border: "1px solid rgba(0,0,0,.04)" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 600, color: "#8B1A1A", marginBottom: 4 }}>{s.v}</div>
                  <div style={{ fontSize: ".72rem", color: "#888" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </R>

          {/* Features */}
          <R d={.15}>
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", color: "#8B1A1A", marginBottom: 12, textAlign: "center" }}>المميزات والخدمات</p>
            </div>
          </R>
          <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 20 }}>
            {[
              { i: "⛵", t: "مارينا دولية", d: "مارينا بمقاييس عالمية داخل المشروع مباشرة" },
              { i: "⚓", t: "مارينا دولية", d: "لليخوت والقوارب — بمعايير عالمية" },
              { i: "🏙", t: "منطقة أعمال مركزية", d: "Central Business District لبيئة عمل متكاملة" },
              { i: "🚄", t: "شبكة نقل سريع", d: "Rapid Transit Network يربط كل أجزاء المدينة" },
              { i: "🏪", t: "منطقة حرة", d: "Private Service Free Zone — خدمات تجارية متكاملة" },
              { i: "🤖", t: "مدينة ذكية", d: "Smart City — بنية تحتية تكنولوجية متطورة" },
              { i: "🎭", t: "ترفيه ودايننج", d: "مطاعم ومناطق ترفيه على أعلى مستوى" },
              { i: "⚽", t: "نوادي رياضية", d: "Sports Clubs — لياقة بدنية ورياضات متنوعة" },
              { i: "🏨", t: "3 فنادق فاخرة", d: "Luxury Hotels — خدمة فندقية داخل المشروع" },
              { i: "💧", t: "84% مياه وخضرة", d: "مساحات خضراء ولاجونز في كل مكان" },
              { i: "🌊", t: "95% إطلالة بحر", d: "تقريباً كل الوحدات بإطلالة بحر أو لاجون" },
              { i: "🌍", t: "نظام سداد للأجانب", d: "خطة سداد كاملة مش لحد التسليم فقط" },
            ].map((f, i) => (
              <R key={i} d={i * .03}>
                <div style={{
                  background: "#fff", borderRadius: 10, padding: "18px 14px", textAlign: "center",
                  border: "1px solid rgba(0,0,0,.04)", transition: "all .2s", minHeight: 110,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.05)" }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none" }}>
                  <div style={{ fontSize: "1.4rem", marginBottom: 6 }}>{f.i}</div>
                  <div style={{ fontSize: ".8rem", fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{f.t}</div>
                  <div style={{ fontSize: ".68rem", color: "#999", lineHeight: 1.5 }}>{f.d}</div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MID CTA ═══ */}
      <section style={{ background: "#8B1A1A", padding: "40px" }}>
        <div className="mid-cta-grid" style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 32 }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 500, color: "#fff", marginBottom: 6 }}>احجز وحدتك قبل ارتفاع الأسعار</h3>
            <p style={{ fontSize: ".82rem", color: "rgba(255,255,255,.55)" }}>واحصل على البروشور والأسعار التفصيلية وخطط السداد</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => scroll("contact")} style={{ padding: "14px 28px", background: "#fff", color: "#8B1A1A", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>سجّل الآن</button>
            <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة")}`} onClick={() => (window as any).trackWhatsapp()} target="_blank" rel="noopener noreferrer"
              style={{ padding: "14px 28px", background: "#25D366", color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: ".85rem", textDecoration: "none" }}>💬 واتساب</a>
          </div>
        </div>
      </section>

      {/* ═══ MASTERPLAN ═══ */}
      <section id="masterplan" style={{ background: "#1a1a1a" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div className="split-img" style={{ position: "relative", overflow: "hidden", minHeight: "50vw" }}>
            <img src="/images/masterplan.jpg" alt="Masterplan" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="split-pad" style={{ padding: "56px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#C8A97E", marginBottom: 10 }}>MASTERPLAN</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500, color: "#fff", marginBottom: 8 }}>4 صفوف فلل — كلها إطلالة بحر</h2>
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", lineHeight: 1.85, marginBottom: 24 }}>
              تصميم OBMI العالمي يضمن إن كل الصفوف الأربعة ليها إطلالة بحر كاملة بدون أي عوائق. الصف الأول والتاني one story، والتالت والرابع طابقين. مساحات أراضي من 750 لـ 1,300 م².
            </p>
            <div className="villa-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {VILLAS.map((v, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,.04)", borderRadius: 10, padding: "16px", borderRight: "3px solid #8B1A1A" }}>
                  <div style={{ fontSize: ".75rem", fontWeight: 700, color: "#C8A97E", marginBottom: 6 }}>{v.row}</div>
                  <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>
                    {v.beds !== "—" && <><strong style={{ color: "rgba(255,255,255,.7)" }}>{v.beds}</strong> · </>}{v.floor}<br />
                    أرض <strong style={{ color: "rgba(255,255,255,.7)" }}>{v.land}</strong> · بناء <strong style={{ color: "rgba(255,255,255,.7)" }}>{v.bua}</strong><br />
                    <span style={{ fontSize: ".65rem", color: "rgba(255,255,255,.3)" }}>🌊 {v.view}</span>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => scroll("contact")} style={{ marginTop: 20, padding: "14px 28px", background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", alignSelf: "flex-start" }}>
              سجّل واحصل على الماستر بلان الكامل
            </button>
          </div>
        </div>
      </section>

      {/* ═══ PRICES ═══ */}
      <section id="prices" style={{ padding: "64px 40px", background: "#F4F1EC" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <R>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".25em", color: "#8B1A1A", marginBottom: 8 }}>الأسعار</p>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 500 }}>الوحدات والأسعار</h2>
              <p style={{ fontSize: ".82rem", color: "#888", marginTop: 6 }}>أسعار تبدأ من 11.7 مليون جنيه — Beach Homes و Chalets و Duo</p>
            </div>
          </R>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {UNITS.map((u, i) => (
              <R key={i} d={i * .04}>
                <div className="unit-row" style={{
                  background: "#fff", borderRadius: 10, padding: "20px 22px",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  border: "1px solid rgba(0,0,0,.05)", transition: "border .2s", position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,26,26,.15)"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(0,0,0,.05)"}>
                  {u.tag && <div style={{ position: "absolute", top: 0, left: 0, background: "#8B1A1A", color: "#fff", padding: "3px 12px", borderRadius: "0 0 8px 0", fontSize: ".58rem", fontWeight: 700 }}>{u.tag}</div>}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: ".9rem", fontWeight: 700, marginBottom: 2 }}>{u.type}</div>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.15rem", color: "#8B1A1A", fontWeight: 600 }}>{u.price}</div>
                  </div>
                  <div className="unit-cta" style={{ display: "flex", gap: 8 }}>
                    <a href={`${WA}?text=${encodeURIComponent(`مرحباً، أنا مهتم بـ ${u.type} في Palm Hills رأس الحكمة`)}`} target="_blank" rel="noopener noreferrer"
                      style={{ padding: "10px 14px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".72rem", textDecoration: "none", borderRadius: 6, whiteSpace: "nowrap" }}>💬 واتساب</a>
                    <button onClick={() => scroll("contact")} style={{ padding: "10px 14px", background: "#8B1A1A", color: "#fff", border: "none", fontWeight: 700, fontSize: ".72rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif", borderRadius: 6, whiteSpace: "nowrap" }}>سجّل الآن</button>
                  </div>
                </div>
              </R>
            ))}
          </div>

          {/* Payment */}
          <R d={.15}>
            <div className="grid3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 24 }}>
              {[
                { t: "جميع الأنواع", d1: "5% مقدم + 5% تعاقد", d2: "تقسيط على 10 سنوات" },
                { t: "فلل صف 1–4", d1: "5% مقدم + 5% تعاقد", d2: "تقسيط على 8 سنوات" },
                { t: "الأجانب", d1: "نظام سداد كامل", d2: "مش لحد التسليم فقط" },
              ].map((p, i) => (
                <div key={i} style={{ background: "#fff", borderRadius: 10, padding: "20px", textAlign: "center", border: "1px solid rgba(0,0,0,.04)" }}>
                  <div style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".1em", color: "#8B1A1A", marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontSize: ".88rem", fontWeight: 700, marginBottom: 2 }}>{p.d1}</div>
                  <div style={{ fontSize: ".78rem", color: "#888" }}>{p.d2}</div>
                </div>
              ))}
            </div>
          </R>
          <R d={.2}>
            <div style={{ marginTop: 14, background: "rgba(139,26,26,.05)", borderRadius: 8, padding: "12px", border: "1px solid rgba(139,26,26,.1)", textAlign: "center" }}>
              <span style={{ fontSize: ".82rem", color: "#8B1A1A", fontWeight: 700 }}>01001050018</span>
            </div>
          </R>
        </div>
      </section>

      {/* ═══ DEVELOPER ═══ */}
      <section id="developer" style={{ background: "#1a1a1a" }}>
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "50vh" }}>
          <div className="split-img" style={{ position: "relative", overflow: "hidden", minHeight: "35vw" }}>
            <img src="/images/palm-hills-aerial.jpg" alt="Palm Hills" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }} />
          </div>
          <div className="split-pad" style={{ padding: "52px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".68rem", fontWeight: 700, letterSpacing: ".25em", color: "#C8A97E", marginBottom: 10 }}>PALM HILLS DEVELOPMENTS</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 500, color: "#fff", marginBottom: 14 }}>أول مطور مصري في رأس الحكمة</h2>
            <div style={{ width: 28, height: 2, background: "#8B1A1A", marginBottom: 16 }} />
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.4)", lineHeight: 1.9, marginBottom: 24 }}>
              Palm Hills Developments واحدة من أكبر المطورين العقاريين في مصر والشرق الأوسط. تأسست عام 1997 ومدرجة في البورصة المصرية وبورصة لندن. لها أكثر من 35 مشروع متكامل ومحفظة أراضي 29 مليون متر مربع. المشاريع تشمل مجمعات سكنية ومنتجعات ساحلية ومراكز تجارية في شرق وغرب القاهرة والساحل الشمالي.
            </p>
            <div className="grid2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[{ v: "35+", l: "مشروع متكامل" }, { v: "1997", l: "سنة التأسيس" }, { v: "29M م²", l: "محفظة أراضي" }, { v: "EGX & LSE", l: "مدرجة بالبورصة" }].map((s, i) => (
                <div key={i} style={{ padding: "14px", background: "rgba(255,255,255,.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,.05)" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 600, color: "#C8A97E" }}>{s.v}</div>
                  <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.25)", marginTop: 2 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact">
        <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "55vh" }}>
          <div className="split-pad" style={{ background: "#8B1A1A", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".65rem", fontWeight: 700, letterSpacing: ".25em", color: "rgba(255,255,255,.45)", marginBottom: 10 }}>تواصل معنا</p>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 500, color: "#fff", lineHeight: 1.1, marginBottom: 14 }}>وحدتك تنتظرك<br /><span style={{ fontStyle: "italic", opacity: .3 }}>في رأس الحكمة</span></h2>
            <p style={{ fontSize: ".85rem", color: "rgba(255,255,255,.5)", lineHeight: 1.85, marginBottom: 28 }}>سجّل بياناتك واحصل على البروشور والأسعار التفصيلية وخطط السداد. فريقنا هيتواصل معاك خلال 24 ساعة.</p>
            <a href={`tel:${PHONE}`} onClick={() => (window as any).trackCall(`tel:${PHONE}`)} dir="ltr" style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 600, color: "#fff", textDecoration: "none", marginBottom: 20 }}>01001050018</a>
            <div style={{ display: "flex", gap: 10 }}>
              <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة 1400 فدان")}`} onClick={() => (window as any).trackWhatsapp()} target="_blank" rel="noopener noreferrer"
                style={{ padding: "12px 24px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>💬 واتساب</a>
              <a href={`tel:${PHONE}`} onClick={() => (window as any).trackCall(`tel:${PHONE}`)} style={{ padding: "12px 24px", border: "1px solid rgba(255,255,255,.25)", color: "#fff", fontWeight: 700, fontSize: ".78rem", textDecoration: "none", borderRadius: 8 }}>📞 اتصل الآن</a>
            </div>
          </div>
          <div className="split-pad" style={{ background: "#F4F1EC", padding: "56px 48px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".2em", color: "#8B1A1A", marginBottom: 8 }}>سجّل بياناتك</p>
            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 500, marginBottom: 6 }}>احصل على البروشور والأسعار</h3>
            <p style={{ fontSize: ".78rem", color: "#8B7355", marginBottom: 22 }}>فريقنا المتخصص في خدمتك — هنتواصل معاك خلال 24 ساعة</p>
            <Form dark label="سجّل الآن — احصل على البروشور" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a1a1a", padding: "18px 36px 76px" }}>
        <div className="footer-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 16, height: 16, background: "#8B1A1A", transform: "rotate(45deg)" }} />
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: ".82rem", letterSpacing: ".12em", color: "#C8A97E" }}>PALM HILLS</span>
          </div>
          <span style={{ fontSize: ".6rem", color: "rgba(255,255,255,.15)" }}>© 2026 Palm Hills Developments | وكيل معتمد</span>
        </div>
      </footer>

      {/* ═══ POPUP ═══ */}
      {showPopup && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)" }}>
          <div style={{ background: "#fff", maxWidth: 400, width: "100%", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.3)" }}>
            <div style={{ background: "#8B1A1A", padding: "22px 26px", color: "#fff", position: "relative" }}>
              <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: 10, left: 14, background: "none", border: "none", color: "rgba(255,255,255,.5)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
              <span style={{ fontSize: ".6rem", fontWeight: 700, letterSpacing: ".2em", color: "rgba(255,255,255,.55)", display: "block", marginBottom: 6 }}>PALM HILLS — رأس الحكمة</span>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 500, lineHeight: 1.15 }}>1,400 فدان<br /><span style={{ fontWeight: 700 }}>سجّل واحصل على البروشور</span></h2>
            </div>
            <div style={{ padding: "22px 26px" }}>
              {popupLoading ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <p style={{ fontWeight: 700 }}>جاري الإرسال...</p>
                </div>
              ) : (
                <form onSubmit={submitPopup}>
                  <style>{`.pp-i::placeholder{color:#aaa}.pp-i:focus{border-color:#8B1A1A!important}`}</style>
                  <p style={{ fontSize: ".78rem", color: "#888", marginBottom: 14, lineHeight: 1.7 }}>سجّل بياناتك واحصل على البروشور والأسعار التفصيلية وخطط السداد</p>
                  {[{ p: "الاسم الكريم *", k: "name" }, { p: "رقم الهاتف *", k: "phone" }].map(f => (
                    <input key={f.k} className="pp-i" placeholder={f.p} value={(popupForm as any)[f.k]}
                      onChange={e => setPopupForm({ ...popupForm, [f.k]: e.target.value })} required
                      type={f.k === "phone" ? "tel" : "text"}
                      style={{ width: "100%", padding: "13px 16px", marginBottom: 10, background: "#f8f5f0", border: "1px solid rgba(0,0,0,.06)", borderRadius: 8, fontSize: ".85rem", outline: "none", fontFamily: "'Almarai',sans-serif", direction: f.k === "phone" ? "ltr" : "rtl", color: "#1a1a1a" }} />
                  ))}
                  <button type="submit" style={{ width: "100%", padding: "14px", background: "#8B1A1A", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, fontSize: ".85rem", cursor: "pointer", fontFamily: "'Almarai',sans-serif" }}>🏖 سجّل الآن</button>
                  <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة 1400 فدان")}`} onClick={() => (window as any).trackWhatsapp()} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", marginTop: 8, padding: "12px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".75rem", textAlign: "center", textDecoration: "none", borderRadius: 8 }}>💬 واتساب مباشرة</a>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOAT */}
      <div className="float-desktop" style={{ position: "fixed", bottom: 76, left: 20, zIndex: 50, display: "flex", flexDirection: "column", gap: 8 }}>
        <a href={`tel:${PHONE}`} onClick={() => (window as any).trackCall(`tel:${PHONE}`)} style={{ width: 48, height: 48, borderRadius: 12, background: "#8B1A1A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(139,26,26,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </a>
        <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة")}`} onClick={() => (window as any).trackWhatsapp()} target="_blank" rel="noopener noreferrer"
          style={{ width: 48, height: 48, borderRadius: 12, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(37,211,102,.3)", textDecoration: "none" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
        </a>
      </div>

      {/* MOBILE BAR */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 40, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <a href={`tel:${PHONE}`} onClick={() => (window as any).trackCall(`tel:${PHONE}`)} style={{ padding: "15px", background: "#8B1A1A", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>📞 اتصل الآن</a>
        <a href={`${WA}?text=${encodeURIComponent("مرحباً، أنا مهتم بمشروع Palm Hills رأس الحكمة")}`} onClick={() => (window as any).trackWhatsapp()} target="_blank" rel="noopener noreferrer"
          style={{ padding: "15px", background: "#25D366", color: "#fff", fontWeight: 700, fontSize: ".78rem", textAlign: "center", textDecoration: "none" }}>💬 واتساب</a>
      </div>
    </div>
  )
}
