import { useState } from "react"

const T = {
  navy:        "#14365c",
  navyInk:     "#094679",
  brandDef:    "#0068f5",
  brandStrong: "#0a57a3",
  brandDeep:   "#17629c",
  accentSoft:  "#458cff",
  surfaceApp:  "#f1f5fb",
  surfaceCard: "#ffffff",
  surfaceTint: "#e2f1fc",
  surfaceTint2:"#f2f9ff",
  surfaceTrack:"#e3eef7",
  textStrong:  "#14365c",
  textBody:    "#5a7184",
  textMuted:   "#8a9bb0",
  textNav:     "#9aabbc",
  textOnDark:  "#ffffff",
  textOnDarkSoft: "#cde7fb",
  textOnDarkMuted:"#9cc8ec",
  green:       "#00a86b", greenTint: "#e3f6ec", greenDeep: "#0e6b4b", greenSoft: "#9ff0cf",
  red:         "#d9342b", redTint: "#fde8e8",
  orange:      "#e25a1f", orangeTint: "#ffe3d6",
  purpleTint:  "#efe9fc",
  borderCard:  "#e1eaf2",
  borderTint:  "#9cc8ec",
  borderHL:    "#1e88d2",
  gradHeader:  "linear-gradient(160deg, #0a3d74 0%, #2d8bcb 75%)",
  gradIdCard:  "linear-gradient(153deg, #0a3d74 0%, #2d8bcb 71%)",
  gradProgress:"linear-gradient(90deg, #4d91ff 0%, #094679 100%)",
  shadowCard:  "0 6px 8px rgba(13,51,102,0.07)",
  shadowFloat: "0 0 15px rgba(0,0,0,0.18)",
  shadowNav:   "0 -6px 10px rgba(0,0,0,0.10)",
  shadowFab:   "0 0 20px rgba(0,0,0,0.25)",
  rSm: 8, rMd: 15, rLg: 16, rCard: 20, rXl: 24,
}

const USER = {
  name: "ישראל ישראלי",
  role: "מהנדס תפעול",
  location: "יא\"מ עמקים והכרמל",
  dept: "אגף התפלה",
  id: "984552",
  validUntil: "12/26",
}

const DAYS = [
  { day: "ראשון", date: "07/06", done: true },
  { day: "שני",   date: "08/06", done: true },
  { day: "שלישי", date: "09/06", done: true },
  { day: "רביעי", date: "10/06", active: true },
  { day: "חמישי", date: "11/06" },
]

const INITIAL_NOTIFS = [
  { id: 1, time: "לפני 10 דק׳", title: "הקסדה ובגדי המגן שלך מוכנים לאיסוף", sub: "מחסן ראשי, בניין C · פתוח עד 16:00", unread: true },
  { id: 2, time: "08:15", title: "אישור גישה למערכת SCADA ממתין לך", sub: "השלימו את ההזדהות הד-שלבית כדי לקבל הרשאות צפייה", unread: true },
  { id: 3, time: "אתמול · 18:30", title: "כל הכבוד! השלמת 3 ימים ברצף 🎉", sub: "", unread: false },
  { id: 4, time: "10/06/26 · יום שני · 18:30", title: "כל הכבוד! השלמת 2 ימים ברצף 🎉", sub: "", unread: false },
]

const mockResponses = {
  "איפה אני לוקח רכב תפעולי?": {
    text: "קל! 🙂 רכבי התפעול בחניון B, קומה 1. מה שצריך:\n1. טופס 12 חתום (מצורף כאן 👆)\n2. תג עובד — כבר יש לך ✓\n3. חתימה אצל דנה, מנהל רכב",
    actions: [
      { label: "📍 נווט לחניון B", color: T.surfaceTint, textColor: T.brandDef },
      { label: "📄 טופס 12", color: T.surfaceTint, textColor: T.brandDef },
    ]
  },
  "איפה חדר האוכל? 🍽️": {
    text: "חדר האוכל נמצא בבניין הראשי, קומה 0.\nפתוח: א׳-ה׳ 7:00–15:00 🍽️",
    actions: [{ label: "🗺️ נווט לחדר האוכל", color: T.surfaceTint, textColor: T.brandDef }]
  },
  "איך מתחברים ל-VPN?": {
    text: "להתחברות ל-VPN:\n1. פתח את Cisco AnyConnect\n2. הכנס: vpn.mekorot.co.il\n3. שם משתמש: מספר עובד\n4. סיסמה: כמו לאאוטלוק\n\nיש בעיה? שלוחה 4040 🎧",
    actions: [{ label: "⬇️ הורד מדריך VPN", color: T.surfaceTint, textColor: T.brandDef }]
  },
  "מתי מגיע המחשב שלי?": {
    text: "המחשב הנייד שלך מוכן לאיסוף! 💻\nדלפק IT, בניין ראשי קומה 1.\nפתוח עד 16:00 היום 😊",
    actions: [{ label: "📍 נווט לדלפק IT", color: T.surfaceTint, textColor: T.brandDef }]
  },
}

function getReply(text) {
  return mockResponses[text] || {
    text: "שאלה טובה! 🤔 אני בודק...\nאם אין לי תשובה מיד — אוציא אותך לאיש הקשר הנכון.",
    actions: null
  }
}

