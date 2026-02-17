function HaberReactor() {
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
  
      slider: {
        width: "220px",
        marginTop: "6px",
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
  
    // State: moles of reactants
    const [h2, setH2] = React.useState(6);
    const [n2, setN2] = React.useState(4);
  
    /*
      Reaction:
      N2 + 3H2 → 2NH3
  
      From ratios:
      N2 → 2 NH3
      H2 → (2/3) NH3
    */
  
    const nh3FromN2 = n2 * 2;
    const nh3FromH2 = h2 * (2 / 3);
  
    // Determine limiting reactant
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
  
    // Calculate leftovers
    const n2Used = nh3Made / 2;
    const h2Used = (nh3Made * 3) / 2;
  
    const n2Left = Math.max(0, n2 - n2Used);
    const h2Left = Math.max(0, h2 - h2Used);
  
    return (
      <div style={styles.container}>
        {/* Controls */}
        <div style={styles.controlSection}>
          <h3>Reactant Controls</h3>
  
          <p>
            H₂ (mol): <strong>{h2.toFixed(1)}</strong>
          </p>
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={h2}
            onChange={(e) => setH2(Number(e.target.value))}
            style={styles.slider}
          />
  
          <p>
            N₂ (mol): <strong>{n2.toFixed(1)}</strong>
          </p>
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={n2}
            onChange={(e) => setN2(Number(e.target.value))}
            style={styles.slider}
          />
        </div>
  
        {/* Output */}
        <div style={styles.outputSection}>
          <h3>Reaction Output</h3>
  
          <div style={styles.card}>
            <p>
              NH₃ Produced:{" "}
              <span style={styles.value}>{nh3Made.toFixed(2)} mol</span>
            </p>
  
            <p>
              Limiting Reactant:{" "}
              <span style={styles.value}>{limiting}</span>
            </p>
          </div>
  
          <div style={styles.card}>
            <h4>Leftovers</h4>
  
            <p>
              H₂ Remaining:{" "}
              <span style={styles.value}>{h2Left.toFixed(2)} mol</span>
            </p>
  
            <p>
              N₂ Remaining:{" "}
              <span style={styles.value}>{n2Left.toFixed(2)} mol</span>
            </p>
          </div>
  
          <p>
            Try increasing only H₂. Notice that NH₃ increases at first, then
            stops when nitrogen becomes limiting.
          </p>
        </div>
      </div>
    );
  }
  