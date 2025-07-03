// ParticlesBackground.jsx
import { useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const ParticlesBackground = () => {
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    if (window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS(); // remove previous particles
      window.pJSDom = [];
    }

    window.particlesJS("particles-js", {
      particles: {
        number: {
          value: 60,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: dark ? "#ffffff" : "#000000", // 🔁 Dynamic color
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.15,
        },
        size: {
          value: 3,
        },
        line_linked: {
          enable: true,
          distance: 120,
          color: dark ? "#ffffff" : "#000000",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.2,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      retina_detect: true,
    });
  }, [dark]); // 🔁 Re-run effect on theme toggle

  return (
    <div
      id="particles-js"
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    ></div>
  );
};

export default ParticlesBackground;
