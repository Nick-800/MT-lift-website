import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useState, useEffect } from "react";
import { OrbitControls, Environment, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

// Individual elevator parts for realism
function CabinFrame({ color }: { color: string }) {
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: 0.95,
    roughness: 0.08,
  });

  return (
    <group>
      {/* Main back panel with brushed metal texture */}
      <mesh position={[0, 0, -0.55]}>
        <boxGeometry args={[2.6, 3.2, 0.08]} />
        <meshStandardMaterial {...material} />
      </mesh>

      {/* Left pillar */}
      <RoundedBox args={[0.12, 3.2, 0.12]} position={[-1.3, 0, -0.5]} radius={0.02}>
        <meshStandardMaterial {...material} />
      </RoundedBox>

      {/* Right pillar */}
      <RoundedBox args={[0.12, 3.2, 0.12]} position={[1.3, 0, -0.5]} radius={0.02}>
        <meshStandardMaterial {...material} />
      </RoundedBox>

      {/* Top header panel */}
      <mesh position={[0, 1.65, 0]}>
        <boxGeometry args={[2.72, 0.15, 1.2]} />
        <meshStandardMaterial {...material} />
      </mesh>

      {/* Bottom threshold */}
      <mesh position={[0, -1.62, 0.1]}>
        <boxGeometry args={[2.72, 0.08, 1.4]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Floor groove lines */}
      {[-0.4, 0, 0.4].map((x, i) => (
        <mesh key={i} position={[x, -1.58, 0.3]}>
          <boxGeometry args={[0.02, 0.01, 0.4]} />
          <meshStandardMaterial color="#666666" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function SlidingDoors({ doorPosition, isOpen }: { doorPosition: number; isOpen: boolean }) {
  const doorMaterial = new THREE.MeshStandardMaterial({
    color: "#4A90A4",
    metalness: 0.85,
    roughness: 0.12,
  });

  const handleMaterial = new THREE.MeshStandardMaterial({
    color: "#C0C0C0",
    metalness: 0.95,
    roughness: 0.05,
  });

  return (
    <group>
      {/* Left Door Panel */}
      <group position={[-0.55 - doorPosition, 0, 0.08]}>
        <RoundedBox args={[0.58, 2.95, 0.045]} radius={0.008}>
          <meshStandardMaterial {...doorMaterial} />
        </RoundedBox>
        {/* Door handle groove */}
        <mesh position={[0.22, 0, 0.025]}>
          <boxGeometry args={[0.02, 0.8, 0.01]} />
          <meshStandardMaterial {...handleMaterial} />
        </mesh>
        {/* Vertical seam lines */}
        <mesh position={[0, 0, 0.024]}>
          <boxGeometry args={[0.003, 2.9, 0.002]} />
          <meshStandardMaterial color="#3a7a8a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Right Door Panel */}
      <group position={[0.55 + doorPosition, 0, 0.08]}>
        <RoundedBox args={[0.58, 2.95, 0.045]} radius={0.008}>
          <meshStandardMaterial {...doorMaterial} />
        </RoundedBox>
        {/* Door handle groove */}
        <mesh position={[-0.22, 0, 0.025]}>
          <boxGeometry args={[0.02, 0.8, 0.01]} />
          <meshStandardMaterial {...handleMaterial} />
        </mesh>
        {/* Vertical seam line */}
        <mesh position={[0, 0, 0.024]}>
          <boxGeometry args={[0.003, 2.9, 0.002]} />
          <meshStandardMaterial color="#3a7a8a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Door gap center seam (when closed) */}
      {!isOpen && (
        <mesh position={[0, 0, 0.105]}>
          <boxGeometry args={[0.008, 2.95, 0.002]} />
          <meshStandardMaterial color="#1a365d" />
        </mesh>
      )}
    </group>
  );
}

function CabinInterior() {
  return (
    <group>
      {/* Back wall with panels */}
      <mesh position={[0, 0, -0.48]}>
        <boxGeometry args={[2.4, 2.9, 0.02]} />
        <meshStandardMaterial color="#2c4a5e" metalness={0.6} roughness={0.25} />
      </mesh>

      {/* Decorative back panel sections */}
      {[-0.7, 0, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 0, -0.46]}>
          <boxGeometry args={[0.6, 2.6, 0.015]} />
          <meshStandardMaterial color="#345a70" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}

      {/* Handrail */}
      <mesh position={[0, -0.3, -0.42]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.2, 0.04, 0.04]} />
        <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.08} />
      </mesh>

      {/* Handrail brackets */}
      {[-0.9, 0, 0.9].map((x, i) => (
        <mesh key={i} position={[x, -0.3, -0.44]}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshStandardMaterial color="#b8960c" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Floor */}
      <mesh position={[0, -1.48, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 0.6]} />
        <meshStandardMaterial color="#1a2a35" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Interior ceiling light panel */}
      <mesh position={[0, 1.45, -0.25]}>
        <boxGeometry args={[1.8, 0.02, 0.5]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} />
      </mesh>

      {/* Interior point light */}
      <pointLight position={[0, 1.2, -0.2]} intensity={0.6} color="#fff5e6" distance={3} />
    </group>
  );
}

function FloorIndicatorPanel() {
  const [currentFloor, setCurrentFloor] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFloor((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[0, 1.85, 0.15]}>
      {/* Display housing */}
      <RoundedBox args={[0.5, 0.2, 0.06]} radius={0.015}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </RoundedBox>

      {/* LED display background */}
      <mesh position={[0, 0, 0.032]}>
        <boxGeometry args={[0.4, 0.12, 0.01]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* LED floor number glow */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.15, 0.08, 0.005]} />
        <meshStandardMaterial 
          color="#5BC0EB" 
          emissive="#5BC0EB" 
          emissiveIntensity={3} 
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Up/Down arrows */}
      <mesh position={[0.15, 0.02, 0.04]}>
        <boxGeometry args={[0.02, 0.03, 0.005]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

function CallButtonPanel() {
  const [upPressed, setUpPressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpPressed((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[1.55, 0.2, 0.15]}>
      {/* Button panel housing */}
      <RoundedBox args={[0.12, 0.35, 0.04]} radius={0.01}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </RoundedBox>

      {/* Up button */}
      <mesh position={[0, 0.08, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.015, 24]} />
        <meshStandardMaterial 
          color={upPressed ? "#5BC0EB" : "#888888"} 
          emissive={upPressed ? "#5BC0EB" : "#000000"}
          emissiveIntensity={upPressed ? 2 : 0}
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh>

      {/* Down button */}
      <mesh position={[0, -0.08, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.015, 24]} />
        <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Button ring bezels */}
      {[0.08, -0.08].map((y, i) => (
        <mesh key={i} position={[0, y, 0.022]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.04, 0.004, 8, 24]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

function DecorativeDetails() {
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: "#d4af37",
    metalness: 0.95,
    roughness: 0.08,
  });

  return (
    <group>
      {/* Top decorative trim */}
      <mesh position={[0, 1.72, 0.55]}>
        <boxGeometry args={[2.8, 0.03, 0.02]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>

      {/* Bottom decorative trim */}
      <mesh position={[0, -1.52, 0.55]}>
        <boxGeometry args={[2.8, 0.02, 0.02]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>

      {/* Vertical accent strips on frame */}
      {[-1.36, 1.36].map((x, i) => (
        <mesh key={i} position={[x, 0, 0.1]}>
          <boxGeometry args={[0.015, 3.0, 0.01]} />
          <meshStandardMaterial {...goldMaterial} />
        </mesh>
      ))}

      {/* Ventilation grille above doors */}
      <group position={[0, 1.55, 0.12]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[-0.35 + i * 0.1, 0, 0]}>
            <boxGeometry args={[0.008, 0.06, 0.01]} />
            <meshStandardMaterial color="#333333" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Elevator certification plate */}
      <mesh position={[-1.0, -1.2, 0.11]}>
        <boxGeometry args={[0.2, 0.12, 0.005]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

function ElevatorCabin() {
  const cabinRef = useRef<THREE.Group>(null);
  const [doorOpen, setDoorOpen] = useState(false);
  const [doorPosition, setDoorPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDoorOpen((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (cabinRef.current) {
      cabinRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
    }

    const targetPosition = doorOpen ? 0.45 : 0;
    setDoorPosition((prev) => THREE.MathUtils.lerp(prev, targetPosition, delta * 2.5));
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={cabinRef} position={[0, 0, 0]} scale={0.75}>
        <CabinFrame color="#1A365D" />
        <SlidingDoors doorPosition={doorPosition} isOpen={doorOpen} />
        <CabinInterior />
        <FloorIndicatorPanel />
        <CallButtonPanel />
        <DecorativeDetails />
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={0.9} castShadow />
      <directionalLight position={[-4, 3, -4]} intensity={0.25} color="#5BC0EB" />
      <spotLight position={[0, 6, 3]} intensity={0.4} angle={0.4} penumbra={0.8} />
      <pointLight position={[2, -1, 2]} intensity={0.15} color="#ffd700" />

      <ElevatorCabin />

      <Environment preset="city" />
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

const Elevator3D = () => {
  return (
    <div className="w-full h-[420px] md:h-[520px]">
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Drag to rotate • Scroll to zoom
      </p>
    </div>
  );
};

export default Elevator3D;
