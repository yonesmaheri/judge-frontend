"use client";
import RightCol from "./rightCol";
import LeftCol from "./leftCol";

export default function HomePage() {
  return (
    <>
      <div className="liquid-glass">
        <section
          className="content-wrapper 
          lg:max-w-[1280px] max-w-[95%] mx-auto 
          flex flex-col md:flex-row items-center justify-center 
          px-6 md:px-12 py-10"
        >
          <LeftCol />
          <RightCol />
        </section>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <defs>
          <filter
            id="glass-distortion"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.006 0.006"
              numOctaves="2"
              seed="92"
              result="noise"
            />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="blurred"
              scale="99"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
