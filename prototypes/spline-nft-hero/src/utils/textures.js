import * as THREE from 'three';

const TEXTURE_SIZE = 512;

function createSeed(value) {
  let seed = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    seed ^= value.charCodeAt(index);
    seed = Math.imul(seed, 16777619);
  }
  return () => {
    seed += 0x6d2b79f5;
    let result = seed;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function roundedRect(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.roundRect(x, y, width, height, safeRadius);
}

function drawMotif(context, artwork, random) {
  const [background, accent, highlight] = artwork.palette;
  const gradient = context.createLinearGradient(24, 12, 488, 500);
  gradient.addColorStop(0, background);
  gradient.addColorStop(0.48, '#050a13');
  gradient.addColorStop(1, accent);
  context.fillStyle = gradient;
  context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  context.save();
  context.globalAlpha = 0.34;
  context.translate(388, 88);
  context.rotate(0.42);
  context.fillStyle = highlight;
  roundedRect(context, -84, -190, 188, 470, 46);
  context.fill();
  context.restore();

  for (let index = 0; index < 12; index += 1) {
    const width = 24 + random() * 96;
    const height = 18 + random() * 76;
    roundedRect(
      context,
      -20 + random() * 500,
      20 + random() * 360,
      width,
      height,
      5 + random() * 18,
    );
    context.fillStyle = index % 3 === 0 ? highlight : accent;
    context.globalAlpha = 0.035 + random() * 0.1;
    context.fill();
  }

  context.globalAlpha = 1;
  context.save();
  context.globalAlpha = 0.88;

  if (artwork.motif === 'orbital') {
    context.fillStyle = highlight;
    context.beginPath();
    context.ellipse(292, 180, 82, 96, 0.2, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#071018';
    context.beginPath();
    context.ellipse(306, 214, 124, 132, -0.28, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = accent;
    context.beginPath();
    context.arc(266, 160, 13, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = highlight;
    context.beginPath();
    context.moveTo(315, 187);
    context.lineTo(372, 205);
    context.lineTo(319, 224);
    context.closePath();
    context.fill();
  } else if (artwork.motif === 'rings') {
    context.translate(228, 220);
    context.rotate(-0.16);
    context.fillStyle = accent;
    context.beginPath();
    context.moveTo(-120, 115);
    context.lineTo(-76, -112);
    context.lineTo(12, -156);
    context.lineTo(118, -56);
    context.lineTo(74, 128);
    context.closePath();
    context.fill();
    context.fillStyle = highlight;
    context.beginPath();
    context.arc(-20, -58, 38, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#071018';
    context.beginPath();
    context.arc(-12, -54, 17, 0, Math.PI * 2);
    context.fill();
    context.fillRect(22, 14, 116, 34);
  } else if (artwork.motif === 'signal') {
    const pixels = [
      [92, 74, 88, 76], [180, 74, 104, 76], [284, 74, 80, 76],
      [92, 150, 66, 86], [158, 150, 126, 86], [284, 150, 98, 86],
      [120, 236, 102, 94], [222, 236, 142, 94],
    ];
    pixels.forEach(([x, y, width, height], index) => {
      context.fillStyle = index % 3 === 0 ? highlight : accent;
      context.globalAlpha = 0.35 + index * 0.055;
      context.fillRect(x, y, width, height);
    });
    context.globalAlpha = 1;
    context.fillStyle = '#071018';
    context.fillRect(164, 155, 34, 34);
    context.fillRect(282, 155, 34, 34);
    context.fillRect(216, 258, 96, 22);
  } else if (artwork.motif === 'wave') {
    context.globalAlpha = 0.92;
    context.fillStyle = highlight;
    context.beginPath();
    context.arc(354, 128, 62, 0, Math.PI * 2);
    context.fill();
    for (let row = 0; row < 5; row += 1) {
      context.strokeStyle = row % 2 === 0 ? accent : highlight;
      context.lineWidth = 15 - row * 1.5;
      context.beginPath();
      for (let x = -30; x <= 540; x += 16) {
        const y = 205 + row * 42 + Math.sin(x * 0.019 + row * 0.95) * (28 + row * 3);
        if (x === -30) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }
  } else if (artwork.motif === 'slash') {
    context.translate(238, 220);
    context.rotate(-0.5);
    for (let index = -3; index <= 4; index += 1) {
      const width = 30 + random() * 34;
      roundedRect(context, index * 58 - width / 2, -300, width, 600, 16);
      context.fillStyle = index % 2 === 0 ? accent : highlight;
      context.globalAlpha = 0.38 + index * 0.06;
      context.fill();
    }
    context.rotate(0.5);
    context.globalAlpha = 1;
    context.fillStyle = '#05080d';
    context.beginPath();
    context.ellipse(82, -20, 86, 122, 0.3, 0, Math.PI * 2);
    context.fill();
  } else if (artwork.motif === 'blocks' || artwork.motif === 'ice') {
    for (let index = 0; index < 22; index += 1) {
      const width = 30 + random() * 86;
      const height = 26 + random() * 96;
      const x = 30 + random() * (TEXTURE_SIZE - width - 60);
      const y = 34 + random() * (350 - height);
      roundedRect(context, x, y, width, height, artwork.motif === 'ice' ? 20 : 2);
      context.fillStyle = index % 3 === 0 ? highlight : accent;
      context.globalAlpha = 0.18 + random() * 0.5;
      context.fill();
    }
    context.globalAlpha = 0.9;
    context.fillStyle = '#05080d';
    context.fillRect(294, 76, 46, 156);
    context.fillRect(244, 126, 142, 48);
    context.fillRect(264, 232, 96, 104);
  } else if (artwork.motif === 'portrait') {
    context.fillStyle = highlight;
    context.beginPath();
    context.ellipse(318, 168, 80, 104, 0.28, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#071018';
    context.beginPath();
    context.moveTo(244, 95);
    context.quadraticCurveTo(350, 42, 408, 132);
    context.lineTo(332, 144);
    context.quadraticCurveTo(300, 222, 372, 270);
    context.lineTo(220, 276);
    context.closePath();
    context.fill();
    context.fillStyle = accent;
    context.beginPath();
    context.moveTo(160, 394);
    context.quadraticCurveTo(250, 236, 392, 322);
    context.lineTo(438, 408);
    context.closePath();
    context.fill();
  } else {
    context.strokeStyle = highlight;
    context.lineWidth = 7;
    const origin = { x: 178, y: 286 };
    for (let index = 0; index < 12; index += 1) {
      const x = 52 + random() * 410;
      const y = 42 + random() * 310;
      context.beginPath();
      context.moveTo(origin.x, origin.y);
      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.arc(x, y, 8 + random() * 18, 0, Math.PI * 2);
      context.fillStyle = index % 2 === 0 ? accent : highlight;
      context.fill();
    }
    context.fillStyle = accent;
    context.fillRect(118, 230, 124, 112);
  }

  context.restore();

  const vignette = context.createRadialGradient(256, 238, 150, 256, 256, 380);
  vignette.addColorStop(0.55, 'rgba(1, 5, 15, 0)');
  vignette.addColorStop(1, 'rgba(1, 5, 15, 0.82)');
  context.fillStyle = vignette;
  context.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
}

function configureTexture(texture, artwork, anisotropy, suffix) {
  texture.name = `${artwork.id}-${suffix}`;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.flipY = false;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = anisotropy;
  texture.needsUpdate = true;
  return texture;
}

function createPlaceholderTexture(artwork, anisotropy) {
  const canvas = document.createElement('canvas');
  canvas.width = TEXTURE_SIZE;
  canvas.height = TEXTURE_SIZE;

  const context = canvas.getContext('2d', { alpha: false });
  const random = createSeed(artwork.id);
  drawMotif(context, artwork, random);

  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = 'rgba(229, 240, 255, 0.92)';
  context.font = '700 34px Space Grotesk, Arial, sans-serif';
  context.letterSpacing = '4px';
  context.fillText(artwork.label, 256, 426);

  context.fillStyle = 'rgba(229, 240, 255, 0.58)';
  context.font = '500 16px Space Grotesk, Arial, sans-serif';
  context.letterSpacing = '2px';
  context.fillText('BLOCKSCAN EDITION', 256, 462);

  const texture = new THREE.CanvasTexture(canvas);
  return configureTexture(texture, artwork, anisotropy, 'placeholder');
}

async function loadLocalTexture(loader, artwork, anisotropy) {
  if (!artwork.image) return createPlaceholderTexture(artwork, anisotropy);

  try {
    const texture = await loader.loadAsync(artwork.image);
    return configureTexture(texture, artwork, anisotropy, 'artwork');
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn(`Using generated fallback for ${artwork.label}.`, error);
    }
    return createPlaceholderTexture(artwork, anisotropy);
  }
}

export async function createArtworkTextures(artworks, maxAnisotropy = 4) {
  const loader = new THREE.TextureLoader();
  const anisotropy = Math.max(1, Math.min(maxAnisotropy, 8));
  return Promise.all(artworks.map((artwork) => loadLocalTexture(loader, artwork, anisotropy)));
}
