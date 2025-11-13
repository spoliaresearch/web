"use client";

import React, { useEffect, useContext } from "react";
import { InteractiveContext } from "../contexts/DisableInteractive";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

const sketch = (p5) => {
  let particles = [];
  let img;
  let scaleFactor = 0.15;
  let shader;
  let graphics;
  let particleCount = 0;

  // Vertex shader for GPU-accelerated particles
  const vertexShader = `
    attribute vec3 position;
    attribute vec2 texCoord;
    attribute vec2 initPosition;
    
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseRadius;
    uniform float uRepulsionStrength;
    
    varying vec2 vTexCoords;
    varying vec2 vInitPos;
    
    void main() {
      vTexCoords = texCoord;
      vInitPos = initPosition.xy;
      
      // Calculate repulsion from mouse
      vec2 toMouse = position.xy - uMouse;
      float distToMouse = length(toMouse);
      
      vec2 displacement = vec2(0.0);
      if (distToMouse < uMouseRadius && distToMouse > 0.0) {
        float strength = uRepulsionStrength * (1.0 - distToMouse / uMouseRadius);
        displacement = normalize(toMouse) * strength;
      }
      
      // Return to original position
      vec2 toOrigin = initPosition.xy - position.xy;
      displacement += toOrigin * 0.05;
      
      // Apply displacement
      vec3 finalPosition = position;
      finalPosition.xy += displacement;
      
      gl_Position = vec4(finalPosition.xy, 0.0, 1.0);
      gl_PointSize = 3.0;
    }
  `;

  // Fragment shader for particle appearance
  const fragmentShader = `
    precision mediump float;
    
    uniform sampler2D uTexture;
    uniform vec2 uResolution;
    
    varying vec2 vTexCoords;
    
    void main() {
      vec2 uv = gl_PointCoord;
      uv.y = 1.0 - uv.y; // Flip Y coordinate
      
      // Sample texture at particle position
      vec4 texColor = texture2D(uTexture, vTexCoords);
      
      // Create circular particle mask
      vec2 center = vec2(0.5);
      float dist = distance(uv, center);
      float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
      
      // Use texture color with circular mask
      gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
    }
  `;

  function preload() {
    img = p5.loadImage("/image.webp");
  }

  function setup() {
    p5.createCanvas(p5.windowWidth, 400);

    if (img) {
      // Create off-screen graphics buffer for texture
      graphics = p5.createGraphics(img.width, img.height);
      graphics.image(img, 0, 0);

      // Process image to create efficient particle data
      createParticleData();

      // Create shader
      shader = p5.createShader(vertexShader, fragmentShader);

      console.log("Setup complete with", particleCount, "particles");
    }
  }

  function createParticleData() {
    const vertices = [];
    const texCoords = [];
    const initPositions = [];

    img.loadPixels();

    // Calculate offsets to center the image
    const offsetX = (p5.width - img.width * scaleFactor) / 2;
    const offsetY = (p5.height - img.height * scaleFactor) / 2;

    // Sample every 2nd pixel for performance
    for (let y = 0; y < img.height; y += 2) {
      for (let x = 0; x < img.width; x += 2) {
        const index = (x + y * img.width) * 4;
        const r = img.pixels[index];
        const g = img.pixels[index + 1];
        const b = img.pixels[index + 2];
        const alpha = img.pixels[index + 3];

        // Create particle if pixel has content
        if (r < 128 && g < 128 && b < 128 && alpha > 128) {
          const xPos = (x - img.width / 2) * scaleFactor + offsetX;
          const yPos = (y - img.height / 2) * scaleFactor + offsetY;

          // Position
          vertices.push(xPos, yPos, 0);

          // Texture coordinates (normalized)
          texCoords.push(x / img.width, y / img.height);

          // Initial position for return force
          initPositions.push(xPos, yPos);

          particleCount++;
        }
      }
    }

    // Store data for shader uniforms
    particles = {
      vertices: vertices,
      texCoords: texCoords,
      initPositions: initPositions,
      count: particleCount,
    };
  }

  function draw() {
    p5.background(0);

    // Move carousel from left to right
    const carouselSpeed = 0.5;
    let carouselOffset = (p5.frameCount * carouselSpeed) % (p5.width + 200);

    // Draw image carousel as background
    if (img) {
      p5.push();
      p5.translate(-carouselOffset, 0);
      for (let i = 0; i < 6; i++) {
        const xPos = i * (p5.width + 100);
        p5.image(img, xPos, 0, p5.width, p5.height);
      }
      p5.pop();
    }

    // Render particles using shader
    if (shader && particles.count > 0) {
      p5.push();
      p5.translate(-carouselOffset, 0);

      shader.setUniform("uTime", p5.frameCount * 0.01);
      shader.setUniform("uMouse", [p5.mouseX, p5.mouseY]);
      shader.setUniform("uMouseRadius", 80.0);
      shader.setUniform("uRepulsionStrength", 3.0);
      shader.setUniform("uTexture", graphics);
      shader.setUniform("uResolution", [p5.width, p5.height]);

      // Draw particles as points
      p5.shader(shader);
      p5.beginShape(p5.POINTS);

      for (let i = 0; i < particles.count; i++) {
        const idx = i * 3;
        p5.vertex(particles.vertices[idx], particles.vertices[idx + 1], particles.vertices[idx + 2]);
      }

      p5.endShape();
      p5.pop();
    }

    // Reset carousel position
    if (carouselOffset > p5.width + 200) {
      carouselOffset = 0;
    }
  }

  function windowResized() {
    p5.resizeCanvas(p5.windowWidth, 400);
    if (img) {
      createParticleData();
    }
  }

  // Assign p5 methods
  p5.preload = preload;
  p5.setup = setup;
  p5.draw = draw;
  p5.windowResized = windowResized;
};

export default function AnimatedDiagram() {
  const isInteractive = useContext(InteractiveContext) || {};

  useEffect(() => {
    console.log("AnimatedDiagram mounted, interactive:", isInteractive);
  }, [isInteractive]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden", pointerEvents: "all" }}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
}