function AppHeader({ greeting, sub, onOpenAbout, onOpenNotif, hasUnread }) {
  return (
    <header style={{ position: "relative", width: "100%", minHeight: 170, flexShrink: 0, overflow: "visible" }}>
      <img src="/header_bg.png" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "relative", zIndex: 1, padding: "16px 24px 32px", color: T.textOnDark }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={onOpenAbout} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              <img src="/mekorot-logo.png" alt="מקורות" style={{ height: 26, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
            </button>
            <button onClick={onOpenNotif} style={{ background: "none", border: "none", color: T.textOnDark, cursor: "pointer", position: "relative", padding: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={22} height={22}>
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.7 21a2 2 0 0 1-3.4 0"/>
              </svg>
              {hasUnread && <span style={{ position: "absolute", top: 0, right: 0, width: 7, height: 7, background: T.orange, borderRadius: "50%", display: "block" }} />}
            </button>
          </div>
          <img src="/mekguide-logo.png" alt="MekGuide" style={{ height: 22, objectFit: "contain" }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 24 }}>{greeting}</div>
          {sub && <div style={{ fontWeight: 400, fontSize: 13, color: T.textOnDarkSoft, marginTop: 3 }}>{sub}</div>}
        </div>
      </div>
    </header>
  )
}

function SectionHead({ title, link }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", direction: "rtl" }}>
      <h2 style={{ fontWeight: 700, fontSize: 18, color: T.navy }}>{title}</h2>
      {link && <span style={{ fontWeight: 500, fontSize: 14, color: T.brandStrong, cursor: "pointer" }}>{link}</span>}
    </div>
  )
}

function Tile({ iconBox, title, sub, subVariant, badge, done, highlight, lead }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", padding: "13px 16px", background: highlight ? T.surfaceTint2 : T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, border: highlight ? `1px solid ${T.borderHL}` : "none", direction: "rtl" }}>
      <div style={{ flex: "none", width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: T.rMd, ...iconBox.style }}>
        {iconBox.content}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
        {badge ? (
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: done ? T.textMuted : T.navy }}>{title}</span>
            {badge}
          </div>
        ) : (
          <span style={{ fontWeight: 700, fontSize: 14, color: done ? T.textMuted : T.navy }}>{title}</span>
        )}
        <span style={{ fontWeight: 400, fontSize: 12, color: subVariant === "ok" ? T.green : subVariant === "info" ? T.textBody : T.textMuted }}>{sub}</span>
      </div>
      {lead && <span style={{ flex: "none", width: 20, height: 20, color: T.textMuted, display: "flex" }}>{lead}</span>}
    </div>
  )
}

function Badge({ variant, children }) {
  const variants = {
    required: { background: T.orangeTint, color: T.orange },
    ok:       { background: T.greenTint,  color: T.greenDeep },
    info:     { background: T.surfaceTint, color: T.brandDeep },
  }
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 24, padding: "0 12px", borderRadius: T.rSm, fontWeight: 700, fontSize: 11, whiteSpace: "nowrap", ...variants[variant] }}>{children}</span>
}

function FabMeki({ onOpenChat }) {
  return (
    <button onClick={onOpenChat} style={{ position: "absolute", right: -19, bottom: 93, width: 72, height: 69, background: "#fff", borderRadius: "90px 0 0 90px", boxShadow: T.shadowFab, display: "grid", placeItems: "center", border: "none", cursor: "pointer", zIndex: 10 }}>
      <img src="/mascots/thinking.png" alt="T.A.L" style={{ width: 56, height: 56, objectFit: "contain" }} />
    </button>
  )
}

function NotifPanel({ onClose, notifs, onDelete }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 40, display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#fff", borderBottomLeftRadius: 24, borderBottomRightRadius: 24, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", direction: "rtl" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "48px 24px 16px" }}>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: "50%", background: T.surfaceTrack, border: "none", display: "grid", placeItems: "center", cursor: "pointer" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={T.navy} strokeWidth="2.2" width={16} height={16}><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: T.navy }}>התראות</div>
            <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted }}>{notifs.filter(n => n.unread).length} שלא נקראו</div>
          </div>
          <div style={{ width: 32 }} />
        </div>
        <div style={{ maxHeight: 420, overflowY: "auto" }}>
          {notifs.length === 0 && (
            <div style={{ textAlign: "center", padding: "32px 0", color: T.textMuted, fontSize: 14 }}>אין התראות 🎉</div>
          )}
          {notifs.map((n) => (
            <div key={n.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 24px", borderTop: `1px solid ${T.borderCard}`, background: n.unread ? T.surfaceTint2 : "#fff" }}>
              <button onClick={() => onDelete(n.id)} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, padding: 0, marginTop: 2, flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={18} height={18}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 3 }}>{n.time}</div>
                <div style={{ fontWeight: n.unread ? 700 : 500, fontSize: 13.5, color: n.unread ? T.brandDef : T.navy, marginBottom: n.sub ? 3 : 0 }}>{n.title}</div>
                {n.sub && <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted }}>{n.sub}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div onClick={onClose} style={{ flex: 1, background: "rgba(0,0,0,0.3)", cursor: "pointer" }} />
    </div>
  )
}

