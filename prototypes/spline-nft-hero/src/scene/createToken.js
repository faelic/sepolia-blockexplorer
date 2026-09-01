import * as THREE from 'three';

function isFrontMesh(node) {
  return (
    node.name === 'NFT_Front' ||
    node.material?.name === 'NFT_FRONT_REPLACE_TEXTURE'
  );
}

const DEPTH_MATERIALS = {
  near: {
    body: '#071015',
    back: '#03070a',
    rim: '#035352',
    rimEmissive: '#035352',
    rimEmissiveIntensity: 0.065,
    artworkTint: '#ffffff',
    artworkEmissiveIntensity: 0.14,
  },
  mid: {
    body: '#050b0f',
    back: '#020507',
    rim: '#024241',
    rimEmissive: '#024241',
    rimEmissiveIntensity: 0.05,
    artworkTint: '#ffffff',
    artworkEmissiveIntensity: 0.16,
  },
  far: {
    body: '#030609',
    back: '#010304',
    rim: '#023534',
    rimEmissive: '#024241',
    rimEmissiveIntensity: 0.04,
    artworkTint: '#ffffff',
    artworkEmissiveIntensity: 0.18,
  },
};

export function configureBaseModel(baseScene) {
  baseScene.traverse((node) => {
    if (!node.isMesh || !node.material) return;

    node.castShadow = false;
    node.receiveShadow = false;

    if (node.name === 'Token_Body') {
      node.material.color.set('#050b0f');
      node.material.metalness = 0.68;
      node.material.roughness = 0.44;
    }

    if (node.name === 'Cyan_Rim' || node.name === 'Rear_Rim') {
      node.material.color.set('#024241');
      node.material.metalness = 0.66;
      node.material.roughness = 0.42;
      node.material.emissive = new THREE.Color('#024241');
      node.material.emissiveIntensity = 0.05;
    }

    if (node.name === 'Token_Back') {
      node.material.color.set('#020507');
      node.material.metalness = 0.64;
      node.material.roughness = 0.5;
    }
  });
}

export function createToken(baseScene, texture, config) {
  const token = baseScene.clone(true);
  const depthMaterial = DEPTH_MATERIALS[config.depth] ?? DEPTH_MATERIALS.mid;
  let frontFound = false;

  token.traverse((node) => {
    if (!node.isMesh || !node.material) return;

    const material = node.material.clone();
    material.name = `${config.id}-${node.name || 'mesh'}-material`;

    if (isFrontMesh(node)) {
      material.map = texture;
      material.emissiveMap = texture;
      material.color.set(depthMaterial.artworkTint);
      material.emissive.set('#ffffff');
      material.emissiveIntensity = depthMaterial.artworkEmissiveIntensity;
      material.metalness = 0;
      material.roughness = 0.78;
      frontFound = true;
    } else if (node.name === 'Token_Body') {
      material.color.set(depthMaterial.body);
    } else if (node.name === 'Cyan_Rim' || node.name === 'Rear_Rim') {
      material.color.set(depthMaterial.rim);
      material.emissive.set(depthMaterial.rimEmissive);
      material.emissiveIntensity = depthMaterial.rimEmissiveIntensity;
    } else if (node.name === 'Token_Back') {
      material.color.set(depthMaterial.back);
    }

    material.needsUpdate = true;
    node.material = material;
  });

  if (!frontFound) {
    throw new Error(`NFT front mesh was not found for ${config.id}.`);
  }

  token.name = config.id;
  token.position.set(...config.position);
  token.rotation.set(...config.rotation);
  token.scale.setScalar(config.scale);
  token.userData.motion = {
    ...config,
    basePosition: new THREE.Vector3(...config.position),
    baseRotation: new THREE.Euler(...config.rotation),
    baseScale: config.scale,
  };

  return token;
}
