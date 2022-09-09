import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Component, useCallback } from "react";

export const BackgroundParticl =  {
    background: {
      color: {
          value: "#ff7070",
      },
  },
  fpsLimit: 120,
  interactivity: {
      events: {
          onClick: {
              enable: true,
              mode: "push",
          },
          onHover: {
              enable: true,
              mode: "repulse",
          },
          resize: true,
      },
      modes: {
          push: {
              quantity: 4,
          },
          repulse: {
              distance: 200,
              duration: 0.4,
          },
      },
  },
  particles: {
      color: {
          value: "#99004d",
      },
      links: {
          color: "#cc0066",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
      },
      collisions: {
          enable: true,
      },
      move: {
          directions: "none",
          enable: true,
          outModes: {
              default: "bounce",
          },
          random: false,
          speed: 1,
          straight: true,
      },
      number: {
          density: {
              enable: true,
              area: 800,
          },
          value: 80,
      },
      opacity: {
          value: 0.5,
      },
      shape: {
          type: "triangle",
      },
      size: {
          value: { min: 1, max: 4 },
      },
  },
  detectRetina: true,
  };


// export const particlesInit = async (engine) => {
//     console.log(engine);
//     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
//     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//     // starting from v2 you can add only the features you need reducing the bundle size
  
//     await loadFull(engine);
//   };
  
// export const particlesLoaded = async (container) => {
//     await console.log(container);
//   };