import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        fpsLimit: 60,
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: ['#681296', '#4e0c71', '#1ab7ff', '#9b5de5', '#ff2bd6'],
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.35,
            random: true,
            anim: {
              enable: true,
              speed: 0.4,
              opacity_min: 0.15,
              sync: false,
            },
          },
          size: {
            value: 3.5,
            random: true,
            anim: {
              enable: true,
              speed: 1.8,
              size_min: 0.5,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 180,
            color: '#9b5de5',
            opacity: 0.25,
            width: 1.2,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'grab',
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 0.5,
              },
            },
            push: {
              particles_nb: 3,
            },
          },
        },
        retina_detect: true,
        background: {
          color: 'transparent',
          image: '',
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover',
        },
      }}
    />
  );
};

export default ParticleBackground;