function AboutPanel({ onClose }) {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, background: "#fff", display: "flex", flexDirection: "column", overflowY: "auto", direction: "rtl" }}>
      <div style={{ background: T.gradHeader, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>✕</button>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src="/mekorot-logo.png" alt="מקורות" style={{ height: 36, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
          <div style={{ fontSize: 11, color: T.textOnDarkSoft, marginTop: 2 }}>מובילים את מקור החיים קרוב ל-90 שנים</div>
        </div>
        <div style={{ width: 28 }} />
      </div>
      <div style={{ padding: "16px 24px 0" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 6 }}>חברת המים הלאומית</div>
        <div style={{ fontSize: 12, color: T.textBody, lineHeight: 1.7, marginBottom: 16 }}>מקורות היא חברת המים הלאומית של ישראל, המספקת כ-80% ממשקי הבית במדינה. החברה מתכננת, מקימה ומפעילה את תשתיות המים הארציות — ממקורות הטבע ועד ברז המטבח.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { num: "80%", label: "מצריכת משקי הבית", icon: "💧" },
            { num: "2,000", label: "עובדי הקבוצה", icon: "👷" },
            { num: "100+", label: "פרויקטים בארץ ובעולם", icon: "🌍" },
            { num: "₪5.1B", label: "הכנסות בשנה", icon: "💰" },
            { num: "13 ק״מ", label: "צינורות הולכה ארצית", icon: "🔧" },
            { num: "AAA IL", label: "דירוג אשראי", icon: "⭐" },
          ].map((s, i) => (
            <div key={i} style={{ background: T.surfaceTint, borderRadius: T.rCard, padding: "10px 12px" }}>
              <div style={{ fontSize: 18 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: T.brandDef, margin: "2px 0" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: T.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 8 }}>סרטון תדמית</div>
        <video src="/promo.mp4" controls style={{ width: "100%", borderRadius: T.rLg, marginBottom: 20 }} />
      </div>
    </div>
  )
}

function MainScreen({ onOpenChat, onOpenAbout, onOpenNotif, hasUnread }) {
  return (
    <>
      <AppHeader greeting={`בוקר טוב, ${USER.name.split(" ")[0]}`} sub={`${USER.role} · ${USER.location}`} onOpenAbout={onOpenAbout} onOpenNotif={onOpenNotif} hasUnread={hasUnread} />
      <div style={{ flex: 1, overflowY: "auto", background: T.surfaceApp, padding: "0 24px 120px" }}>
        <div style={{ marginTop: 16, position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 9, padding: "20px 16px", background: T.surfaceCard, borderRadius: T.rXl, boxShadow: T.shadowFloat, direction: "rtl" }}>
          <h2 style={{ fontWeight: 700, fontSize: 17, color: T.navy }}>כמעט סיימת את השבוע הראשון 🎉</h2>
          <p style={{ fontWeight: 400, fontSize: 13, color: T.textBody }}>9 מתוך 12 משימות הושלמו</p>
          <div style={{ position: "relative", height: 14, width: "100%", background: T.surfaceTrack, borderRadius: 7, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "75%", background: T.gradProgress, borderRadius: 7 }} />
          </div>
          <p style={{ fontWeight: 500, fontSize: 12, color: T.brandStrong }}>75% מהמסע — עוד 2 משימות היום ואת/ה שם! 💪</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 28, justifyContent: "space-between" }}>
          {DAYS.map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, height: 70, justifyContent: "center", position: "relative", background: d.active ? "rgba(69,140,255,0.95)" : T.surfaceCard, border: `1px solid ${d.active ? "transparent" : T.borderCard}`, borderRadius: T.rCard }}>
              {d.done && !d.active && <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", color: T.green, fontSize: 11, boxShadow: T.shadowCard }}>✓</span>}
              <span style={{ fontWeight: 500, fontSize: 11, color: d.active ? "#e3f0f7" : T.textMuted }}>{d.day}</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: d.active ? "#fff" : "#33495e" }}>{d.date}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <SectionHead title="המשימות שלך היום" link="הכל" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Tile done iconBox={{ style: { background: T.green, color: "#fff" }, content: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" width={22} height={22}><path d="M20 6 9 17l-5-5"/></svg> }} title="איסוף תג עובד" sub="08:00–08:30 · הושלם" subVariant="ok" />
            <Tile highlight iconBox={{ style: { background: T.brandStrong, color: "#fff" }, content: <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" width={22} height={22}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/></svg> }} title="תדריך בטיחות מתקן מרכזי" sub="09:00–10:00 · מתחיל בעוד 20 דק׳" subVariant="info" badge={<Badge variant="required">חובה</Badge>} />
            <Tile iconBox={{ style: { background: T.purpleTint, color: "#6b4fb0" }, content: <svg viewBox="0 0 24 24" fill="none" stroke="#6b4fb0" strokeWidth="1.8" width={22} height={22}><path d="M9 3v2m6-2v2M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg> }} title="סיור מעבדות ובקרת איכות" sub="11:30–12:45 · אגף איכות המים" />
          </div>
        </div>

        <div style={{ width: "calc(100% + 48px)", marginInline: -24, marginTop: 28, height: 220, overflow: "hidden" }}>
          <video src="/mascots/lab.mp4" controls playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <SectionHead title="התעודה הדיגיטלית שלי" />
          <div style={{ position: "relative", overflow: "hidden", display: "flex", alignItems: "center", gap: 16, padding: 18, minHeight: 166, borderRadius: T.rXl, background: T.gradIdCard, color: "#fff", direction: "rtl" }}>
            <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.08)", left: -20, top: -20 }} />
            <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-start" }}>
              <span style={{ fontWeight: 500, fontSize: 11, color: T.textOnDarkMuted }}>עובד מקורות</span>
              <span style={{ fontWeight: 700, fontSize: 21 }}>{USER.name}</span>
              <span style={{ fontWeight: 400, fontSize: 13, color: T.textOnDarkSoft }}>{USER.role} · {USER.dept}</span>
              <span style={{ fontWeight: 500, fontSize: 12, color: T.textOnDarkMuted }}>מס׳ עובד: {USER.id}</span>
              <span style={{ marginTop: 8, display: "inline-flex", alignItems: "center", height: 30, padding: "0 10px", borderRadius: T.rMd, background: T.greenDeep, color: T.greenSoft, fontWeight: 700, fontSize: 11.5, whiteSpace: "nowrap" }}>✓ תעודה בתוקף עד {USER.validUntil}</span>
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 12, background: "#fff", borderRadius: T.rLg, flexShrink: 0 }}>
              <img src="/qr.png" alt="QR" style={{ width: 70, height: 70, borderRadius: 8 }} />
              <span style={{ fontWeight: 500, fontSize: 10.5, color: T.textOnDarkMuted, whiteSpace: "nowrap" }}>סרוק בכניסה למתקן</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 28 }}>
          <SectionHead title="מסמכים ומדריכים" link="הכל" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Tile iconBox={{ style: { background: T.redTint, color: T.red, fontWeight: 700, fontSize: 11 }, content: "PDF" }} title="מדריך בטיחות מעבדה מרכזית" sub="PDF · 2.4MB · עודכן לפני יומיים" lead={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"/></svg>} />
            <Tile iconBox={{ style: { background: T.greenTint, color: T.green }, content: <svg viewBox="0 0 24 24" fill="none" stroke={T.green} strokeWidth="1.8" width={22} height={22}><path d="m9 6 6 3 6-3v12l-6 3-6-3-6 3V9l6-3Zm0 0v12m6-9v12"/></svg> }} title="מפת מתקן התפלה אשדוד" sub="קובץ אינטראקטיבי" lead={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M14 4h6v6m0-6L10 14M9 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/></svg>} />
          </div>
        </div>

        <button onClick={onOpenChat} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", marginTop: 28, padding: "20px 16px", background: T.surfaceTint, border: `1px solid ${T.borderTint}`, borderRadius: T.rXl, cursor: "pointer", direction: "rtl" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: T.brandDeep }}>צריך/ה עזרה עם מסמך?</span>
            <span style={{ fontWeight: 400, fontSize: 12.5, color: "#2a5a86" }}>T.A.L עונה על כל שאלה - תוך שניות</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: 36, borderRadius: 999, fontWeight: 700, fontSize: 12.5, color: "#fff", background: T.brandDeep }}>לחצ/י כאן לשיחה עם T.A.L</span>
          </div>
          <img src="/mascots/clipboard.png" alt="T.A.L" style={{ width: 56, height: 56, objectFit: "contain", flexShrink: 0 }} />
        </button>
      </div>
      <FabMeki onOpenChat={onOpenChat} />
    </>
  )
}

