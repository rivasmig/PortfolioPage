// src/components/three-d/models/OBJModel.jsx
import React, { useRef, useMemo } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import Base3DComponent from '../base/Base3DComponent';

const OBJModel = ({
  objPath,
  mtlPath,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  animated = false,
  rotationSpeed = 0.01,
  ...baseProps
}) => {
  const group = useRef();

  // Load materials if provided
  const materials = mtlPath ? useLoader(MTLLoader, mtlPath) : null;
  if (materials) materials.preload();

  // Load the original OBJ model and apply materials
  const original = useLoader(
    OBJLoader,
    objPath,
    loader => {
      if (materials) loader.setMaterials(materials);
    }
  );

  // Clone the model so each instance gets its own Object3D
  const object = useMemo(() => original.clone(true), [original]);

  // Optional rotation animation
  useFrame(() => {
    if (animated && group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Base3DComponent {...baseProps}>
      <group ref={group} position={position} scale={scale} rotation={rotation}>
        <primitive object={object} />
      </group>
    </Base3DComponent>
  );
};

export default OBJModel;
