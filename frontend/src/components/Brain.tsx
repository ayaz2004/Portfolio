import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame} from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

const sections = [
  { id: 'about', name: 'About', color: '#FF41FF', position: [2, 2, 0] },
  { id: 'skills', name: 'Skills', color: '#41FFFF', position: [-2, 2, 0] },
  { id: 'projects', name: 'Projects', color: '#FF4141', position: [0, 3, 2] },
  { id: 'achievements', name: 'Achievements', color: '#41FF41', position: [0, 0, 3] },
  { id: 'resume', name: 'Resume', color: '#FFFF41', position: [-2, -2, 0] },
  { id: 'contact', name: 'Contact', color: '#4141FF', position: [2, -2, 0] },
];

const synapses = [
  { from: 'about', to: 'skills' },
  { from: 'about', to: 'projects' },
  { from: 'skills', to: 'projects' },
  { from: 'skills', to: 'achievements' },
  { from: 'projects', to: 'achievements' },
  { from: 'projects', to: 'resume' },
  { from: 'achievements', to: 'resume' },
  { from: 'achievements', to: 'contact' },
  { from: 'resume', to: 'contact' },
  { from: 'contact', to: 'about' },
];

interface NeuronProps {
  position: [number, number, number];
  color: string;
  name: string;
  isActive: boolean;
  onClick: () => void;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

const Neuron: React.FC<NeuronProps> = ({ 
  position, 
  color, 
  name, 
  isActive, 
  onClick, 
  onPointerOver, 
  onPointerOut 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  
  return (
    <mesh 
      position={position} 
      ref={meshRef} 
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={isActive ? 2 : 0.5}
        metalness={0.8}
        roughness={0.2}
      />
      <Html distanceFactor={10}>
        <div className="text-white font-semibold text-lg bg-black bg-opacity-50 px-2 py-1 rounded">
          {name}
        </div>
      </Html>
    </mesh>
  );
};

interface SynapseProps {
  startPos: number[];
  endPos: number[];
  color: string;
  intensity?: number;
}

const Synapse: React.FC<SynapseProps> = ({ startPos, endPos, color, intensity = 0.5 }) => {
  const ref = useRef<THREE.Line>(null);
  
  useEffect(() => {
    if (ref.current) {
      const points = [
        new THREE.Vector3(...startPos),
        new THREE.Vector3(...endPos)
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      ref.current.geometry = geometry;
    }
  }, [startPos, endPos]);
  
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} opacity={intensity} transparent={true} />
    </line>
  );
};

interface BrainSceneProps {
  onSelectSection: (sectionId: string) => void;
  activeSection: string | null;
}

const BrainScene: React.FC<BrainSceneProps> = ({ onSelectSection, activeSection }) => {
//   const { camera } = useThree();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  
  const handleSectionClick = (sectionId: string) => {
    onSelectSection(sectionId);
    
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      const targetPosition = new THREE.Vector3(...section.position);
      targetPosition.multiplyScalar(1.5); 
    }
  };
  
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {sections.map((section) => (
        <Neuron
          key={section.id}
          position={section.position as [number, number, number]}
          color={section.color}
          name={section.name}
          isActive={activeSection === section.id || hoveredNode === section.id}
          onClick={() => handleSectionClick(section.id)}
          onPointerOver={() => setHoveredNode(section.id)}
          onPointerOut={() => setHoveredNode(null)}
        />
      ))}
      
      {synapses.map((synapse, index) => {
        const fromSection = sections.find(s => s.id === synapse.from);
        const toSection = sections.find(s => s.id === synapse.to);
        
        if (fromSection && toSection) {
          return (
            <Synapse
              key={index}
              startPos={fromSection.position}
              endPos={toSection.position}
              color="#ffffff"
              intensity={
                activeSection === synapse.from || 
                activeSection === synapse.to ? 
                0.8 : 0.3
              }
            />
          );
        }
        return null;
      })}
      
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </>
  );
};

interface BrainProps {
  onSelectSection: (sectionId: string) => void;
  activeSection: string | null;
}

const Brain: React.FC<BrainProps> = ({ onSelectSection, activeSection }) => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <BrainScene 
          onSelectSection={onSelectSection} 
          activeSection={activeSection}
        />
      </Canvas>
    </div>
  );
};

export default Brain;