function DocsScreen({ onOpenChat, onOpenAbout, onOpenNotif, hasUnread }) {
  const [activeFilter, setActiveFilter] = useState("הכל")
  const [search, setSearch] = useState("")
  const filters = ["הכל", "בטיחות", "נהלים", "טפסים", "מפות"]

  const recentDocs = [
    { title: "מדריך בטיחות מעבדה מרכזית", sub: "PDF · 2.4MB · עודכן לפני יומיים", type: "PDF", typeBg: T.redTint, typeColor: T.red, lead: "down", cat: "בטיחות" },
    { title: "מפת מתקן התפלה אשדוד", sub: "קובץ אינטראקטיבי", type: "🗺️", typeBg: T.greenTint, typeColor: T.green, lead: "open", cat: "מפות" },
  ]
  const importantDocs = [
    { title: "נהלי דיווח תקלות ציוד", sub: "Docx · 1.1MB", type: "DOC", typeBg: T.surfaceTint, typeColor: T.brandStrong, lead: "down", cat: "נהלים" },
    { title: "טופס 12 — שימוש ברכב תפעולי", sub: "טופס דיגיטלי · 2 דק׳ למילוי", type: "📋", typeBg: T.surfaceTint, typeColor: T.brandDeep, lead: "open", cat: "טפסים" },
    { title: "מדריך התחברות מרחוק (VPN)", sub: "PDF · 0.8MB", type: "PDF", typeBg: T.redTint, typeColor: T.red, lead: "down", cat: "נהלים" },
    { title: "על מקורות", sub: "מצגת · 12 שקופיות", type: "PPT", typeBg: T.purpleTint, typeColor: "#7c5cd6", lead: "down", cat: "מפות" },
  ]
  const allDocs = [...recentDocs, ...importantDocs]
  const filteredDocs = allDocs.filter(d => (activeFilter === "הכל" || d.cat === activeFilter) && (!search || d.title.includes(search)))
  const showSections = !search && activeFilter === "הכל"

  return (
    <>
      <AppHeader greeting="המסמכים שלי" onOpenAbout={onOpenAbout} onOpenNotif={onOpenNotif} hasUnread={hasUnread} />
      <div style={{ flex: 1, overflowY: "auto", background: T.surfaceApp, padding: "16px 24px 120px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, height: 52, padding: "0 16px", background: T.surfaceCard, borderRadius: 26, boxShadow: "0 8px 10px rgba(13,51,102,0.10)", marginBottom: 16, direction: "rtl" }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={T.textNav} strokeWidth="1.8" width={18} height={18}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="חיפוש מסמכים, נהלים, טפסים..." dir="rtl" style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, color: T.navy, fontFamily: "inherit", textAlign: "right" }} />
          {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: T.textMuted, fontSize: 18, padding: 0 }}>✕</button>}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 24, direction: "rtl", justifyContent: "space-between" }}>
          {filters.map((f, i) => (
            <span key={i} onClick={() => setActiveFilter(f)} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", height: 34, borderRadius: 17, background: activeFilter === f ? T.brandDef : T.surfaceCard, border: `1px solid ${activeFilter === f ? "transparent" : T.borderCard}`, fontWeight: activeFilter === f ? 700 : 500, fontSize: 11, color: activeFilter === f ? "#fff" : T.textBody, cursor: "pointer", whiteSpace: "nowrap" }}>{f}</span>
          ))}
        </div>
        {showSections && (<>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            <SectionHead title="נצפו לאחרונה 🕐" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{recentDocs.map((doc, i) => <DocRow key={i} doc={doc} />)}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            <SectionHead title="חשוב לשבוע הראשון" />
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{importantDocs.map((doc, i) => <DocRow key={i} doc={doc} />)}</div>
          </div>
        </>)}
        {!showSections && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
            {filteredDocs.length > 0 ? filteredDocs.map((doc, i) => <DocRow key={i} doc={doc} />) : <div style={{ textAlign: "center", color: T.textMuted, fontSize: 14, marginTop: 40 }}>לא נמצאו מסמכים</div>}
          </div>
        )}
        <button onClick={onOpenChat} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", marginTop: 8, padding: "20px 16px", background: T.surfaceTint, border: `1px solid ${T.borderTint}`, borderRadius: T.rXl, cursor: "pointer", direction: "rtl" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: T.brandDeep }}>לא מצאת את מה שחיפשת?</span>
            <span style={{ fontWeight: 400, fontSize: 12.5, color: "#2a5a86" }}>T.A.L ימצא לך כל מסמך תוך שניות</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: 36, borderRadius: 999, fontWeight: 700, fontSize: 12.5, color: "#fff", background: T.brandDeep }}>לחצ/י כאן לשיחה עם T.A.L</span>
          </div>
          <img src="/mascots/thinking.png" alt="T.A.L" style={{ width: 56, height: 56, objectFit: "contain", flexShrink: 0 }} />
        </button>
      </div>
      <FabMeki onOpenChat={onOpenChat} />
    </>
  )
}

function DocRow({ doc }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 16px", background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl" }}>
      <div style={{ flex: "none", width: 46, height: 46, display: "grid", placeItems: "center", borderRadius: T.rMd, background: doc.typeBg, color: doc.typeColor, fontWeight: 700, fontSize: doc.type.length > 2 ? 20 : 11 }}>{doc.type}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{doc.title}</div>
        <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>{doc.sub}</div>
      </div>
      <div style={{ flex: "none", width: 32, height: 32, display: "grid", placeItems: "center", borderRadius: 8, background: T.surfaceTrack, color: T.textMuted, cursor: "pointer" }}>
        {doc.lead === "down" ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={18} height={18}><path d="M12 3v12m0 0-4-4m4 4 4-4"/><path d="M3 19h18" strokeLinecap="round"/></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={18} height={18}><path d="M14 4h6v6m0-6L10 14M9 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4"/></svg>
        )}
      </div>
    </div>
  )
}

