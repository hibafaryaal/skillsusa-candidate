import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import hibaPhoto from './images/hiba_skills_usa_officail.PNG'
import data from './data/state.json'

const NAVY  = '#002D72'
const RED   = '#C8102E'
const GOLD  = '#FFD700'
const NAVY2 = '#0047BB'

const { candidate } = data

const REVIEWS = [
  { name: 'Hailey Nguyen', relation: 'Friend & Classmate', text: 'If I had to describe Hiba in one word, I couldn\'t — one word isn\'t enough. She\'s kind, driven, outspoken, and her positivity is genuinely contagious. Every time she sets a goal, she goes after it without hesitation and inspires everyone around her. A perfect 10/10.' },
  { name: 'Amrita Elanchezhian', relation: 'Friend & Peer', text: 'When Hiba sets her mind to something, she\'s all in. She is incredibly dedicated, kind, and passionate — always striving to do her best. An amazing leader in and outside of our community, I can\'t wait to see where her ambition takes her next.' },
  { name: 'Sreeshayini Muthukumar', relation: 'Model UN & HOSA Peer', text: 'Hiba consistently demonstrates initiative, dedication, and empathy. She championed our school\'s first Model UN chapter and served as HOSA Vice President with real commitment. What sets her apart is her ability to lead with heart — she makes every person around her feel valued and heard. I strongly recommend her for SkillsUSA Leadership.' },
]

/* ── Helpers ─────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: '#8a9ab5' }}>{children}</p>
}

function FiveStars({ size = 14 }) {
  return (
    <span className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 20 20">
          <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" fill={GOLD} />
        </svg>
      ))}
    </span>
  )
}

/* ── Lightbox ────────────────────────────────────────────────── */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => document.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.9)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93 }} animate={{ scale: 1 }} exit={{ scale: 0.93 }}
        transition={{ duration: 0.22 }}
        className="relative max-w-3xl w-full"
        onClick={e => e.stopPropagation()}
      >
        <img src={src} alt="Hiba Faryaal" className="w-full rounded-2xl shadow-2xl object-contain" style={{ maxHeight: '88vh' }} />
        <button onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
          style={{ background: 'rgba(0,0,0,0.55)' }}>×</button>
        <p className="text-center text-white text-xs mt-2 opacity-40">Press Esc or click outside to close</p>
      </motion.div>
    </motion.div>
  )
}

