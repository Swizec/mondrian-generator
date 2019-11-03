import React from "react";
import "./App.css";
import Mondrian from "./Mondrian";

function App() {
    return (
        <div className="App">
            <header>
                <h1>Piet Mondrian generator</h1>
                <p>Tweak the params, see what happens. 👩‍🎤</p>
            </header>
            <svg width="100%" height="100%">
                <Mondrian x={100} y={10} width={600} height={400} />
            </svg>
        </div>
    );
}

export default App;
