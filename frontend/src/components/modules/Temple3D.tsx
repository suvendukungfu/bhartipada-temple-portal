"use client";

import React, { Suspense, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  useGLTF, 
  ContactShadows, 
  Html,
  Float,
  Stars,

  Sparkles,
  BakeShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// --- Advanced 3D Components ---

function Fireflies({ count = 40, aartiMode = false }) {
  const points = useMemo(() => {
    const p = new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        Math.random() * 8,
        (Math.random() - 0.5) * 20
      ],
      speed: Math.random() * 0.05 + 0.01,
      factor: Math.random() * 2 + 1,
    }));
    return p;
  }, [count]);

  return (
    <group>
      {points.map((p, i) => (
        <Float 
          key={i} 
          speed={p.factor} 
          rotationIntensity={2} 
          floatIntensity={2}
          position={p.position as [number, number, number]}
        >
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color={aartiMode ? "#FF4500" : "#FFD700"} 
              emissive={aartiMode ? "#FF4500" : "#FFD700"} 
              emissiveIntensity={aartiMode ? 10 : 2} 
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ModelContent({ url, position = [0, 0, 0], scale = 1, onIdolClick }: { url: string; position?: [number, number, number]; scale?: number; onIdolClick?: () => void }) {
  const { scene } = useGLTF(url);
  
  // Clone to avoid mutation if used multiple times
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive 
      object={clonedScene} 
      position={position} 
      scale={scale} 
      castShadow 
      receiveShadow 
      onClick={(e: any) => {
        e.stopPropagation();
        if (url.includes('idol') && onIdolClick) {
          onIdolClick();
        }
      }}
    />
  );
}

function Model({ url, position = [0, 0, 0], scale = 1, onIdolClick }: { url: string; position?: [number, number, number]; scale?: number; onIdolClick?: () => void }) {
  return (
    <Suspense fallback={null}>
      <ModelContent url={url} position={position} scale={scale} onIdolClick={onIdolClick} />
    </Suspense>
  );
}

function CinematicCamera({ isGuided, isAarti }: { isGuided: boolean; isAarti: boolean }) {
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((state, delta) => {
    if (isGuided) {
      time.current += delta * 0.2;
      const radius = 15;
      camera.position.x = Math.sin(time.current) * radius;
      camera.position.z = Math.cos(time.current) * radius;
      camera.position.y = 6 + Math.sin(time.current * 0.5) * 2;
      camera.lookAt(0, 1, 0);
    }
  });

  return null;
}

function Hotspot({ position, label, content, onTrigger, type = "info" }: { position: [number, number, number]; label: string; content: string; onTrigger?: () => void; type?: "info" | "donate" }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <group position={position}>
      <mesh 
        onPointerOver={(e: any) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e: any) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e: any) => { e.stopPropagation(); setActive(!active); if (onTrigger) onTrigger(); }}
        scale={hovered ? 1.5 : 1}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial 
          color={hovered ? "#FFD700" : "#ffffff"} 
          emissive={hovered ? "#FFA500" : "#ffffff"} 
          emissiveIntensity={hovered ? 2 : 0.5} 
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Interaction Pulse */}
      <mesh>
         <ringGeometry args={[0.3, 0.35, 32]} />
         <meshBasicMaterial color="#FFD700" transparent opacity={hovered ? 0.8 : 0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating UI card */}
      {active && (
        <Html position={[0, 0.5, 0]} center zIndexRange={[100, 0]}>
          <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-saffron w-56 text-white shadow-2xl">
            <h4 className="font-serif font-bold text-temple-gold text-lg mb-1">{label}</h4>
            <p className="text-xs text-white/80 leading-relaxed mb-3">{content}</p>
            {type === "donate" && (
              <a href="#donate" className="block text-center bg-saffron hover:bg-maroon transition-colors text-white text-xs font-bold w-full py-2 rounded-lg">
                Contribute Now
              </a>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

export function Temple3D() {
  const [aartiMode, setAartiMode] = useState(false);
  const [guided, setGuided] = useState(false);
  const controlsRef = useRef<any>(null);
  
  const playBell = () => {
    const audio = new Audio("/assets/sounds/bell.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => console.log("Audio play blocked by browser"));
  };

  const zoomToIdol = () => {
    playBell();
    if (controlsRef.current) {
      gsap.to(controlsRef.current.object.position, {
        x: 0,
        y: 1.5,
        z: 4,
        duration: 2,
        ease: "power3.inOut"
      });
      gsap.to(controlsRef.current.target, {
        x: 0,
        y: 1,
        z: 0,
        duration: 2,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <div className="w-full h-[750px] bg-black rounded-[3rem] overflow-hidden relative shadow-4xl group">
      
      {/* UI Overlays */}
      <div className="absolute top-10 left-10 z-20 flex flex-col gap-2">
        <h2 className="text-temple-gold font-serif text-4xl font-bold tracking-tight">Divine Presence</h2>
        <div className="flex gap-4">
          <button 
            onClick={() => { setAartiMode(!aartiMode); playBell(); }}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${aartiMode ? 'bg-saffron text-white shadow-saffron/50' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {aartiMode ? "✨ Aarti Active" : "Invoke Aarti"}
          </button>
          <button 
            onClick={() => setGuided(!guided)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${guided ? 'bg-temple-gold text-maroon' : 'bg-white/10 text-white hover:bg-white/20'}`}
          >
            {guided ? "Manual View" : "Cinematic Mode"}
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 z-20">
         <button 
            onClick={zoomToIdol}
            className="bg-sandstone/20 backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 hover:bg-sandstone/30 transition-all"
         >
           दर्शन (Zoom to Idol)
         </button>
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-full bg-maroon">
          <div className="w-20 h-20 border-b-4 border-saffron rounded-full animate-spin mb-4" />
          <h2 className="text-saffron font-serif text-3xl animate-pulse">Entering Sacred Space...</h2>
        </div>
      }>
        <Canvas shadows camera={{ position: [15, 8, 15], fov: 45 }}>
          <color attach="background" args={[aartiMode ? "#1a0505" : "#0a0a0a"]} />
          
          <CinematicCamera isGuided={guided} isAarti={aartiMode} />
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={20} size={2} speed={0.4} color={aartiMode ? "#FF4500" : "#FFD700"} />
          
          <ambientLight intensity={aartiMode ? 0.8 : 0.3} color={aartiMode ? "#FF4500" : "#ffffff"} />
          
          {/* Spiritual Fireflies/Diyas */}
          <Fireflies count={aartiMode ? 60 : 30} aartiMode={aartiMode} />

          {/* Temple Lighting */}
          <pointLight position={[0, 5, 0]} intensity={aartiMode ? 10 : 2} color="#FFD700" castShadow />
          <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />

          {/* 3D Models */}
          <Model url="/models/temple.glb" position={[0, -2, 0]} scale={0.65} />
          <Model url="/models/idol.glb" position={[0, 0, 0]} scale={0.3} onIdolClick={zoomToIdol} />

          <OrbitControls 
            ref={controlsRef}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.1}
            minDistance={4}
            maxDistance={30}
            makeDefault
          />

          <Environment preset="sunset" />
          <fog attach="fog" args={[aartiMode ? "#1a0505" : "#0a0a0a", 10, 50]} />
          
          <ContactShadows 
            position={[0, -2.01, 0]} 
            opacity={0.6} 
            scale={25} 
            blur={2.4} 
            far={10} 
          />
          <BakeShadows />

          {/* Interactive Hotspots */}
          <Hotspot position={[0, 1, 6]} label="Main Entrance" content="The gateway to spiritual enlightenment." />
          <Hotspot position={[4, 1, 0]} label="Mandapa" content="Help us restore the central gathering hall." type="donate" />
          <Hotspot position={[0, 1, -2]} label="Garbhagriha" content="The sacred inner sanctum where the deity resides." onTrigger={zoomToIdol} />

          <EffectComposer>
            <Bloom luminanceThreshold={aartiMode ? 0.2 : 0.8} mipmapBlur intensity={aartiMode ? 1.5 : 0.2} />
          </EffectComposer>

        </Canvas>
      </Suspense>
    </div>
  );
}
