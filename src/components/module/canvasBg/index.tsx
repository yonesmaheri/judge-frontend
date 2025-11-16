/* eslint-disable prefer-const */

"use client";

import { useEffect, useRef } from "react";
import { createNoise3D, NoiseFunction3D } from "simplex-noise";

const { PI, cos, sin, abs, random } = Math;
const TAU = 2 * PI;
const rand = (n: number) => n * random();
const randRange = (n: number) => n - rand(2 * n);
const fadeInOut = (t: number, m: number) => {
  let hm = 0.5 * m;
  return abs(((t + hm) % m) - hm) / hm;
};
const lerp = (n1: number, n2: number, speed: number) =>
  (1 - speed) * n1 + speed * n2;

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    // ==== Config ====
    const particleCount = 750;
    const particlePropCount = 9;
    const particlePropsLength = particleCount * particlePropCount;
    const rangeY = 100;
    const baseTTL = 50;
    const rangeTTL = 150;
    const baseSpeed = 0.1;
    const rangeSpeed = 2;
    const baseRadius = 1;
    const rangeRadius = 4;  
    const baseHue = 220;
    const rangeHue = 100;
    const noiseSteps = 8;
    const xOff = 0.00125;
    const yOff = 0.00125;
    const zOff = 0.0005;
    // const backgroundColor = "hsla(260,40%,5%,1)";

    let center: number[] = [];
    let tick = 0;
    let simplex: NoiseFunction3D;
    let particleProps: Float32Array;

    function resize() {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      center[0] = 0.5 * innerWidth;
      center[1] = 0.5 * innerHeight;
    }

    function initParticles() {
      tick = 0;
      simplex = createNoise3D();
      particleProps = new Float32Array(particlePropsLength);
      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        initParticle(i);
      }
    }

    function initParticle(i: number) {
      let x = rand(canvas.width);
      let y = center[1] + randRange(rangeY);
      let life = 0;
      let ttl = baseTTL + rand(rangeTTL);
      let speed = baseSpeed + rand(rangeSpeed);
      let radius = baseRadius + rand(rangeRadius);
      let hue = baseHue + rand(rangeHue);
      particleProps.set([x, y, 0, 0, life, ttl, speed, radius, hue], i);
    }

    function updateParticle(i: number) {
      let i2 = i + 1,
        i3 = i + 2,
        i4 = i + 3,
        i5 = i + 4,
        i6 = i + 5,
        i7 = i + 6,
        i8 = i + 7,
        i9 = i + 8;

      let x = particleProps[i];
      let y = particleProps[i2];
      let n = simplex(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
      let vx = lerp(particleProps[i3], cos(n), 0.5);
      let vy = lerp(particleProps[i4], sin(n), 0.5);
      let life = particleProps[i5];
      let ttl = particleProps[i6];
      let speed = particleProps[i7];
      let x2 = x + vx * speed;
      let y2 = y + vy * speed;
      let radius = particleProps[i8];
      let hue = particleProps[i9];

      drawParticle(x, y, x2, y2, life, ttl, radius, hue);

      life++;
      particleProps[i] = x2;
      particleProps[i2] = y2;
      particleProps[i3] = vx;
      particleProps[i4] = vy;
      particleProps[i5] = life;

      if (
        x > canvas.width ||
        x < 0 ||
        y > canvas.height ||
        y < 0 ||
        life > ttl
      ) {
        initParticle(i);
      }
    }

    function drawParticle(
      x: number,
      y: number,
      x2: number,
      y2: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineWidth = radius;
      ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
    let lastTime = 0;
    const fps = 25;
    function draw(time: number) {
      if (time - lastTime < 1000 / fps) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = time;

      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlePropsLength; i += particlePropCount) {
        updateParticle(i);
      }

      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
