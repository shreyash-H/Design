import React, { useRef, useState, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Sparkles, useGLTF } from '@react-three/drei'

// Simple ErrorBoundary to catch render-time errors from useGLTF and show a fallback
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

export default function Ayurveda3DPortfolio3D() {
  const [activeHotspot, setActiveHotspot] = useState(null)

  // Hotspots: position (x,y,z), id, title, short content, and icon type
  const hotspots = [
    { id: 'panchakarma', pos: [0.9, 0.1, 0.05], title: 'Panchakarma', content: 'Personalized detox protocols — Vamana, Virechana, Basti, Nasya. Typical course length, expected outcomes, and pre/post care.', icon: 'mortar' },
    { id: 'herbal', pos: [-0.9, 0.05, 0.08], title: 'Herbal Medicine', content: 'Custom formulations, sourcing policy, safety notes, and common formulations for digestion and immunity.', icon: 'leaf' },
    { id: 'lifestyle', pos: [0, 0.9, 0], title: 'Lifestyle & Diet', content: 'Dinacharya routines, seasonal adjustments, dietary tips and brief sample meal plans.', icon: 'calendar' },
  ]

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(180deg,#ecfdf5,#fffbeb 60%, white)', color:'#0f172a', minHeight:'100vh'}}>
      <header style={{maxWidth:1100, margin:'0 auto', padding:24, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{display:'flex', alignItems:'center', gap:16}}>
          <div style={{width:48, height:48, borderRadius:9999, background:'#ffedd5', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 20px rgba(0,0,0,0.08)'}}>
            <span style={{fontWeight:600, color:'#d97706'}}>AS</span>
          </div>
          <div>
            <h1 style={{margin:0, fontSize:18, fontWeight:600}}>Dr. Ananya Sharma, BAMS</h1>
            <p style={{margin:0, fontSize:13, color:'#475569'}}>Ayurvedic Practitioner • Panchakarma Specialist</p>
          </div>
        </div>
        <nav style={{display:'flex', gap:12}}>
          <a href="#about" style={{fontSize:13, color:'#0f172a'}}>About</a>
          <a href="#services" style={{fontSize:13, color:'#0f172a'}}>Services</a>
          <a href="#research" style={{fontSize:13, color:'#0f172a'}}>Research</a>
          <a href="#contact" style={{padding:'6px 12px', borderRadius:8, background:'#d97706', color:'#fff', textDecoration:'none'}}>Book</a>
        </nav>
      </header>

      <main style={{maxWidth:1100, margin:'0 auto', padding:'0 24px 80px'}}>
        {/* 3D Canvas + HTML overlay hero with glTF icon-hotspots */}
        <section style={{position:'relative', height:640, borderRadius:16, overflow:'hidden', boxShadow:'0 10px 40px rgba(2,6,23,0.08)', marginTop:20}}>
          <Canvas camera={{ position: [0, 1.6, 4], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={0.6} castShadow />

            {/* Wrap the hotspots + models in Suspense and an ErrorBoundary for robust loading */}
            <Suspense fallback={null}>
              <FloatingHerb />

              <ErrorBoundary fallback={<group>{/* fallback is handled per-model below */}</group>}>
                <GLTFIconHotspots hotspots={hotspots} activeHotspot={activeHotspot} setActiveHotspot={setActiveHotspot} />
              </ErrorBoundary>

              <Sparkles count={20} scale={3} />
            </Suspense>

            <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
          </Canvas>

          {/* HTML overlay card — main profile */}
          <div style={{position:'absolute', inset:0, pointerEvents:'none'}}>
            <div style={{maxWidth:1100, height:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 24px'}}>
              <div style={{width:'66%', pointerEvents:'auto'}}>
                <div style={{background:'rgba(255,255,255,0.7)', backdropFilter:'blur(6px)', borderRadius:24, padding:24, boxShadow:'0 12px 40px rgba(2,6,23,0.08)'}}>
                  <div style={{display:'flex', gap:20}}>
                    <div style={{width:144, height:144, borderRadius:18, background:'#d1fae5', display:'flex', alignItems:'center', justifyContent:'center', color:'#d97706', fontWeight:700}}>Photo</div>
                    <div>
                      <h2 style={{margin:0, fontSize:22, fontWeight:700}}>Dr. Ananya Sharma, BAMS</h2>
                      <p style={{marginTop:8, color:'#334155'}}>Classical Ayurvedic practice focused on Panchakarma, herbal formulations, and lifestyle medicine. Evidence-aware, personalised care.</p>
                      <div style={{marginTop:12, display:'flex', gap:8}}>
                        <a href="#contact" style={{padding:'8px 12px', background:'#059669', color:'#fff', borderRadius:8, textDecoration:'none'}}>Book</a>
                        <a href="#services" style={{padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb', textDecoration:'none'}}>Services</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{width:'30%', pointerEvents:'auto'}}>
                <div style={{background:'rgba(255,255,255,0.85)', backdropFilter:'blur(4px)', borderRadius:12, padding:18, boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
                  <h3 style={{margin:0, fontWeight:600}}>Career milestones</h3>
                  <ul style={{marginTop:12, paddingLeft:18, color:'#475569'}}>
                    <li><strong style={{color:'#b45309'}}>2012</strong> — Completed BAMS — University</li>
                    <li style={{marginTop:8}}><strong style={{color:'#b45309'}}>2015</strong> — Diploma in Panchakarma — Kerala</li>
                    <li style={{marginTop:8}}><strong style={{color:'#b45309'}}>2018</strong> — Founded AyuWell Centre</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* HTML card attached to active hotspot (rendered outside canvas so it's always on top) */}
          {activeHotspot && (
            <div style={{position:'absolute', left:'50%', transform:'translateX(-50%)', bottom:18, width:'92%', maxWidth:880, pointerEvents:'auto'}}>
              <div style={{background:'#fff', borderRadius:20, padding:20, boxShadow:'0 18px 60px rgba(2,6,23,0.08)', border:'1px solid #e6e0d7'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div>
                    <h4 style={{margin:0, fontSize:18, fontWeight:700}}>{hotspots.find(h => h.id === activeHotspot)?.title}</h4>
                    <p style={{marginTop:8, color:'#475569'}}>{hotspots.find(h => h.id === activeHotspot)?.content}</p>
                    <div style={{marginTop:12, display:'flex', gap:8}}>
                      <a href="#contact" style={{padding:'8px 12px', background:'#059669', color:'#fff', borderRadius:8, textDecoration:'none'}}>Book this</a>
                      <a href="#research" style={{padding:'8px 12px', borderRadius:8, border:'1px solid #e5e7eb', textDecoration:'none'}}>More</a>
                    </div>
                  </div>
                  <button onClick={() => setActiveHotspot(null)} style={{marginLeft:16, padding:'6px 10px', borderRadius:8, background:'#ffedd5', border:'none'}}>Close</button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* The rest of the site uses normal DOM components — services, research, testimonials */}
        <section id="services" style={{marginTop:32, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          <div style={{padding:24, borderRadius:12, background:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
            <h4 style={{margin:0, fontWeight:600}}>Panchakarma</h4>
            <p style={{marginTop:8, color:'#475569'}}>Detoxifying and rejuvenating treatments: Vamana, Virechana, Basti, Nasya.</p>
          </div>

          <div style={{padding:24, borderRadius:12, background:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
            <h4 style={{margin:0, fontWeight:600}}>Herbal Medicine</h4>
            <p style={{marginTop:8, color:'#475569'}}>Custom herbal formulations for digestion, immunity, and women’s health.</p>
          </div>

          <div style={{padding:24, borderRadius:12, background:'#fff', boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>

          <h4 style={{margin:0, fontWeight:600}}>Lifestyle & Diet</h4>
          <p style={{marginTop:8, color:'#475569'}}>Dinacharya, ritucharya and personalized diet protocols.</p>
        </div>
      </section>

      <section id="research" style={{marginTop:32, background:'#fff', borderRadius:12, padding:18, boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
        <h3 style={{margin:0, fontWeight:600}}>Publications & Research</h3>
        <p style={{marginTop:12, color:'#475569'}}>(List peer-reviewed articles, conference presentations or ongoing case-series here.)</p>
      </section>

      <section style={{marginTop:32, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
        <div style={{background:'#fff', borderRadius:12, padding:18, boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
          <h4 style={{margin:0, fontWeight:600}}>Patient Testimonials</h4>
          <blockquote style={{marginTop:12, borderLeft:'4px solid #fde68a', padding:12, background:'#fff7ed', borderRadius:8}}>
            <p style={{margin:0}}>"Significant improvement in digestion and sleep after Panchakarma."</p>
            <footer style={{marginTop:8, fontSize:12, color:'#475569'}}>— Rohit K.</footer>
          </blockquote>
        </div>

        <div style={{background:'#fff', borderRadius:12, padding:18, boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
          <h4 style={{margin:0, fontWeight:600}}>Junior Mentorship</h4>
          <p style={{marginTop:12, color:'#475569'}}>Offerings: BAMS study tips, clinical internship guidance, Panchakarma hands-on training, practice setup advice.</p>
          <h5 style={{marginTop:12}}>Contact</h5>
          <ul style={{marginTop:8, color:'#059669'}}>
            <li>Email: <a href="mailto:dr.ananya@example.com">dr.ananya@example.com</a></li>
            <li>WhatsApp: <a href="https://wa.me/9198xxxxxxx">Message</a></li>
          </ul>
        </div>
      </section>

      <section id="contact" style={{marginTop:32, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
        <div style={{background:'#fff', borderRadius:12, padding:18, boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
          <h3 style={{margin:0, fontWeight:600}}>Contact & Booking</h3>
          <p style={{marginTop:12, color:'#475569'}}>For new patient consultations, please use the booking button or email directly.</p>
          <div style={{marginTop:12}}>
            <a href="mailto:dr.ananya@example.com" style={{padding:'8px 12px', background:'#059669', color:'#fff', borderRadius:8, textDecoration:'none'}}>Email</a>
            <a href="https://wa.me/9198xxxxxxx" style={{padding:'8px 12px', marginLeft:8, borderRadius:8, border:'1px solid #e5e7eb', textDecoration:'none'}}>WhatsApp</a>
          </div>
        </div>

        <form style={{background:'#fff', borderRadius:12, padding:18, boxShadow:'0 8px 24px rgba(2,6,23,0.06)'}}>
          <h4 style={{margin:0, fontWeight:600}}>Send a message</h4>
          <label style={{display:'block', marginTop:12, fontSize:13}}>Name</label>
          <input style={{width:'100%', marginTop:6, padding:8, borderRadius:8, border:'1px solid #e5e7eb'}} placeholder="Your name" />
          <label style={{display:'block', marginTop:12, fontSize:13}}>Email</label>
          <input style={{width:'100%', marginTop:6, padding:8, borderRadius:8, border:'1px solid #e5e7eb'}} placeholder="you@example.com" />
          <label style={{display:'block', marginTop:12, fontSize:13}}>Message</label>
          <textarea style={{width:'100%', marginTop:6, padding:8, borderRadius:8, border:'1px solid #e5e7eb'}} placeholder="Tell me about your concerns..." rows={6} />
          <div style={{marginTop:12}}>
            <button type="button" style={{padding:'8px 12px', background:'#d97706', color:'#fff', borderRadius:8}}>Send</button>
          </div>
        </form>
      </section>

      <footer style={{marginTop:32, textAlign:'center', color:'#64748b', fontSize:13}}>
        © {new Date().getFullYear()} Dr. Ananya Sharma — Ayurvedic care & Panchakarma
      </footer>
    </main>
  </div>
)
// 3D components (FloatingHerb + GLTF hotspots + procedural fallbacks)
// Helper components below

function FloatingHerb() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.2
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.18 + 0.45
  })

  return (
    <group ref={ref} position={[0, 0, 0]}>
      {/* stem */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderBufferGeometry args={[0.03, 0.05, 0.8, 8]} />
        <meshStandardMaterial color={'#7c3aed'} metalness={0.1} roughness={0.7} />
      </mesh>

      {/* leaves */}
      <Leaf position={[0.12, 0.1, 0]} rotation={[0, 0.9, -0.3]} scale={[1.2, 1.2, 1]} />
      <Leaf position={[-0.14, 0.05, 0.05]} rotation={[0, -0.7, 0.4]} scale={[0.95, 0.95, 1]} />
      <Leaf position={[0, 0.35, 0]} rotation={[0, 0.05, 0]} scale={[1.4, 1.4, 1]} />

      {/* pot */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <cylinderBufferGeometry args={[0.32, 0.4, 0.24, 20, 1, false]} />
        <meshStandardMaterial color={'#b7791f'} metalness={0.05} roughness={0.9} />
      </mesh>

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]}> 
        <planeBufferGeometry args={[8, 8]} />
        <meshStandardMaterial color={'#f8fafc'} metalness={0} roughness={1} />
      </mesh>
    </group>
  )
}

function Leaf({ position = [0, 0, 0], rotation = [0, 0, 0], scale = [1, 1, 1] }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.6) * 0.05
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale} castShadow>
      <planeBufferGeometry args={[0.9, 0.35, 8, 1]} />
      <meshStandardMaterial color={'#16a34a'} side={2} />
    </mesh>
  )
}

// GLTF Icon Hotspots
function GLTFIconHotspots({ hotspots, activeHotspot, setActiveHotspot }) {
  return (
    <group>
      {hotspots.map((h) => (
        <GLTFIconHotspot key={h.id} hotspot={h} isActive={activeHotspot === h.id} onActivate={() => setActiveHotspot(h.id)} />
      ))}
    </group>
  )
}

function GLTFIconHotspot({ hotspot, isActive, onActivate }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = hotspot.pos[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.02
    const targetScale = hovered || isActive ? 1.15 : 0.95
    // lerp not available on Vector3 for plain object - use simple interpolation
    ref.current.scale.x += (targetScale - ref.current.scale.x) * 0.12
    ref.current.scale.y += (targetScale - ref.current.scale.y) * 0.12
    ref.current.scale.z += (targetScale - ref.current.scale.z) * 0.12
  })

  // mapping icon type -> model path (change these paths if you host elsewhere)
  const modelMap = {
    leaf: '/models/leaf.glb',
    mortar: '/models/mortar.glb',
    calendar: '/models/calendar.glb',
  }

  const modelPath = modelMap[hotspot.icon]

  return (
    <group position={hotspot.pos}>
      <group
        ref={ref}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
        onClick={(e) => { e.stopPropagation(); onActivate() }}
      >
        <ModelOrFallback path={modelPath} type={hotspot.icon} isActive={isActive} />
      </group>

      {/* small 3D-attached label */}
      <Html center distanceFactor={8} position={[0, 0.16, 0]} occlude onPointerDown={(e) => e.stopPropagation()}>
        <div className={`pointer-events-auto select-none text-xs px-2 py-1 rounded ${isActive ? 'bg-amber-100 text-amber-800' : 'bg-white/90 text-emerald-700'} shadow`}>
          {hotspot.title}
        </div>
      </Html>
    </group>
  )
}

function ModelOrFallback({ path, type, isActive }) {
  // Try to load a glTF model; if it fails or path is falsy, render procedurals
  if (path) {
    try {
      const gltf = useGLTF(path, true)
      return (
        <primitive object={gltf.scene} scale={isActive ? 0.8 : 0.6} position={[0, 0, 0]} />
      )
    } catch (e) {
      // If loading fails, fall through to procedural
      return <ProceduralIcon type={type} />
    }
  }

  return <ProceduralIcon type={type} />
}

function ProceduralIcon({ type }) {
  if (type === 'leaf') return <LeafIcon />
  if (type === 'mortar') return <MortarIcon />
  if (type === 'calendar') return <CalendarIcon />
  return <LeafIcon />
}

function LeafIcon() {
  return (
    <group>
      <mesh rotation={[0, 0.2, -0.2]}> <boxBufferGeometry args={[0.02, 0.4, 0.02]} /><meshStandardMaterial color={'#15803d'} /></mesh>
      <mesh position={[0.12, 0.12, 0]} rotation={[0, 0.6, -0.4]}> <planeBufferGeometry args={[0.24, 0.12, 4, 1]} /><meshStandardMaterial color={'#16a34a'} side={2} /></mesh>
      <mesh position={[-0.12, 0.06, 0]} rotation={[0, -0.6, 0.3]}> <planeBufferGeometry args={[0.18, 0.09, 4, 1]} /><meshStandardMaterial color={'#16a34a'} side={2} /></mesh>
    </group>
  )
}

function MortarIcon() {
  return (
    <group>
      <mesh position={[0, 0, 0]}> <cylinderBufferGeometry args={[0.18, 0.28, 0.12, 24, 1, false]} /><meshStandardMaterial color={'#a16207'} /></mesh>
      <mesh position={[0, -0.02, 0]}> <cylinderBufferGeometry args={[0.14, 0.14, 0.02, 24]} /><meshStandardMaterial color={'#7c2d12'} /></mesh>
      <mesh position={[0.06, 0.08, 0.02]} rotation={[0.3, 0, 0.4]}> <cylinderBufferGeometry args={[0.03, 0.03, 0.34, 12]} /><meshStandardMaterial color={'#6b4f1d'} /></mesh>
    </group>
  )
}

function CalendarIcon() {
  return (
    <group>
      <mesh> <boxBufferGeometry args={[0.36, 0.26, 0.04]} /><meshStandardMaterial color={'#fde68a'} /></mesh>
      <mesh position={[-0.07, 0, 0.023]}> <planeBufferGeometry args={[0.02, 0.18]} /><meshStandardMaterial color={'#b45309'} /></mesh>
      <mesh position={[0.07, 0, 0.023]}> <planeBufferGeometry args={[0.02, 0.18]} /><meshStandardMaterial color={'#b45309'} /></mesh>
      <mesh position={[0, -0.05, 0.023]}> <planeBufferGeometry args={[0.22, 0.02]} /><meshStandardMaterial color={'#b45309'} /></mesh>
      <mesh position={[-0.09, 0.13, 0]}> <torusBufferGeometry args={[0.04, 0.01, 8, 16]} /><meshStandardMaterial color={'#92400e'} /></mesh>
      <mesh position={[0.09, 0.13, 0]}> <torusBufferGeometry args={[0.04, 0.01, 8, 16]} /><meshStandardMaterial color={'#92400e'} /></mesh>
    </group>
  )
}

// IMPORTANT NOTES:
// - Place your .glb/.gltf icon files in the public/models folder (leaf.glb, mortar.glb, calendar.glb) OR
//   change the modelMap paths to point to your CDN URLs.
// - CORS: if you host models on a separate domain, ensure CORS headers allow fetching from your site.
// - For production robustness, wrap the GLTF load in Suspense + an ErrorBoundary and show a loading/fallback state.
// - If you want, I can add an ErrorBoundary + graceful loader and also precompute thumbnails for the detail cards.

