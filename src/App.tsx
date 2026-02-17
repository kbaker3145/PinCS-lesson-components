import React from "react";

import HaberReactor from "./components/HaberReactor.jsx";

/**
 * Registry of all testable components.
 * To add a new component:
 *   1. Create a .tsx file in src/components/
 *   2. Import it above
 *   3. Add an entry here
 */
const components: Record<string, { label: string; element: React.ReactNode }> = {
  "haber-reactor": {
    label: "Haber Reactor (Limiting Reactant)",
    element: <HaberReactor />,
  },
  // Add more here as you build them, e.g.:
  // "boyle-gas-law": {
  //   label: "Boyle's Gas Law",
  //   element: <BoyleGasLaw />,
  // },
};

function App() {
  const [active, setActive] = React.useState<string | null>(() => {
    const hash = window.location.hash.slice(1);
    return hash in components ? hash : null;
  });

  React.useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1);
      setActive(hash in components ? hash : null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (key: string | null) => {
    window.location.hash = key ?? "";
    setActive(key);
  };

  if (active && components[active]) {
    return (
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <button
          onClick={() => navigate(null)}
          style={{
            marginBottom: "16px",
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Back to list
        </button>
        <h2 style={{ marginBottom: "16px" }}>{components[active].label}</h2>
        {components[active].element}
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "600px" }}>
      <h1 style={{ marginBottom: "8px" }}>KB Lesson Components</h1>
      <p style={{ color: "#666", marginBottom: "24px" }}>
        Select a component to preview:
      </p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Object.entries(components).map(([key, { label }]) => (
          <li key={key} style={{ marginBottom: "10px" }}>
            <button
              onClick={() => navigate(key)}
              style={{
                padding: "10px 18px",
                fontSize: "16px",
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: "6px",
                backgroundColor: "#f9f9f9",
                width: "100%",
                textAlign: "left" as const,
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
