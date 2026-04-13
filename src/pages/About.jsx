import { useState, useEffect, useRef } from "react";

const PURPLE = "#5B3A8A";
const TEAL = "#00A99D";

const teamMembers = [
  { name: "Dr. Amina Shaikh", role: "Chief Optometrist", icon: "👁️", desc: "15+ years of clinical expertise in refractive vision care and specialty contact lenses." },
  { name: "Tariq Hassan", role: "Head of Eyewear Design", icon: "🕶️", desc: "Curates our global frame collection with an eye for timeless elegance and modern trends." },
  { name: "Sana Mirza", role: "Patient Care Specialist", icon: "💎", desc: "Ensuring every visit feels personal, comfortable, and truly transformative." },
];

const values = [
  { icon: "🔬", label: "Precision", text: "Every lens crafted with exacting standards for your perfect vision." },
  { icon: "✨", label: "Elegance", text: "Frames selected where artistry meets everyday wearability." },
  { icon: "❤️", label: "Care", text: "Your eye health is our lifelong commitment, not just a transaction." },
  { icon: "🌍", label: "Community", text: "Rooted locally, thinking globally — vision for everyone." },
];

const stats = [
  { num: "12+", label: "Years of Care" },
  { num: "8K+", label: "Happy Clients" },
  { num: "500+", label: "Frame Styles" },
];

function useFadeUp() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, visible] = useFadeUp();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function OptiqueLogoSVG() {
  return (
    <svg viewBox="0 0 340 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 280 }}>
      <circle cx="34" cy="42" r="28" stroke={PURPLE} strokeWidth="5.5" fill="none"/>
      <path d="M62 42 Q74 28 86 42" stroke={PURPLE} strokeWidth="5" fill="none" strokeLinecap="round"/>
      <text x="88" y="62" fontFamily="Georgia,serif" fontSize="46" fontWeight="700" fill={PURPLE}>PTI</text>
      <text x="184" y="62" fontFamily="Georgia,serif" fontSize="46" fontWeight="700" fill={TEAL}>QUE</text>
      <line x1="6" y1="42" x2="0" y2="32" stroke={PURPLE} strokeWidth="4.5" strokeLinecap="round"/>
      <text x="190" y="83" fontFamily="Georgia,serif" fontSize="19" fontStyle="italic" fill="#ccc">House</text>
      <text x="190" y="97" fontFamily="Arial,sans-serif" fontSize="11" fill="#aaa" letterSpacing="1.5">Vision is Life</text>
    </svg>
  );
}