/* ── Review carousel ─────────────────────────────────────────── */
function ReviewCarousel() {
  const [idx, setIdx] = useState(0)

  const next = useCallback(() => setIdx(i => (i + 1) % REVIEWS.length), [])
  const prev = () => setIdx(i => (i - 1 + REVIEWS.length) % REVIEWS.length)

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [next])

  const r = REVIEWS[idx]

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: '1.5px solid #d0d9f0' }}>
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${GOLD}, ${RED}, ${NAVY})` }} />

      <div className="flex items-stretch">
        {/* Review text */}
        <div className="flex-1 px-4 py-3 flex flex-col justify-between min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <p className="font-bold text-sm" style={{ color: NAVY }}>{r.name}</p>
                  <p className="text-[11px] text-gray-400">{r.relation}</p>
                </div>
                <FiveStars size={13} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">"{r.text}"</p>
            </motion.div>
          </AnimatePresence>

          {/* Dots + arrows */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className="rounded-full transition-all"
                  style={{ width: i === idx ? 18 : 6, height: 6, background: i === idx ? RED : '#d0d9f0' }}
                />
              ))}
            </div>
            <div className="flex gap-1.5">
              <button onClick={prev} className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-400 transition-colors text-gray-500 text-sm">‹</button>
              <button onClick={next} className="w-7 h-7 rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-400 transition-colors text-gray-500 text-sm">›</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Thumbnail ───────────────────────────────────────────────── */
function Thumb({ src, index, active, onClick }) {
  return (
    <button onClick={onClick}
      className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200"
      style={{ border: `2px solid ${active ? RED : '#c8d0e0'}`, boxShadow: active ? `0 0 0 3px ${RED}33` : 'none', background: '#eef1f8' }}
    >
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover object-center" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-[8px] text-gray-400 font-medium">{index}</span>
        </div>
      )}
    </button>
  )
}

/* ── Navbar ──────────────────────────────────────────────────── */
function Navbar() {
  return (
    <header>
      <div className="flex items-center gap-4 px-5 py-3" style={{ background: `linear-gradient(90deg, ${NAVY} 0%, ${NAVY2} 60%, #1a66cc 100%)` }}>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-white text-sm"
            style={{ background: RED, boxShadow: `0 0 0 2px ${GOLD}` }}>S</div>
          <div className="leading-tight">
            <span className="text-white font-extrabold text-xl tracking-tight">Skills<span style={{ color: GOLD }}>USA</span></span>
            <p className="text-blue-200 text-[10px] font-medium tracking-widest -mt-0.5">CANDIDATE PORTAL</p>
          </div>
        </div>
        <div className="flex flex-1 max-w-2xl mx-4 rounded-lg overflow-hidden shadow-inner">
          <input readOnly value="Hiba Faryaal — SkillsUSA 2026 Candidate · Health Science"
            className="flex-1 px-4 py-2.5 text-sm text-gray-800 focus:outline-none bg-white" />
          <div className="px-4 flex items-center justify-center" style={{ background: GOLD }}>
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>
        <div className="hidden sm:flex flex-col leading-tight text-white text-xs flex-shrink-0">
          <span className="opacity-60">Hello, Supporter</span>
          <span className="font-bold text-sm">Share Hiba's Page</span>
        </div>
      </div>
      <div className="flex items-center gap-1 px-4 text-white text-xs font-semibold overflow-x-auto" style={{ background: '#001f5c' }}>
        {['SkillsUSA Home', 'Candidates', 'Health Science', 'Delegate Session', "Share Hiba's Page"].map(item => (
          <button key={item} className="whitespace-nowrap px-3 py-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors">{item}</button>
        ))}
      </div>
    </header>
  )
}

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  const photos = [hibaPhoto]
  const [active, setActive]       = useState(0)
  const [shared, setShared]       = useState(false)
  const [showFloat, setShowFloat] = useState(false)
  const [lightbox, setLightbox]   = useState(false)

  useEffect(() => {
    const h = () => setShowFloat(window.scrollY > 320)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  async function handleShare() {
    const url = 'https://hibafaryaal.github.io/skillsusa-candidate'
    if (navigator.share) {
      await navigator.share({ title: 'Vote for Hiba Faryaal — SkillsUSA 2026', url })
    } else {
      await navigator.clipboard.writeText(url)
      setShared(true)
      setTimeout(() => setShared(false), 2500)
    }
  }

  return (
    <div className="min-h-screen flex flex-col dot-bg">
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-6 py-2 text-xs text-blue-700 flex gap-1.5 items-center bg-white border-b border-blue-100">
        {['SkillsUSA', 'Candidates', '2026 Election', 'Hiba Faryaal'].map((c, i, arr) => (
          <span key={c} className="flex items-center gap-1.5">
            <span className={i === arr.length - 1 ? 'text-gray-500 font-medium' : 'hover:underline cursor-pointer font-medium'}>{c}</span>
            {i < arr.length - 1 && <span className="text-gray-300">›</span>}
          </span>
        ))}
      </div>

      {/* Marquee */}
      <div className="py-3 overflow-hidden" style={{ background: `linear-gradient(90deg, ${RED} 0%, #9b0000 50%, ${RED} 100%)` }}>
        <div className="marquee-track">
          <span className="marquee-content text-white font-semibold text-sm tracking-wide">
            Attending the SkillsUSA State Conference?&nbsp;&nbsp;<span style={{ color: GOLD }}>·</span>&nbsp;&nbsp;Please cast your vote for Hiba Faryaal at the Delegate Session.&nbsp;&nbsp;Your vote is how Hiba wins — it counts.&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: GOLD }}>·</span>&nbsp;&nbsp;Attending the SkillsUSA State Conference?&nbsp;&nbsp;<span style={{ color: GOLD }}>·</span>&nbsp;&nbsp;Please cast your vote for Hiba Faryaal at the Delegate Session.&nbsp;&nbsp;Your vote is how Hiba wins — it counts.
          </span>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-5">

        {/* ── Main 2-column layout ────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* LEFT: Photo + About */}
          <div className="lg:w-[380px] flex-shrink-0 flex flex-col gap-4">

            {/* Photo */}
            <div className="flex rounded-2xl overflow-hidden shadow-lg" style={{ border: '2px solid #d0d9f0' }}>
              <div className="w-1.5 flex-shrink-0" style={{ background: `linear-gradient(180deg, ${NAVY}, ${RED})` }} />
              <div className="flex-1 bg-white flex items-center justify-center" style={{ height: 500 }}>
                <AnimatePresence mode="wait">
                  {photos[active] ? (
                    <motion.div key={active}
                      initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="relative w-full h-full cursor-zoom-in"
                      onClick={() => setLightbox(true)}
                    >
                      <img src={photos[active]} alt="Hiba Faryaal"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center top' }} />
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-gray-300">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                      </svg>
                      <p className="text-sm">Photo — Coming Soon</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* About Hiba */}
            <div className="bg-white rounded-2xl shadow-lg p-5" style={{ border: '1.5px solid #d0d9f0' }}>
              <div className="flex items-center gap-2.5 mb-3 pb-3" style={{ borderBottom: `2px solid ${NAVY}` }}>
                <div className="w-1 h-5 rounded-full" style={{ background: RED }} />
                <h2 className="text-sm font-extrabold" style={{ color: NAVY }}>About Hiba</h2>
              </div>
              <div className="space-y-2.5 text-sm text-gray-600 leading-relaxed">
                <p>Hiba Faryaal is a dedicated Health Science student who has consistently put in the work—in the classroom, within her chapter, and in her community.</p>
                <p>She joined SkillsUSA to advocate for greater recognition of skilled trades and health careers, and she continues to demonstrate that commitment through her actions.</p>
                <p>At the delegate session, a vote for Hiba is a vote for someone who has already been doing the work. <strong style={{ color: NAVY }}>She is ready for this.</strong></p>
              </div>
            </div>

          </div>

          {/* CENTER: Candidate info + Why Support */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">

            {/* Candidate info card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: '1.5px solid #d0d9f0' }}>
              <div className="h-2.5" style={{ background: `linear-gradient(90deg, ${NAVY} 0%, ${RED} 55%, ${GOLD} 100%)` }} />
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-bold mb-4 shadow"
                  style={{ background: `linear-gradient(90deg, ${NAVY}, ${NAVY2})` }}>
                  SkillsUSA Verified Candidate 2026
                </div>

                <h1 className="font-extrabold leading-tight mb-0.5" style={{ fontSize: '2.8rem', color: NAVY }}>
                  <span className="relative inline-block">Hiba
                    <span className="absolute left-0 bottom-0 h-0.5 rounded-full w-full" style={{ background: RED }} />
                  </span>{' '}Faryaal
                </h1>
                <p className="text-sm font-bold mb-3" style={{ color: RED }}>{candidate.trade} · California Chapter</p>

                <p className="text-sm text-gray-600 leading-relaxed mb-5">{candidate.bio}</p>

                <div className="mb-5">
                  <SectionLabel>Achievements</SectionLabel>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                    {candidate.achievements.map(a => (
                      <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                          style={{ background: RED }}>&#10003;</span>
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-5 flex rounded-xl overflow-hidden"
                  style={{ border: `1.5px solid ${NAVY2}`, background: 'linear-gradient(135deg, #e8f0ff, #dce8ff)' }}>
                  <div className="w-1 flex-shrink-0" style={{ background: RED }} />
                  <div className="px-4 py-3">
                    <p className="text-xs font-extrabold mb-0.5" style={{ color: NAVY }}>How to Vote for Hiba</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Voting happens in person at the <strong style={{ color: NAVY }}>SkillsUSA State Conference Delegate Session</strong>.
                      If you are a delegate, cast your vote. If you know one, share this page.
                    </p>
                  </div>
                </div>

                <motion.button onClick={handleShare}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                  className="w-full py-3 rounded-xl font-extrabold text-base text-white shadow-lg"
                  style={{ background: shared ? '#007600' : `linear-gradient(135deg, ${RED}, #a00020)`, boxShadow: shared ? 'none' : `0 5px 18px ${RED}44` }}>
                  {shared ? 'Link Copied — Share It!' : "Share Hiba's Page"}
                </motion.button>

                {shared && (
                  <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                    className="mt-2.5 text-center text-xs font-semibold text-green-700">
                    The link is copied. Send it to anyone who can vote for Hiba at the delegate session.
                  </motion.p>
                )}
              </div>
            </div>

            {/* Why Support */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ boxShadow: `0 4px 16px ${RED}14` }}>
              <div className="flex h-full">
                <div className="w-1.5 flex-shrink-0" style={{ background: `linear-gradient(180deg, ${RED}, ${NAVY})` }} />
                <div className="flex-1 p-5">
                  <div className="flex items-center gap-2 mb-3 pb-3" style={{ borderBottom: `2px solid ${RED}` }}>
                    <h2 className="text-sm font-extrabold" style={{ color: NAVY }}>Why Support Hiba</h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      'She has served her chapter, not just attended it.',
                      'Her work ethic reflects the professional standards SkillsUSA stands for.',
                      'She is a consistent presence — not just during election season.',
                      'She understands what SkillsUSA is actually for.',
                      'She will represent California SkillsUSA Chapters with the seriousness it deserves.',
                    ].map(text => (
                      <li key={text} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                          style={{ background: RED }}>&#10003;</span>
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: Delegate + QR + Candidate Details + Reviews */}
          <div className="lg:w-64 flex-shrink-0 flex flex-col gap-4">

            {/* Delegate action */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ boxShadow: `0 4px 20px ${RED}22` }}>
              <div className="flex">
                <div className="w-1.5 flex-shrink-0" style={{ background: `linear-gradient(180deg, ${RED}, #7a0010)` }} />
                <div className="flex-1 p-4">
                  <p className="text-sm font-extrabold mb-1.5" style={{ color: RED }}>Delegate Session</p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    Attending the State Conference? Vote for <strong style={{ color: NAVY }}>Hiba Faryaal</strong>. One vote makes a difference.
                  </p>
                  <motion.button onClick={handleShare} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                    className="pulse-ring w-full py-2.5 rounded-xl font-extrabold text-xs text-white"
                    style={{ background: `linear-gradient(135deg, ${RED}, #a00020)` }}>
                    {shared ? 'Copied!' : 'Share This Page'}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* QR */}
            <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-2" style={{ border: '1.5px solid #d0d9f0' }}>
              <SectionLabel>Scan to Share</SectionLabel>
              <div className="p-2 rounded-xl" style={{ background: '#f8faff', border: `1.5px solid ${NAVY}14` }}>
                <QRCodeSVG value="https://hibafaryaal.github.io/skillsusa-candidate" size={110} fgColor={NAVY} includeMargin={false} />
              </div>
              <p className="text-[10px] text-gray-400 text-center">Send to delegates and supporters</p>
            </div>

            {/* Candidate details */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              <SectionLabel>Candidate Details</SectionLabel>
              {[['Organization','SkillsUSA'],['Chapter','California'],['Trade','Health Science'],['Year','2026'],['Code',candidate.ui_code]].map(([l,v]) => (
                <div key={l} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-xs">
                  <span className="text-gray-400">{l}</span>
                  <span className="font-bold" style={{ color: NAVY }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Reviews */}
            <div id="reviews">
              <ReviewCarousel />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-6 pt-7 pb-5 px-6" style={{ background: `linear-gradient(135deg, #001540 0%, ${NAVY} 40%, #001f5c 100%)` }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-extrabold text-xl">Skills<span style={{ color: GOLD }}>USA</span>
              <span className="text-sm font-normal text-blue-200 ml-2">Candidate Portal</span></p>
            <p className="text-blue-300 text-xs mt-1">Supporting Hiba Faryaal · Health Science · California 2026</p>
            <p className="text-blue-400 text-xs mt-0.5">&copy; {new Date().getFullYear()} SkillsUSA. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white p-2.5 rounded-xl shadow-lg">
              <QRCodeSVG value="https://hibafaryaal.github.io/skillsusa-candidate" size={80} fgColor={NAVY} includeMargin={false} />
            </div>
            <p className="text-blue-300 text-xs">Scan and share</p>
          </div>
        </div>
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && photos[active] && <Lightbox src={photos[active]} onClose={() => setLightbox(false)} />}
      </AnimatePresence>

      {/* Floating share button */}
      <AnimatePresence>
        {showFloat && (
          <motion.button onClick={handleShare}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full font-extrabold text-sm text-white shadow-2xl"
            style={{ background: shared ? '#007600' : `linear-gradient(135deg, ${RED}, #8b0000)`, boxShadow: `0 8px 28px ${RED}55` }}>
            {shared ? 'Copied!' : "Share Hiba's Page"}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
