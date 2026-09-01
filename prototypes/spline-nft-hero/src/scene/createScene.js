import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { NFT_ARTWORKS } from '../config/nfts.js';
import { createArtworkTextures } from '../utils/textures.js';
import { configureBaseModel, createToken } from './createToken.js';
import { createMotionController } from './motion.js';
import { applyResponsiveLayout, TOKEN_LAYOUT } from './tokenLayout.js';

const MODEL_URL = '/models/blockscan_nft_token_standard.glb';

function configureRenderer(renderer, width, height) {
  const mobileDprCap = width <= 767 ? 1.25 : 1.5;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobileDprCap));
  renderer.setSize(width, height, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
}

function createFloor(scene) {
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: '#070a09',
    metalness: 0.08,
    roughness: 0.94,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(28, 42), floorMaterial);
  floor.name = 'perspective-floor';
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.88, -6);
  scene.add(floor);

  const grid = new THREE.GridHelper(26, 26, '#035352', '#024241');
  grid.name = 'perspective-grid';
  grid.position.set(0, -2.86, -6);
  grid.material.transparent = true;
  grid.material.opacity = 0.08;
  grid.material.depthWrite = false;
  grid.material.fog = true;
  scene.add(grid);

  return { floor, grid };
}

function addLighting(scene) {
  scene.add(new THREE.HemisphereLight('#9aa39e', '#020302', 0.44));

  const keyLight = new THREE.DirectionalLight('#f0f2ed', 3.45);
  keyLight.position.set(-5.5, 7.5, 8.5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight('#035352', 5.1, 22, 2);
  rimLight.position.set(5.5, 1.5, 4.5);
  scene.add(rimLight);

  const softFill = new THREE.PointLight('#59615d', 3, 20, 2);
  softFill.position.set(-5.5, -1.5, 3.5);
  scene.add(softFill);

  const edgeLight = new THREE.DirectionalLight('#4f6c65', 1.55);
  edgeLight.position.set(3.5, 4, -6);
  scene.add(edgeLight);
}

function disposeScene(scene, textures, renderer) {
  const geometries = new Set();
  const materials = new Set();

  scene.traverse((node) => {
    if (node.geometry) geometries.add(node.geometry);
    if (Array.isArray(node.material)) node.material.forEach((material) => materials.add(material));
    else if (node.material) materials.add(node.material);
  });

  geometries.forEach((geometry) => geometry.dispose());
  materials.forEach((material) => material.dispose());
  textures.forEach((texture) => texture.dispose());
  renderer.dispose();
}

export async function createScene({ container, hero, onReady, onFailure }) {
  const width = Math.max(hero.clientWidth, 1);
  const height = Math.max(hero.clientHeight, 1);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#05070a');
  scene.fog = new THREE.FogExp2('#05070a', 0.047);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(0, 0.24, 10);
  camera.lookAt(0, -0.24, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.domElement.className = 'scene-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');
  renderer.domElement.tabIndex = -1;
  configureRenderer(renderer, width, height);
  container.append(renderer.domElement);

  addLighting(scene);
  const { floor, grid } = createFloor(scene);

  const tokenGroup = new THREE.Group();
  tokenGroup.name = 'nft-token-field';
  scene.add(tokenGroup);

  let textures = [];
  let tokens = [];
  let motion = null;
  let frameId = 0;
  let lastTime = performance.now();
  let elapsed = 0;
  let heroVisible = true;
  let destroyed = false;

  function renderFrame(now) {
    frameId = requestAnimationFrame(renderFrame);
    const deltaTime = Math.min((now - lastTime) / 1000, 1 / 30);
    lastTime = now;
    elapsed += deltaTime;
    motion?.update(elapsed, deltaTime);
    renderer.render(scene, camera);
  }

  function startRendering() {
    if (destroyed || frameId || document.hidden || !heroVisible || !motion) return;
    lastTime = performance.now();
    frameId = requestAnimationFrame(renderFrame);
  }

  function stopRendering() {
    if (!frameId) return;
    cancelAnimationFrame(frameId);
    frameId = 0;
  }

  function onVisibilityChange() {
    if (document.hidden) stopRendering();
    else startRendering();
  }

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      heroVisible = entry.isIntersecting;
      if (heroVisible) startRendering();
      else stopRendering();
    },
    { threshold: 0.01 },
  );
  intersectionObserver.observe(hero);
  document.addEventListener('visibilitychange', onVisibilityChange);

  const resizeObserver = new ResizeObserver(() => {
    const nextWidth = Math.max(hero.clientWidth, 1);
    const nextHeight = Math.max(hero.clientHeight, 1);
    camera.aspect = nextWidth / nextHeight;
    camera.updateProjectionMatrix();
    configureRenderer(renderer, nextWidth, nextHeight);
    const profile = applyResponsiveLayout(tokens, nextWidth);
    motion?.setViewport(profile);
    grid.material.opacity = profile === 'mobile' ? 0.045 : profile === 'tablet' ? 0.06 : 0.08;
    floor.material.opacity = profile === 'mobile' ? 0.12 : 0.18;
    renderer.render(scene, camera);
  });
  resizeObserver.observe(hero);

  try {
    const loader = new GLTFLoader();
    const [gltf, loadedTextures] = await Promise.all([
      loader.loadAsync(MODEL_URL),
      createArtworkTextures(NFT_ARTWORKS, renderer.capabilities.getMaxAnisotropy()),
    ]);

    textures = loadedTextures;
    configureBaseModel(gltf.scene);
    tokens = TOKEN_LAYOUT.map((config) => {
      const token = createToken(gltf.scene, textures[config.artwork], config);
      tokenGroup.add(token);
      return token;
    });

    motion = createMotionController({ hero, camera, tokens });
    const profile = applyResponsiveLayout(tokens, hero.clientWidth);
    motion.setViewport(profile);
    renderer.render(scene, camera);
    startRendering();
    onReady?.({ renderer, camera, tokens, profile });
  } catch (error) {
    stopRendering();
    onFailure?.(error);
  }

  return () => {
    destroyed = true;
    stopRendering();
    motion?.dispose();
    resizeObserver.disconnect();
    intersectionObserver.disconnect();
    document.removeEventListener('visibilitychange', onVisibilityChange);
    disposeScene(scene, textures, renderer);
    renderer.domElement.remove();
  };
}
