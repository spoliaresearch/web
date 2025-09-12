"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

// TouchTexture class - keeping your working structure but with htct behavior
class TouchTexture {
  constructor() {
    this.size = 128; // Increased from 64 to 128 for better grid coverage
    this.maxAge = 60; // Changed from 120 to match htct
    this.radius = 0.15;
    this.trail = [];
    this.canDraw = true;

    this.initTexture();
  }

  initTexture() {
    // create a 2D canvas to store the information of the cursor
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // draw black background

    // use the canvas as a texture
    this.texture = new THREE.Texture(this.canvas);

    this.canvas.id = "touchTexture";
    this.canvas.style.width = this.canvas.style.height = `150px`;
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.zIndex = "10000";

    // No need to add it to the body,
    // document.body.appendChild(this.canvas)
  }

  update() {
    this.clear();
    if (!this.canDraw) {
      return false;
    }

    // age points
    this.trail.forEach((point, i) => {
      point.age++;
      // remove old
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    });

    // draw white points
    this.trail.forEach((point, i) => {
      this.drawTouch(point);
    });

    // update texture
    this.texture.needsUpdate = true;
  }

  clear() {
    // clear canvas
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }
    this.trail.push({ x: point.x, y: point.y, age: 0, force });
  }

  drawTouch(point) {
    // draw point based on size and age
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = this.outSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = this.outSine(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
    }

    intensity *= point.force;

    const radius = this.size * this.radius * intensity;
    const grd = this.ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius);
    // draw gradient white circles
    grd.addColorStop(0, `rgba(255, 255, 255, 0.35)`);
    grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");

    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    // fill canvas
  }

  outSine(n) {
    return Math.sin((n * Math.PI) / 2);
  }

  reset() {
    // reset canvas
    this.trail = [];
    this.canDraw = false;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
    this.ctx.fill();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => (this.canDraw = true), 0);
  }
}

// Utility function copied exactly from htct for performance
function sortPoints(mesh, camera) {
  const vector = new THREE.Vector3();
  const { geometry } = mesh;

  // Model View Projection matrix
  const matrix = new THREE.Matrix4();
  matrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  matrix.multiply(mesh.matrixWorld);

  let index = geometry.getIndex();
  const positions = geometry.getAttribute("position").array;
  const length = positions.length / 3;

  if (index === null) {
    const array = new Uint16Array(length);

    for (let i = 0; i < length; i++) {
      array[i] = i;
    }

    index = new THREE.BufferAttribute(array, 1);

    geometry.setIndex(index);
  }

  const sortArray = [];

  for (let i = 0; i < length; i++) {
    vector.fromArray(positions, i * 3);
    vector.applyMatrix4(matrix);

    sortArray.push([vector.z, i]);
  }

  function numericalSort(a, b) {
    return b[0] - a[0];
  }

  sortArray.sort(numericalSort);

  const indices = index.array;

  for (let i = 0; i < length; i++) {
    indices[i] = sortArray[i][1];
  }

  geometry.index.needsUpdate = true;
}