function EquipmentScreen({ onOpenChat, onOpenAbout, onOpenNotif, hasUnread }) {
  const [badgeCollected, setBadgeCollected] = useState(true)
  const [laptopCollected, setLaptopCollected] = useState(false)
  const [reportSent, setReportSent] = useState(false)
  const [badgeReportSent, setBadgeReportSent] = useState(false)

  return (
    <>
      <AppHeader greeting="הציוד שלי" onOpenAbout={onOpenAbout} onOpenNotif={onOpenNotif} hasUnread={hasUnread} />
      <div style={{ flex: 1, overflowY: "auto", background: T.surfaceApp, padding: "16px 24px 120px" }}>
        <div style={{ background: T.surfaceCard, borderRadius: T.rXl, padding: "16px", marginBottom: 24, boxShadow: T.shadowFloat, direction: "rtl" }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: T.navy, marginBottom: 8 }}>איסוף ציוד</div>
          <div style={{ fontWeight: 400, fontSize: 13, color: T.textBody, marginBottom: 8 }}>{[badgeCollected, laptopCollected].filter(Boolean).length} מתוך 2</div>
          <div style={{ position: "relative", height: 10, background: T.surfaceTrack, borderRadius: 5, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: `${([badgeCollected, laptopCollected].filter(Boolean).length / 2) * 100}%`, background: T.gradProgress, borderRadius: 5, transition: "width 0.4s" }} />
          </div>
        </div>

        <SectionHead title="הציוד שלי" />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
          {/* תג עובד */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "13px 16px", background: badgeCollected ? T.surfaceCard : T.surfaceTint2, borderRadius: T.rCard, boxShadow: T.shadowCard, border: badgeCollected ? "none" : `1px solid ${T.borderHL}`, direction: "rtl" }}>
            <span style={{ fontSize: 28, flex: "none" }}>🪪</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: T.navy }}>תג עובד</div>
              <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>נאסף · ביום הראשון</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {!badgeCollected ? (
                  <button onClick={() => setBadgeCollected(true)} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.surfaceTint, color: T.brandDef, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>✓ סמן כנאסף</button>
                ) : (<>
                  <button onClick={() => { setBadgeCollected(false); setBadgeReportSent(false) }} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.orangeTint, color: T.orange, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>↩ בטל סימון</button>
                  <button onClick={() => setBadgeReportSent(true)} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.redTint, color: T.red, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>⚠️ דווח על תקלה</button>
                </>)}
              </div>
              {badgeReportSent && <div style={{ fontSize: 11, color: T.green, marginTop: 4, fontWeight: 600 }}>✓ הדיווח נשלח לצוות IT</div>}
            </div>
            <div style={{ flex: "none", width: 26, height: 26, display: "grid", placeItems: "center", background: badgeCollected ? T.green : T.surfaceTrack, borderRadius: T.rMd, transition: "background 0.3s" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" width={14} height={14}><path d="M20 6 9 17l-5-5"/></svg>
            </div>
          </div>

          {/* מחשב נייד */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "13px 16px", background: laptopCollected ? T.surfaceCard : T.surfaceTint2, borderRadius: T.rCard, boxShadow: T.shadowCard, border: laptopCollected ? "none" : `1px solid ${T.borderHL}`, direction: "rtl" }}>
            <span style={{ fontSize: 28, flex: "none" }}>💻</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: T.navy }}>מחשב נייד + גישות</div>
              <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>נאסף · IT קומה 2</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
                {!laptopCollected ? (
                  <button onClick={() => setLaptopCollected(true)} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.surfaceTint, color: T.brandDef, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>✓ סמן כנאסף</button>
                ) : (<>
                  <button onClick={() => { setLaptopCollected(false); setReportSent(false) }} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.orangeTint, color: T.orange, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>↩ בטל סימון</button>
                  <button onClick={() => setReportSent(true)} style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.redTint, color: T.red, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>⚠️ דווח על תקלה</button>
                </>)}
              </div>
              {reportSent && <div style={{ fontSize: 11, color: T.green, marginTop: 4, fontWeight: 600 }}>✓ הדיווח נשלח לצוות IT</div>}
            </div>
            <div style={{ flex: "none", width: 26, height: 26, display: "grid", placeItems: "center", background: laptopCollected ? T.green : T.surfaceTrack, borderRadius: T.rMd, transition: "background 0.3s" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" width={14} height={14}><path d="M20 6 9 17l-5-5"/></svg>
            </div>
          </div>

          {/* טלפון נייד */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 16px", background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl", opacity: 0.6 }}>
            <span style={{ fontSize: 28, flex: "none" }}>📱</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: T.navy }}>טלפון נייד</div>
              <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>נאסף · כולל eSIM</div>
            </div>
            <span style={{ fontSize: 10, padding: "4px 10px", borderRadius: T.rSm, background: T.surfaceTrack, color: T.textMuted, fontWeight: 600, whiteSpace: "nowrap" }}>לא נדרש בתפקידך</span>
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHead title="צריך לאסוף" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: "13px 16px", background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, border: `1px solid ${T.borderHL}`, direction: "rtl" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 28, flex: "none" }}>⛑️</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: T.navy }}>קסדה ובגדי מגן</div>
                  <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>מחסן ראשי, בניין C · פתוח עד 16:00</div>
                </div>
              </div>
              <button style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.surfaceTint, color: T.brandDef, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>📍 נווט למחסן</button>
            </div>
            <div style={{ padding: "13px 16px", background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, border: `1px solid ${T.borderHL}`, direction: "rtl" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 28, flex: "none" }}>🚗</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: T.navy }}>רכב תפעולי</div>
                  <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>דרוש טופס 12 חתום + אישור מנהל</div>
                </div>
              </div>
              <button style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, height: 34, padding: "0 16px", background: T.surfaceTint, color: T.brandDef, border: "none", borderRadius: 17, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>📄 טופס 12</button>
            </div>
            <div style={{ padding: "16px", background: "#e8f8e8", borderRadius: T.rXl, direction: "rtl", display: "flex", alignItems: "center", gap: 12 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: T.greenDeep }}>חשוב לזכור!</div>
                <div style={{ fontWeight: 400, fontSize: 12, color: T.greenDeep, marginTop: 3 }}>את הקסדה חובה לאסוף לפני סיור המתקן מחר!</div>
              </div>
            </div>
            <SectionHead title="נקודות תמיכה" />
            {[
              { icon: "📍", title: "דלפק IT", sub: "בניין ראשי, קומה 1 · א'-ה' 8:00-16:00" },
              { icon: "🎧", title: "תמיכה טכנית", sub: "שלוחה 4040 · זמין גם בצ'אט T.A.L" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 16px", background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl" }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{item.title}</div>
                  <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FabMeki onOpenChat={onOpenChat} />
    </>
  )
}

