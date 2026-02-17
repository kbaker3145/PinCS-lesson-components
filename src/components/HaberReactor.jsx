import React from "react";

function HaberReactor() {

  // Colors
  const H2_COLOR = "#d4a017";
  const H2_BG = "#fdf6e3";
  const N2_COLOR = "#2563eb";
  const N2_BG = "#eff6ff";


  // Sub-components
  function H2Label({ children }) {
    return (
      <span
        style={{
          color: H2_COLOR,
          backgroundColor: H2_BG,
          padding: "1px 5px",
          borderRadius: "4px",
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    );
  }

  function N2Label({ children }) {
    return (
      <span
        style={{
          color: N2_COLOR,
          backgroundColor: N2_BG,
          padding: "1px 5px",
          borderRadius: "4px",
          fontWeight: 600,
        }}
      >
        {children}
      </span>
    );
  }


  // Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      lineHeight: 1.6,
    },

    controlSection: {
      textAlign: "center",
      minWidth: "260px",
    },

    sliderH2: {
      width: "220px",
      marginTop: "6px",
      accentColor: H2_COLOR,
    },

    sliderN2: {
      width: "220px",
      marginTop: "6px",
      accentColor: N2_COLOR,
    },

    outputSection: {
      maxWidth: "360px",
      fontSize: "15px",
    },

    card: {
      marginTop: "15px",
      padding: "12px 16px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: "#f8f8f8",
    },

    value: {
      fontWeight: "bold",
    },
  };


  // State
  const [h2, setH2] = React.useState(6);
  const [n2, setN2] = React.useState(4);


  // Chemistry
  const nh3FromN2 = n2 * 2;
  const nh3FromH2 = h2 * (2 / 3);

  let nh3Made = 0;
  let limiting = "None";

  if (nh3FromN2 < nh3FromH2) {
    nh3Made = nh3FromN2;
    limiting = "N₂";
  } else if (nh3FromH2 < nh3FromN2) {
    nh3Made = nh3FromH2;
    limiting = "H₂";
  } else {
    nh3Made = nh3FromN2;
    limiting = "None";
  }

  const n2Used = nh3Made / 2;
  const h2Used = (nh3Made * 3) / 2;

  const n2Left = Math.max(0, n2 - n2Used);
  const h2Left = Math.max(0, h2 - h2Used);


  const limitingStyle =
    limiting === "H₂"
      ? {
          color: H2_COLOR,
          backgroundColor: H2_BG,
          padding: "1px 5px",
          borderRadius: "4px",
        }
      : limiting === "N₂"
      ? {
          color: N2_COLOR,
          backgroundColor: N2_BG,
          padding: "1px 5px",
          borderRadius: "4px",
        }
      : {};


  // Render
  return (
    <div style={styles.container}>

      <div style={styles.controlSection}>
        <h2><strong>Reaction Equation:</strong></h2>
        <p>N₂ + 3H₂ → 2NH₃</p>
        <br />

        <h3><strong>Reactant Controls:</strong></h3>

        <p>
          <H2Label>H₂</H2Label>: {h2.toFixed(1)} mol
        </p>

        <input
          type="range"
          min="0"
          max="20"
          step="0.5"
          value={h2}
          onChange={(e) => setH2(Number(e.target.value))}
          style={styles.sliderH2}
        />

        <p>
          <N2Label>N₂</N2Label>: {n2.toFixed(1)} mol
        </p>

        <input
          type="range"
          min="0"
          max="20"
          step="0.5"
          value={n2}
          onChange={(e) => setN2(Number(e.target.value))}
          style={styles.sliderN2}
        />
      </div>


      <div style={styles.outputSection}>
        <h2><strong>Reaction Output</strong></h2>

        <div style={styles.card}>
          <p><strong>NH₃ Produced:</strong> {nh3Made.toFixed(2)} mol</p>

          <p>
            <strong>Limiting Reactant:{" "}</strong>
            <span style={{ ...styles.value, ...limitingStyle }}>
              {limiting}
            </span>
          </p>
        </div>

        <div style={styles.card}>
          <h4><strong>Leftovers</strong></h4>

          <p>
            <H2Label>H₂</H2Label>: {h2Left.toFixed(2)} mol
          </p>

          <p>
            <N2Label>N₂</N2Label>: {n2Left.toFixed(2)} mol
          </p>
        </div>

        <p>
          Increase <H2Label>H₂</H2Label> and observe when{" "}
          <N2Label>N₂</N2Label> becomes limiting.
        </p>
      </div>

    </div>
  );
}


export default HaberReactor;
