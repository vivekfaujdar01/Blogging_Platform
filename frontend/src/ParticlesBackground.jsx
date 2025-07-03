import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: { color: { value: "transparent" } },
        particles: {
          number: {
            value: 60,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#5dade2" },
          shape: { type: "circle" },
          opacity: { value: 0.4, random: true },
          size: { value: { min: 1, max: 5 }, random: true },
          links: {
            enable: true,
            distance: 150,
            color: "#5dade2",
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            outModes: { default: "bounce" },
          },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: ["grab", "repulse"] },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            grab: { distance: 140, links: { opacity: 0.5 } },
            repulse: { distance: 100 },
            push: { quantity: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground;