function ContactsScreen({ onOpenChat, onOpenAbout, onOpenNotif, hasUnread }) {
  return (
    <>
      <AppHeader greeting="האנשים שלי" onOpenAbout={onOpenAbout} onOpenNotif={onOpenNotif} hasUnread={hasUnread} />
      <div style={{ flex: 1, overflowY: "auto", background: T.surfaceApp, padding: "16px 24px 120px" }}>
        <SectionHead title="החונך שלי 🌟" />
        <div style={{ marginTop: 12, padding: "19px 16px", background: T.surfaceCard, border: `1px solid ${T.borderHL}`, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ width: 63, height: 63, borderRadius: "50%", background: T.brandDef, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 20, flexShrink: 0 }}>י.א</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 16, color: T.navy }}>יואל אלקלעי</span>
              <span style={{ fontWeight: 400, fontSize: 12, color: T.textMuted }}>מומחה UI/UX · 5 שנים במקורות</span>
              <span style={{ fontWeight: 400, fontSize: 12, color: T.textMuted }}>🐝 עובדה כיפית: מגדל דבורים</span>
              <div style={{ display: "flex", gap: 11, marginTop: 4 }}>
                <a href="msteams://chat?email=o-ayoel@mekorot.co.il" style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 38, padding: "0 16px", borderRadius: 19, background: T.surfaceTint, color: T.brandDef, fontWeight: 700, fontSize: 12.5, textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  הודעה
                </a>
                <a href="msteams://call?email=o-ayoel@mekorot.co.il" style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 38, padding: "0 16px", borderRadius: 19, background: T.brandDef, color: "#fff", fontWeight: 700, fontSize: 12.5, textDecoration: "none" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={16} height={16}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.64-1.64a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  התקשר
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHead title="הצוות שלי" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { initials: "ש.ז", name: "שירה זינגר", role: "מנהלת צוות חווית משתמש ו-UX", email: "szinger@mekorot.co.il", color: "#4d91ff" },
              { initials: "ה.ב", name: "הגר ברקאי", role: "מיישם UI/UX", email: "o-hbarkai@mekorot.co.il", color: T.green },
              { initials: "א.ה", name: "אלדר הדר", role: "מיישם UI/UX", email: "o-hpatel@mekorot.co.il", color: "#7c5cd6" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl" }}>
                <div style={{ flex: "none", width: 48, height: 48, borderRadius: "50%", background: p.color, color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 16 }}>{p.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{p.name}</div>
                  <div style={{ fontWeight: 400, fontSize: 11.5, color: T.textMuted }}>{p.role}</div>
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  <a href={`msteams://chat?email=${p.email}`} style={{ color: T.brandStrong, textDecoration: "none" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>
                  <a href={`msteams://call?email=${p.email}`} style={{ color: T.brandStrong, textDecoration: "none" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.64-1.64a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHead title="תמיכה ושירותים" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "שרית אדרי - HR", role: "שכר, זכויות", email: "hr@mekorot.co.il" },
              { name: "מוקד IT", role: "גישות ומחשוב", email: "it@mekorot.co.il" },
              { name: "אבי ממן — ממונה בטיחות", role: "כל שאלת בטיחות", email: "safety@mekorot.co.il" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: T.navy }}>{p.name}</div>
                  <div style={{ fontWeight: 400, fontSize: 11.5, color: T.textMuted }}>{p.role}</div>
                </div>
                <div style={{ display: "flex", gap: 14 }}>
                  <a href={`msteams://chat?email=${p.email}`} style={{ color: T.brandStrong, textDecoration: "none" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></a>
                  <a href={`msteams://call?email=${p.email}`} style={{ color: T.brandStrong, textDecoration: "none" }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.64-1.64a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={onOpenChat} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", marginTop: 28, padding: "20px 16px", background: T.surfaceTint, border: `1px solid ${T.borderTint}`, borderRadius: T.rXl, cursor: "pointer", direction: "rtl" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start" }}>
            <span style={{ fontWeight: 700, fontSize: 16, color: T.brandDeep }}>לא בטוח למי לפנות?</span>
            <span style={{ fontWeight: 400, fontSize: 12.5, color: "#2a5a86" }}>T.A.L עונה על כל שאלה - תוך שניות</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "100%", height: 36, borderRadius: 999, fontWeight: 700, fontSize: 12.5, color: "#fff", background: T.brandDeep }}>לחצ/י כאן לשיחה עם T.A.L</span>
          </div>
          <img src="/mascots/thinking.png" alt="T.A.L" style={{ width: 56, height: 56, objectFit: "contain", flexShrink: 0 }} />
        </button>
      </div>
      <FabMeki onOpenChat={onOpenChat} />
    </>
  )
}

function CertsScreen({ onOpenChat, onOpenAbout, onOpenNotif, hasUnread }) {
  return (
    <>
      <AppHeader greeting="ההסמכות שלי" onOpenAbout={onOpenAbout} onOpenNotif={onOpenNotif} hasUnread={hasUnread} />
      <div style={{ flex: 1, overflowY: "auto", background: T.surfaceApp, padding: "16px 24px 120px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionHead title="הדרכות קרובות" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "🛡️", iconBg: "#e6efff", iconColor: "#4b53bc", title: "תדריך בטיחות מתקן מרכזי", sub: "09:00–10:00 · מתחיל בעוד 20 דק׳" },
              { icon: "🔬", iconBg: T.greenTint, iconColor: T.green, title: "סיור מעבדות ובקרת איכות", sub: "11:30–12:45 · אגף איכות המים" },
              { icon: "🖥️", iconBg: T.surfaceTint, iconColor: T.brandDeep, title: "הדרכת SCADA בסיסי", sub: "01/06/2025 · Teams" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "13px 16px", background: T.surfaceCard, borderRadius: T.rCard, boxShadow: T.shadowCard, direction: "rtl" }}>
                <div style={{ flex: "none", width: 42, height: 42, borderRadius: 12, background: item.iconBg, color: item.iconColor, display: "grid", placeItems: "center", fontSize: 22 }}>{item.icon}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 700, fontSize: 15, color: T.brandDef }}>{item.title}</span>
                  <div style={{ fontWeight: 400, fontSize: 12, color: T.textMuted, marginTop: 3 }}>{item.sub}</div>
                </div>
                <svg viewBox="0 0 24 24" width={20} height={20}>
                  <circle cx="12" cy="12" r="10" fill="#fff" stroke={T.brandDef} strokeWidth="1.5"/>
                  <path d="M12 16v-4m0-4h.01" stroke={T.brandDef} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            ))}
          </div>
          <SectionHead title="הסמכות שלי" />
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { icon: "⛑️", title: "בטיחות בסיסית", date: "01/01/2026" },
              { icon: "🔧", title: "מהנדס מים", date: "אול׳ בן גוריון · 2024" },
            ].map((cert, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, height: 130, justifyContent: "center", padding: "19px 16px", background: T.surfaceTint, border: `1px solid ${T.borderTint}`, borderRadius: T.rCard, boxShadow: T.shadowCard, textAlign: "center" }}>
                <div style={{ fontSize: 34 }}>{cert.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13.5, color: T.brandDeep }}>{cert.title}</div>
                <div style={{ fontWeight: 400, fontSize: 10.5, color: "#2a5a86" }}>{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FabMeki onOpenChat={onOpenChat} />
    </>
  )
}

