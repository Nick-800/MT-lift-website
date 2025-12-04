import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense, useState, useEffect } from "react";
import { OrbitControls, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function ElevatorCabin() {
  const cabinRef = useRef<THREE.Group>(null);
  const doorsRef = useRef<{ left: THREE.Mesh; right: THREE.Mesh }>({ left: null!, right: null! });
  const [doorOpen, setDoorOpen] = useState(false);
  const [doorPosition, setDoorPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDoorOpen((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (cabinRef.current) {
      cabinRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }

    // Animate doors
    const targetPosition = doorOpen ? 0.4 : 0;
    setDoorPosition((prev) => THREE.MathUtils.lerp(prev, targetPosition, delta * 2));
  });

  const metalMaterial = new THREE.MeshStandardMaterial({
    color: "#5BC0EB",
    metalness: 0.8,
    roughness: 0.2,
  });

  const darkMetalMaterial = new THREE.MeshStandardMaterial({
    color: "#1A365D",
    metalness: 0.9,
    roughness: 0.1,
  });

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: "#FFD700",
    metalness: 0.9,
    roughness: 0.1,
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={cabinRef} position={[0, 0, 0]} scale={0.8}>
        {/* Elevator Frame */}
        <mesh position={[0, 0, -0.5]}>
          <boxGeometry args={[2.4, 3, 0.1]} />
          <meshStandardMaterial {...darkMetalMaterial} />
        </mesh>

        {/* Left Frame */}
        <mesh position={[-1.15, 0, 0]}>
          <boxGeometry args={[0.1, 3, 1]} />
          <meshStandardMaterial {...darkMetalMaterial} />
        </mesh>

        {/* Right Frame */}
        <mesh position={[1.15, 0, 0]}>
          <boxGeometry args={[0.1, 3, 1]} />
          <meshStandardMaterial {...darkMetalMaterial} />
        </mesh>

        {/* Top Frame */}
        <mesh position={[0, 1.55, 0]}>
          <boxGeometry args={[2.4, 0.1, 1]} />
          <meshStandardMaterial {...darkMetalMaterial} />
        </mesh>

        {/* Bottom Frame */}
        <mesh position={[0, -1.55, 0]}>
          <boxGeometry args={[2.4, 0.1, 1]} />
          <meshStandardMaterial {...darkMetalMaterial} />
        </mesh>

        {/* Left Door */}
        <mesh position={[-0.5 - doorPosition, 0, 0.05]}>
          <boxGeometry args={[0.55, 2.8, 0.05]} />
          <meshStandardMaterial {...metalMaterial} />
        </mesh>

        {/* Right Door */}
        <mesh position={[0.5 + doorPosition, 0, 0.05]}>
          <boxGeometry args={[0.55, 2.8, 0.05]} />
          <meshStandardMaterial {...metalMaterial} />
        </mesh>

        {/* Interior */}
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[2, 2.8, 0.02]} />
          <meshStandardMaterial color="#2a4a5f" metalness={0.5} roughness={0.3} />
        </mesh>

        {/* Interior Light */}
        <pointLight position={[0, 1, -0.2]} intensity={0.5} color="#ffffff" />

        {/* Floor Indicator Display */}
        <mesh position={[0, 1.8, 0.1]}>
          <boxGeometry args={[0.4, 0.15, 0.05]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        
        {/* Indicator Light */}
        <mesh position={[0, 1.8, 0.13]}>
          <boxGeometry args={[0.3, 0.08, 0.01]} />
          <meshStandardMaterial color="#5BC0EB" emissive="#5BC0EB" emissiveIntensity={2} />
        </mesh>

        {/* Call Buttons */}
        <group position={[1.4, 0.3, 0.1]}>
          <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
            <meshStandardMaterial {...goldMaterial} />
          </mesh>
          <mesh position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
            <meshStandardMaterial {...goldMaterial} />
          </mesh>
        </group>

        {/* Decorative Lines */}
        {[-0.8, 0, 0.8].map((y, i) => (
          <mesh key={i} position={[0, y, -0.44]}>
            <boxGeometry args={[2, 0.02, 0.01]} />
            <meshStandardMaterial {...goldMaterial} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#5BC0EB" />
      <spotLight position={[0, 5, 2]} intensity={0.5} angle={0.5} penumbra={1} />
      
      <ElevatorCabin />
      
      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

const Elevator3D = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Elevator3D;