export default function About() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  const grad = `linear-gradient(135deg, ${PURPLE}, ${TEAL})`;

  return (
    <div style={{ fontFamily: "Georgia,serif", background: "#FAFAF8", color: "#2C2C2C", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ background: "#F5F3EF", padding: "72px 48px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position:"absolute", width:520, height:520, top:-180, right:-120, background:`radial-gradient(circle, ${TEAL}18 0%, transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:360, height:360, bottom:-120, left:-80, background:`radial-gradient(circle, ${PURPLE}12 0%, transparent 70%)`, borderRadius:"50%", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:2, maxWidth:1060, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          <div>
            <div style={{ display:"inline-flex", alignItems:"center", gap:10, fontSize:11, fontFamily:"Arial,sans-serif", fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:TEAL, marginBottom:20 }}>
              <div style={{ width:28, height:2, background:grad, borderRadius:2 }} />
              Our Story
            </div>
            <h1 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(38px,4.5vw,60px)", fontWeight:700, lineHeight:1.1, color:"#1C1C1C", marginBottom:24 }}>
              Vision Is Not<br />Just Sight —{" "}
              <span style={{ background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>It's Life.</span>
            </h1>
            <p style={{ fontFamily:"Arial,sans-serif", fontSize:16, fontWeight:300, lineHeight:1.8, color:"#5A5A5A", maxWidth:420, marginBottom:40 }}>
              At Optique House, we believe that clear vision transforms everything. We've combined clinical excellence with curated style to help every person see the world in its full, beautiful clarity.
            </p>
            <a href="#story" style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 28px", background:grad, color:"#fff", fontFamily:"Arial,sans-serif", fontSize:14, fontWeight:600, letterSpacing:"0.04em", border:"none", borderRadius:50, cursor:"pointer", boxShadow:`0 8px 24px ${PURPLE}30`, textDecoration:"none" }}>
              Discover Our Journey →
            </a>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            <div style={{ background:"#1A1A1A", borderRadius:20, padding:"32px 40px", boxShadow:"0 16px 48px rgba(0,0,0,0.14)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <OptiqueLogoSVG />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
              {stats.map(st => (
                <div key={st.label} style={{ background:"#fff", border:"1px solid #E8E4DE", borderRadius:14, padding:"18px 12px", textAlign:"center" }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:30, fontWeight:700, background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1, marginBottom:5 }}>{st.num}</div>
                  <div style={{ fontFamily:"Arial,sans-serif", fontSize:10, color:"#9A9A9A", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:600 }}>{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height:1, background:"#E8E4DE", maxWidth:1060, margin:"0 auto" }} />

      {/* ── STORY ── */}
      <section id="story" style={{ maxWidth:1060, margin:"0 auto", padding:"88px 48px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:72, alignItems:"center" }}>
        <FadeUp>
          <div style={{ fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:PURPLE, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:40, height:1, background:`linear-gradient(90deg, ${PURPLE}, transparent)` }} />
            Who We Are
          </div>
          <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(28px,3vw,42px)", fontWeight:700, lineHeight:1.18, color:"#1C1C1C", marginBottom:22 }}>
            Born from a Passion<br />for <em style={{ color:TEAL }}>Perfect Vision</em>
          </h2>
          <div style={{ fontFamily:"Arial,sans-serif", fontSize:15, fontWeight:300, lineHeight:1.82, color:"#5A5A5A" }}>
            <p>Optique House was founded on a simple but powerful idea: that every person deserves not just functional vision correction, but an experience that feels luxurious, personal, and deeply caring.</p>
            <p style={{ marginTop:16 }}>From our first clinic, we set out to redefine what it means to visit an optician — pairing world-class diagnostics with a lovingly curated eyewear boutique.</p>
            <p style={{ marginTop:16 }}>Today, we continue that mission with the same warmth, the same obsession with quality, and the same belief that vision truly is life.</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ background:"#fff", borderRadius:20, padding:36, border:"1px solid #E8E4DE", boxShadow:"0 12px 40px rgba(0,0,0,0.06)", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:4, background:grad }} />
            <p style={{ fontFamily:"Georgia,serif", fontSize:19, fontStyle:"italic", lineHeight:1.65, color:"#2C2C2C", marginBottom:28 }}>
              <span style={{ fontSize:60, lineHeight:0, verticalAlign:-22, color:TEAL, fontStyle:"normal", marginRight:2 }}>"</span>
              Vision is life — every pair of eyes deserves to experience the world with absolute clarity and beauty.
            </p>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:44, height:44, borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>👁️</div>
              <div>
                <div style={{ fontFamily:"Arial,sans-serif", fontWeight:600, fontSize:14, color:"#2C2C2C" }}>Dr. Amina Shaikh</div>
                <div style={{ fontFamily:"Arial,sans-serif", fontSize:11, color:"#9A9A9A", marginTop:2 }}>Founder & Chief Optometrist</div>
              </div>
            </div>
            <div style={{ position:"absolute", bottom:-18, right:-18, width:92, height:92, borderRadius:"50%", background:grad, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", color:"#fff", boxShadow:`0 10px 28px ${PURPLE}35` }}>
              <div style={{ fontFamily:"Georgia,serif", fontSize:26, fontWeight:700, lineHeight:1 }}>12</div>
              <div style={{ fontFamily:"Arial,sans-serif", fontSize:8, textAlign:"center", opacity:0.9, letterSpacing:"0.05em", textTransform:"uppercase", marginTop:2 }}>Years of Excellence</div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── MISSION ── */}
      <div style={{ background:"#1C1C1C", padding:"72px 48px", position:"relative", overflow:"hidden", textAlign:"center" }}>
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${PURPLE}20, ${TEAL}15)`, pointerEvents:"none" }} />
        <FadeUp>
          <div style={{ position:"relative", zIndex:1 }}>
            <div style={{ fontFamily:"Arial,sans-serif", fontSize:11, letterSpacing:"0.2em", textTransform:"uppercase", color:TEAL, fontWeight:600, marginBottom:22 }}>Our Mission</div>
            <p style={{ fontFamily:"Georgia,serif", fontSize:"clamp(24px,3vw,38px)", fontStyle:"italic", fontWeight:400, lineHeight:1.45, color:"#fff", maxWidth:760, margin:"0 auto" }}>
              To deliver{" "}
              <strong style={{ fontStyle:"normal", fontWeight:700, background:grad, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>transformative eye care</strong>{" "}
              with compassion and precision, so that every person can see the life they love — clearly, confidently, beautifully.
            </p>
          </div>
        </FadeUp>
      </div>

      {/* ── VALUES ── */}
      <section style={{ background:"#F5F3EF", padding:"88px 48px" }}>
        <div style={{ maxWidth:1060, margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div style={{ fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:PURPLE, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>What Drives Us</div>
              <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(28px,3vw,42px)", fontWeight:700, lineHeight:1.18, color:"#1C1C1C" }}>
                Our <em style={{ color:TEAL }}>Core Values</em>
              </h2>
            </div>
          </FadeUp>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:22 }}>
            {values.map((v, i) => (
              <FadeUp key={v.label} delay={i * 0.1}>
                <div
                  style={{ background:"#fff", borderRadius:18, padding:"32px 24px", border: hoveredCard===i ? `1px solid ${TEAL}` : "1px solid #E8E4DE", borderBottom: hoveredCard===i ? `3px solid ${TEAL}` : "1px solid #E8E4DE", transition:"transform 0.22s, box-shadow 0.22s", transform: hoveredCard===i ? "translateY(-6px)" : "translateY(0)", boxShadow: hoveredCard===i ? "0 18px 44px rgba(0,0,0,0.09)" : "none", cursor:"default" }}
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <span style={{ fontSize:28, display:"block", marginBottom:16 }}>{v.icon}</span>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:"#1C1C1C", marginBottom:8 }}>{v.label}</div>
                  <p style={{ fontFamily:"Arial,sans-serif", fontSize:13, lineHeight:1.7, color:"#5A5A5A", fontWeight:300 }}>{v.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ maxWidth:1060, margin:"0 auto", padding:"88px 48px" }}>
        <FadeUp>
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.16em", textTransform:"uppercase", color:PURPLE, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:40, height:1, background:`linear-gradient(90deg, ${PURPLE}, transparent)` }} />
              The People Behind the Lens
            </div>
            <h2 style={{ fontFamily:"Georgia,serif", fontSize:"clamp(28px,3vw,42px)", fontWeight:700, lineHeight:1.18, color:"#1C1C1C" }}>
              Meet Our <em style={{ color:TEAL }}>Team</em>
            </h2>
          </div>
        </FadeUp>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:26 }}>
          {teamMembers.map((m, i) => (
            <FadeUp key={m.name} delay={i * 0.12}>
              <div
                style={{ background:"#fff", borderRadius:18, overflow:"hidden", border:"1px solid #E8E4DE", transition:"transform 0.22s, box-shadow 0.22s", transform: hoveredTeam===i ? "translateY(-5px)" : "translateY(0)", boxShadow: hoveredTeam===i ? "0 18px 44px rgba(0,0,0,0.09)" : "none" }}
                onMouseEnter={() => setHoveredTeam(i)}
                onMouseLeave={() => setHoveredTeam(null)}
              >
                <div style={{ height:130, background:grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:48 }}>{m.icon}</div>
                <div style={{ padding:24 }}>
                  <div style={{ fontFamily:"Georgia,serif", fontSize:20, fontWeight:700, color:"#1C1C1C", marginBottom:3 }}>{m.name}</div>
                  <div style={{ fontFamily:"Arial,sans-serif", fontSize:11, fontWeight:600, letterSpacing:"0.08em", textTransform:"uppercase", color:TEAL, marginBottom:12 }}>{m.role}</div>
                  <p style={{ fontFamily:"Arial,sans-serif", fontSize:13, lineHeight:1.7, color:"#5A5A5A", fontWeight:300 }}>{m.desc}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#F5F3EF", borderTop:"1px solid #E8E4DE", padding:"32px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:9, height:9, borderRadius:"50%", background:grad, flexShrink:0 }} />
          <span style={{ fontFamily:"Arial,sans-serif", fontSize:12, color:"#9A9A9A" }}>© 2024 Optique House. All rights reserved.</span>
        </div>
        <div style={{ fontFamily:"Georgia,serif", fontStyle:"italic", fontSize:15, color:"#5A5A5A" }}>Vision is Life</div>
      </footer>
    </div>
  );
}