// Particle system component
function ParticleSystem({ guiObj }) {
  const meshRef = useRef();
  const touchRef = useRef();
  const timeRef = useRef(0);

  useEffect(() => {
    if (!meshRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const particles = [];
    const initPositions = [];
    const multiplier = 18;
    const nbColumns = 9 * multiplier;
    const nbLines = 16 * multiplier;

    const offsetTransition = 50;
    const halfColumn = nbColumns / 2;
    const halfLines = nbLines / 2;

    // Create grid of particles exactly like htct
    for (let i = 0; i < nbLines; i++) {
      for (let y = 0; y < nbColumns; y++) {
        const point = [i, y, 0.0];

        // appear from side
        let initPoint = [
          i / 3 - halfLines + (Math.random() * halfLines * 2 - halfLines + offsetTransition),
          (y - halfColumn - (Math.random() * halfColumn * 2 - halfColumn + offsetTransition)) / 3,
          Math.random() * 100 - 50,
        ];

        particles.push(...point);
        initPositions.push(...initPoint);
      }
    }

    const vertices = new Float32Array(particles);
    const initPositionsFloat = new Float32Array(initPositions);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.setAttribute("initPosition", new THREE.BufferAttribute(initPositionsFloat, 3));
    geometry.center();

    // Create TouchTexture
    touchRef.current = new TouchTexture();

    // Create shader material with htct shaders but keeping your working structure
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xff0000) },
        uPointSize: { value: guiObj.pointSize },
        uTexture: { value: new THREE.TextureLoader().load("/image.webp") },
        uNbLines: { value: nbLines },
        uNbColumns: { value: nbColumns },
        uProgress: { value: 1.0 },
        uTime: { value: 0 },
        uTouch: { value: touchRef.current.texture },
        uScaleHeightPointSize: { value: (2 * window.innerHeight) / 2 },
        uWaveFrequency: { value: guiObj.waveFrequency },
      },
      vertexShader: `
        uniform float uPointSize;
        uniform float uProgress;
        uniform float uTime;
        uniform sampler2D uTouch;
        uniform float uNbLines;
        uniform float uNbColumns;
        uniform float uScaleHeightPointSize;
        uniform float uWaveFrequency;

        attribute vec3 initPosition;

        varying vec2 vTexCoords;

        const float scale = 1.0;
        const float waveAmplitude = 5.;

        void main() {
          // shunk of code used in Three.js
          // https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderChunk/begin_vertex.glsl.js
          vec3 transformed = position;

          // appear effect
          transformed = initPosition + ((position - initPosition) * uProgress);

          // flag effect
          transformed.z += sin(transformed.x * uWaveFrequency + uTime) * waveAmplitude;
          transformed.z += sin(transformed.y * uWaveFrequency + uTime) * waveAmplitude;

          // get UVs of the plane - THIS IS THE KEY FOR TOUCH INTERACTION
          // Fixed mapping to ensure full grid coverage
          vec2 vUv = (transformed.xy + vec2(uNbLines, uNbColumns) * 0.5) / vec2(uNbLines, uNbColumns);
          
          // get Touch canvas texture
          float touch = texture2D(uTouch, vUv).r;
          // apply the touch canvas texture on the Z axis of the particles
          // (if touch texture is white, apply force, if black do nothing)
          transformed.z -= touch * 120.0; // Negative value pushes particles backward (away from camera)
          // https://github.com/mrdoob/three.js/blob/master/src/renderers/shaders/ShaderChunk/project_vertex.glsl.js
          vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // get Texture coords for fragment shader
          vTexCoords = position.xy;

          // Final Position - THIS IS THE KEY FOR PERFORMANCE
          gl_PointSize = uPointSize * ( uScaleHeightPointSize / - mvPosition.z );
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform sampler2D uTexture;
        uniform float uNbLines;
        uniform float uNbColumns;
        uniform float uProgress;

        varying vec2 vTexCoords;

        // create a square value in a frag shader instead of circle
        float square(vec2 uv, float border) {
          float dist = max(abs(uv.x - 0.5), abs(uv.y - 0.5));
          return smoothstep(0.5, 0.5 - border, dist);
        }

        void main() {
          // adapt point to UV texture - THIS IS THE KEY FOR CORRECT TEXTURE MAPPING

          // We get the coordinate inside 1 particle: gl_PointCoord
          vec2 uv = gl_PointCoord;
          //  We invert the V because it's inverted by default when using gl_PointCoord compare to classic UVs.
          uv.y *= -1.;
          // we divide U by the number of particles in a line
          // we divide V by the number of particles in a column
          // so the final result is between 0 and 1.
          uv /= vec2(uNbLines, uNbColumns);

          // After dividing a UV you need to offset it using +
          // we add X the position of the particule divided by the total
          // example, if 100 particles the 10th particle will be 0.1
          float texOffsetU = vTexCoords.x / uNbLines;
          // same for Y
          float texOffsetV = vTexCoords.y / uNbColumns;
          uv += vec2(texOffsetU, texOffsetV);
          // Finally we add 0.5 to center the value
          uv += vec2(0.5);

          vec4 texture = texture2D(uTexture, uv);

          gl_FragColor.rgb = texture.rgb;

          // discard pixels if too dark
          if (gl_FragColor.r < 0.1) {
            discard;
          }

          gl_FragColor.a = 1.;
          // make an circle opacity to create round particles
          gl_FragColor.a *= square(gl_PointCoord, 0.2);
          // apply opacity on the appear effect as well
          gl_FragColor.a *= uProgress;
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    meshRef.current.geometry = geometry;
    meshRef.current.material = material;
  }, [guiObj.pointSize, guiObj.waveFrequency]);

  useFrame((state) => {
    if (!meshRef.current || !touchRef.current) return;

    timeRef.current += guiObj.waveSpeed * 0.01;
    meshRef.current.material.uniforms.uTime.value = timeRef.current;

    // Update TouchTexture
    touchRef.current.update();

    // Sort points to avoid render order issues due to transparency - THIS IS KEY FOR PERFORMANCE
    sortPoints(meshRef.current, state.camera);

    // Add mouse touch - htct style interaction
    if (state.mouse.x !== 0 || state.mouse.y !== 0) {
      // Convert to UV space like htct, but account for camera movement
      const uv = new THREE.Vector2();

      // Get the current camera position to adjust for movement
      const cameraX = state.camera.position.x;
      const leftOffset = 500; // Match the offset from camera animation

      // Adjust mouse coordinates based on camera position and leftOffset
      // This compensates for the camera's left/right movement and starting position
      const adjustedMouseX = state.mouse.x - (cameraX - leftOffset) / 1000; // Scale factor to match panRange

      uv.x = (adjustedMouseX + 1) / 2;
      uv.y = (state.mouse.y + 1) / 2;

      touchRef.current.addTouch(uv);
    }
  });

  return <points ref={meshRef} />;
}

// Main component
export default function ThreeAnimation() {
  const [guiObj, setGuiObj] = useState({
    pointSize: 2.5,
    waveFrequency: 0.047,
    waveSpeed: 1.0,
  });

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* GUI Controls */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "rgba(0,0,0,0.8)",
          padding: "20px",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Point Size: {guiObj.pointSize}</label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={guiObj.pointSize}
            onChange={(e) => setGuiObj((prev) => ({ ...prev, pointSize: parseFloat(e.target.value) }))}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Wave Frequency: {guiObj.waveFrequency}</label>
          <input
            type="range"
            min="0.001"
            max="0.1"
            step="0.001"
            value={guiObj.waveFrequency}
            onChange={(e) => setGuiObj((prev) => ({ ...prev, waveFrequency: parseFloat(e.target.value) }))}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Wave Speed: {guiObj.waveSpeed}</label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={guiObj.waveSpeed}
            onChange={(e) => setGuiObj((prev) => ({ ...prev, waveSpeed: parseFloat(e.target.value) }))}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 250], fov: 60 }} style={{ background: "black" }}>
        <AnimatedCamera />
        <ParticleSystem guiObj={guiObj} />
      </Canvas>
    </div>
  );
}

// Animated camera component
function AnimatedCamera() {
  const { camera } = useThree();

  useFrame((state) => {
    // Slow left to right movement
    const time = state.clock.elapsedTime;
    const panSpeed = 0; // Adjust this to control how fast the camera moves
    const panRange = 0; // How far left/right the camera moves
    const leftOffset = 0; // Start the camera more to the left

    camera.position.x = leftOffset - Math.sin(time * panSpeed) * panRange;
    // Removed camera.lookAt(0, 0, 0) to prevent rotation effect
  });

  return null; // This component doesn't render anything, just animates the camera
}
