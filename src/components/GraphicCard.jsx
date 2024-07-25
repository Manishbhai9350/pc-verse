import { Canvas, useFrame } from '@react-three/fiber';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { cn } from '../utils';
import useWindow from '../hooks/useWindow';

const GraphicCard = forwardRef(({ color, speed, left ,initialRotation , initialMousePos , setInitialRotation , setInitialMousePos , refs}) => {
  const {width} = useWindow()
  return (
    <div
      ref={refs.graphicSecRef}
      className={cn(`fixed top-0 h-[100vh] w-1/2 min-w-[360px] left-[50vw] -translate-x-1/2`)}
    >
      <Canvas>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={10.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <RTX3080 ref={refs.card} setInitialRotation={setInitialRotation} setInitialMousePos={setInitialMousePos} initialRotation={initialRotation} initialMousePos={initialMousePos} speed={speed} color={color} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
});

export default GraphicCard;

export const RTX3080 = forwardRef((props, groupRef) => {
  const {initialMousePos,initialRotation,setInitialMousePos,setInitialRotation} = props
  const anims = [
    'Armature|fan_static',
    'Armature|fan_1500rpm',
    'Armature|fan_1200rpm',
    'Armature|fan_600rpm',
  ];
  const { nodes, materials, animations } = useGLTF('/models/rtx-3080/rtx-3080.glb');
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    // Stop all animations
    Object.values(actions).forEach(action => {
      action.stop();
    });
    if (props.speed !== 0) {
      // Play the animation corresponding to the current props.speed
      const action = actions[anims[props.speed]];
      if (action) {
        action.play();
      }
    }
  }, [props.speed, actions, anims]);

  const [isDragging, setIsDragging] = useState(false);
  

  const maxRotationX = Math.PI / 6; // Maximum x rotation (30 degrees)
  const minRotationX = -Math.PI / 7; // Minimum x rotation (-25 degrees)
  const maxRotationY = Math.PI / 1.4; // Maximum y rotation (45 degrees)
  const minRotationY = Math.PI / 10; // Minimum y rotation (18 degrees)

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setInitialMousePos({ x: event.clientX, y: event.clientY });
    setInitialRotation({ x: groupRef.current.rotation.x, y: groupRef.current.rotation.y });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - initialMousePos.x;
      const deltaY = event.clientY - initialMousePos.y;

      let targetRotationX = initialRotation.x + deltaY * 0.01;
      let targetRotationY = initialRotation.y + deltaX * 0.01;

      // Constrain the rotation
      targetRotationX = Math.max(minRotationX, Math.min(maxRotationX, targetRotationX));
      targetRotationY = Math.max(minRotationY, Math.min(maxRotationY, targetRotationY));

      gsap.to(groupRef.current.rotation, {
        x: targetRotationX,
        y: targetRotationY,
        ease: "elastic.out(1, 0.3)",
        duration: 1.5
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Return to default rotations
    gsap.to(groupRef.current.rotation, {
      x: 5 / 100,
      y: 124 / 100,
      z: 294 / 100,
      ease: "elastic.out(1, 0.7)",
      duration: 1.5
    });
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    // window.addEventListener('touchstart', e => {
      //   handleMouseDown(e.touches[0])
      // });
      // window.addEventListener('touchmove',  e => {
      //   handleMouseMove(e.touches[0])
      // });
      // window.addEventListener('touchend',  e => {
      //   handleMouseUp(e.touches[0])
      // });

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      // window.addEventListener('touchstart', e => {
      //   handleMouseDown(e.touches[0])
      // });
      // window.addEventListener('touchmove',  e => {
      //   handleMouseMove(e.touches[0])
      // });
      // window.addEventListener('touchend',  e => {
      //   handleMouseUp(e.touches[0])
      // });
    };
  }, [initialMousePos, initialRotation, isDragging]);

  const {height,width} = useWindow()

  return (
    <group ref={groupRef} scale={ width < 600 ? 0.15 : 0.2} position={[0, 0, 0]} rotation={[5 / 100, 124 / 100, 294 / 100]} {...props} dispose={null}>
      <group position={[0, 0, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]}>
        <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <group name="Object_2">
            <group name="RootNode">
              <group name="body" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <group name="heatsink_front">
                  <mesh name="heatsink_front_RTX_3080_0" geometry={nodes.heatsink_front_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="motherboard">
                  <mesh name="motherboard_RTX_3080_0" geometry={nodes.motherboard_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="back_shield">
                  <mesh name="back_shield_RTX_3080_0" geometry={nodes.back_shield_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="cover">
                  <mesh name="cover_RTX_3080_0" geometry={nodes.cover_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="ports">
                  <mesh name="ports_RTX_3080_0" geometry={nodes.ports_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="cover_right">
                  <mesh name="cover_right_RTX_3080_0" geometry={nodes.cover_right_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="cover_left">
                  <mesh name="cover_left_RTX_3080_0" geometry={nodes.cover_left_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="heatsink_right">
                  <mesh name="heatsink_right_RTX_3080_0" geometry={nodes.heatsink_right_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="heatsink_left">
                  <mesh name="heatsink_left_RTX_3080_0" geometry={nodes.heatsink_left_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="screw">
                  <mesh name="screw_RTX_3080_0" geometry={nodes.screw_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="12_pin">
                  <mesh name="12_pin_RTX_3080_0" geometry={nodes['12_pin_RTX_3080_0'].geometry} material={materials.RTX_3080} />
                </group>
                <group name="heatpipes">
                  <mesh name="heatpipes_RTX_3080_0" geometry={nodes.heatpipes_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="fan_holder">
                  <mesh name="fan_holder_RTX_3080_0" geometry={nodes.fan_holder_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="heatsink_back">
                  <mesh name="heatsink_back_RTX_3080_0" geometry={nodes.heatsink_back_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="coldplate">
                  <mesh name="coldplate_RTX_3080_0" geometry={nodes.coldplate_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="fan_ring_2001">
                  <mesh name="fan_ring_2001_RTX_3080_0" geometry={nodes.fan_ring_2001_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="screw_2001">
                  <mesh name="screw_2001_RTX_3080_0" geometry={nodes.screw_2001_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="screw_2002">
                  <mesh name="screw_2002_RTX_3080_0" geometry={nodes.screw_2002_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="screw_2003">
                  <mesh name="screw_2003_RTX_3080_0" geometry={nodes.screw_2003_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="screw_2004">
                  <mesh name="screw_2004_RTX_3080_0" geometry={nodes.screw_2004_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="screw001">
                  <mesh name="screw001_RTX_3080_0" geometry={nodes.screw001_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="body001">
                  <mesh name="body001_RTX_3080_0" geometry={nodes.body001_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="fan_holder_2">
                  <mesh name="fan_holder_2_RTX_3080_0" geometry={nodes.fan_holder_2_RTX_3080_0.geometry} material={materials.RTX_3080} />
                </group>
                <group name="Armature">
                  <group name="Object_55">
                    <primitive object={nodes._rootJoint} />
                  </group>
                </group>
                <mesh name="body_RTX_3080_0" geometry={nodes.body_RTX_3080_0.geometry} material={materials.RTX_3080} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload('/models/rtx-3080/rtx-3080.glb');