function ChatScreen({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: "בוקר טוב ישראל! 👋 מוכן ליום השלישי במסע?\nאיך אפשר לעזור?", time: "9:41", actions: null }
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const suggestions = ["איפה חדר האוכל? 🍽️", "איך מתחברים ל-VPN?", "מתי מגיע המחשב שלי?", "איפה אני לוקח רכב תפעולי?"]

  const send = (text) => {
    if (!text.trim()) return
    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`
    setMessages(m => [...m, { role: "user", text, time }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const reply = getReply(text)
      setMessages(m => [...m, { role: "bot", text: reply.text, time, actions: reply.actions }])
    }, 1200)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: `radial-gradient(circle at 80% 18%, rgba(255,255,255,.55) 0 26px, transparent 27px), radial-gradient(circle at 15% 30%, rgba(255,255,255,.45) 0 34px, transparent 35px), #e3f0f7` }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px", background: "linear-gradient(180deg, #fff 60%, rgba(255,255,255,0) 100%)", flexShrink: 0, direction: "rtl" }}>
        <img src="/mascots/thumbsup.png" alt="" style={{ width: 48, height: 48, objectFit: "contain" }} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3, alignItems: "flex-end", paddingRight: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 18, color: T.navy }}>T.A.L</div>
          <div style={{ fontWeight: 400, fontSize: 12, color: T.textNav, display: "flex", alignItems: "center", gap: 5 }}>
            זמין תמיד · עונה תוך שניות
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2bd07a", display: "inline-block" }} />
          </div>
        </div>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: "50%", background: T.surfaceTrack, border: "none", cursor: "pointer", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <svg viewBox="0 0 24 24" fill="none" stroke={T.navy} strokeWidth="2.2" width={16} height={16}><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div style={{ alignSelf: "center", background: "rgba(255,255,255,0.6)", color: T.textBody, fontWeight: 500, fontSize: 11, padding: "5px 24px", borderRadius: 12, marginBottom: 8 }}>
        היום, {messages[0]?.time}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "0 24px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, alignSelf: m.role === "bot" ? "flex-end" : "flex-start", maxWidth: "85%" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", direction: m.role === "bot" ? "rtl" : "ltr" }}>
              {m.role === "bot" && <img src="/mascots/thinking.png" alt="" style={{ width: 28, height: 28, objectFit: "contain", flexShrink: 0, marginTop: 4 }} />}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ padding: "12px 16px", fontSize: 13.5, lineHeight: 1.6, whiteSpace: "pre-line", background: m.role === "bot" ? "#fff" : T.accentSoft, color: m.role === "bot" ? "#2a3b4d" : "#fff", borderRadius: m.role === "bot" ? "1px 18px 18px 18px" : "18px 18px 1px 18px", boxShadow: m.role === "bot" ? T.shadowCard : "none", fontWeight: m.role === "user" ? 500 : 400, textAlign: "right", direction: "rtl" }}>{m.text}</div>
                {m.actions && (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {m.actions.map((a, j) => (
                      <button key={j} style={{ display: "inline-flex", alignItems: "center", height: 34, padding: "0 16px", borderRadius: 17, background: a.color, color: a.textColor, border: `1px solid ${T.borderTint}`, fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>{a.label}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {m.role === "bot" && i === messages.length - 1 && !typing && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", direction: "rtl" }}>
                <span style={{ fontSize: 11, color: T.textMuted }}>T.A.L · לפני רגע</span>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0 }}>👎</button>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, padding: 0 }}>👍</button>
                <span style={{ fontSize: 11, color: T.navy, fontWeight: 500 }}>הסבר עזר?</span>
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div style={{ display: "flex", gap: 8, alignSelf: "flex-end", direction: "rtl" }}>
            <img src="/mascots/thinking.png" alt="" style={{ width: 28, height: 28, objectFit: "contain" }} />
            <div style={{ padding: "12px 16px", background: "#fff", borderRadius: "1px 18px 18px 18px", boxShadow: T.shadowCard }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: T.textMuted, display: "inline-block", animation: `bounce 1s ${i*0.15}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: "8px 24px 4px", direction: "rtl", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: T.navy, fontWeight: 500, marginBottom: 8 }}>שאלות נפוצות ליום השלישי:</div>
        <div className="suggestions-scroll" style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, cursor: "grab" }}
          onMouseDown={e => { const el = e.currentTarget; el.dataset.down = "true"; el.dataset.startX = e.pageX - el.offsetLeft; el.dataset.scrollLeft = el.scrollLeft }}
          onMouseMove={e => { const el = e.currentTarget; if (el.dataset.down !== "true") return; el.scrollLeft = el.dataset.scrollLeft - (e.pageX - el.offsetLeft - el.dataset.startX) }}
          onMouseUp={e => e.currentTarget.dataset.down = "false"}
          onMouseLeave={e => e.currentTarget.dataset.down = "false"}
        >
          {suggestions.map((q, i) => (
            <button key={i} onClick={() => send(q)} style={{ flex: "none", height: 34, padding: "0 14px", borderRadius: 17, background: "#fff", border: `1.2px solid ${T.borderTint}`, color: T.brandDef, fontWeight: 500, fontSize: 11.5, cursor: "pointer", whiteSpace: "nowrap", fontFamily: "inherit" }}>{q}</button>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", padding: "12px 24px 16px", borderTopLeftRadius: T.rXl, borderTopRightRadius: T.rXl, boxShadow: "0 -6px 9px rgba(13,51,102,.08)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", height: 50, padding: "0 8px", background: "#f2f7fb", border: `1px solid ${T.borderCard}`, borderRadius: 25, gap: 8, direction: "rtl" }}>
          <button onClick={() => send(input)} style={{ width: 40, height: 40, borderRadius: "50%", background: T.brandDef, border: "none", display: "grid", placeItems: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" width={18} height={18}><path d="m22 2-7 20-4-9-9-4 20-7z"/></svg>
          </button>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send(input)} placeholder="הודעה" style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, color: T.navy, fontFamily: "inherit", textAlign: "right", direction: "rtl" }} />
          <button style={{ background: "none", border: "none", cursor: "pointer", color: T.textNav, padding: 0, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"/></svg>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: T.textNav, padding: 0, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: T.textNav, padding: 0, display: "grid", placeItems: "center" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width={20} height={20}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

const TABS = [
  { label: "ראשי", icon: <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24}><path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z"/></svg> },
  { label: "הסמכות", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={24} height={24}><path d="m12 4 10 5-10 5L2 9l10-5Z"/><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/></svg> },
  { label: "אנשי קשר", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={24} height={24}><rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 18a5 5 0 0 1 10 0"/></svg> },
  { label: "ציוד", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={24} height={24}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
  { label: "מסמכים", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" width={24} height={24}><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg> },
]

const SCREENS = [MainScreen, CertsScreen, ContactsScreen, EquipmentScreen, DocsScreen]

export default function App() {
  const [tab, setTab] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)
  const Screen = SCREENS[tab]

  const hasUnread = notifs.some(n => n.unread)

  const handleOpenNotif = () => {
    setNotifOpen(true)
    setNotifs(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const handleDeleteNotif = (id) => {
    setNotifs(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div style={{ minHeight: "100vh", background: "#c9d4e0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Noto Sans Hebrew', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;500;600;700;900&display=swap');
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        button, input { font-family: inherit; }
        .suggestions-scroll { overflow-x: auto; }
        .suggestions-scroll::-webkit-scrollbar { display: block; height: 4px; }
        .suggestions-scroll::-webkit-scrollbar-track { background: transparent; }
        .suggestions-scroll::-webkit-scrollbar-thumb { background: #9cc8ec; border-radius: 4px; }
      `}</style>
      <div style={{ position: "relative", width: 390, minHeight: 844, margin: "24px auto", background: T.surfaceApp, overflow: "hidden", borderRadius: 28, boxShadow: "0 20px 60px rgba(10,40,80,0.25)", display: "flex", flexDirection: "column", direction: "rtl" }}>
        {aboutOpen ? (
          <AboutPanel onClose={() => setAboutOpen(false)} />
        ) : (
          <>
            <div style={{ position: "absolute", inset: "0 0 88px 0", overflow: "auto", display: "flex", flexDirection: "column" }}>
              <Screen
                onOpenChat={() => setChatOpen(true)}
                onOpenAbout={() => setAboutOpen(true)}
                onOpenNotif={handleOpenNotif}
                hasUnread={hasUnread}
              />
            </div>

            <nav style={{ position: "absolute", insetInline: 0, bottom: 0, display: "flex", justifyContent: "center", gap: 30, height: 88, padding: "16px 20px 0", background: T.surfaceCard, borderTopLeftRadius: T.rXl, borderTopRightRadius: T.rXl, boxShadow: T.shadowNav, direction: "rtl" }}>
              {TABS.map((t, i) => (
                <button key={i} onClick={() => setTab(i)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, width: 46, color: tab === i ? T.brandDef : T.textNav, fontWeight: 500, fontSize: 10.5, border: "none", background: "none", cursor: "pointer", position: "relative" }}>
                  <span style={{ position: "relative", display: "grid", placeItems: "center" }}>
                    {tab === i && <span style={{ position: "absolute", inset: "-8px -6px auto -6px", height: 34, background: T.surfaceTint, borderRadius: T.rLg, zIndex: -1 }} />}
                    {t.icon}
                  </span>
                  {t.label}
                </button>
              ))}
            </nav>

            {chatOpen && (
              <div style={{ position: "absolute", inset: 0, zIndex: 30, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div onClick={() => setChatOpen(false)} style={{ flex: 1, background: "rgba(0,0,0,0.35)", cursor: "pointer" }} />
                <div style={{ height: "78%", borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: "hidden", display: "flex", flexDirection: "column", background: "#e3f0f7", boxShadow: "0 -8px 30px rgba(0,0,0,0.15)" }}>
                  <ChatScreen onClose={() => setChatOpen(false)} />
                </div>
              </div>
            )}

            {notifOpen && (
              <NotifPanel
                onClose={() => setNotifOpen(false)}
                notifs={notifs}
                onDelete={handleDeleteNotif}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}