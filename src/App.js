import React, { useState, useMemo } from "react";
import * as d3 from "d3";

import "./App.css";
import Mondrian from "./Mondrian";
import useMondrianGenerator from "./useMondrianGenerator";

const Range = ({ name, value, onChange }) => {
    return (
        <div style={{ display: "inline-block" }}>
            {name}
            <br />
            <input
                type="range"
                name={name}
                min={0}
                max={1}
                step={0.1}
                value={value}
                onChange={event => onChange(Number(event.target.value))}
            />
        </div>
    );
};

function App() {
    const [redRatio, setRedRatio] = useState(0.2);
    const [yellowRatio, setYellowRatio] = useState(0.4);
    const [blueRatio, setBlueRatio] = useState(0.1);
    const [blackRatio, setBlackRatio] = useState(0.1);
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(400);
    const [subdivisions, setSubdivisions] = useState(0.5);
    const [maxDepth, setMaxDepth] = useState(0.4);

    let mondrian = useMondrianGenerator({
        redRatio,
        yellowRatio,
        blueRatio,
        blackRatio,
        subdivisions,
        maxDepth
    });

    return (
        <div className="App">
            <header>
                <h1>Piet Mondrian generator</h1>
                <p>Tweak the params, see what happens. 👩‍🎤</p>
                <div>
                    <Range name="red" value={redRatio} onChange={setRedRatio} />
                    <Range
                        name="yellow"
                        value={yellowRatio}
                        onChange={setYellowRatio}
                    />
                    <Range
                        name="blue"
                        value={blueRatio}
                        onChange={setBlueRatio}
                    />
                    <Range
                        name="black"
                        value={blackRatio}
                        onChange={setBlackRatio}
                    />
                    <Range
                        name="subdivisions"
                        value={subdivisions}
                        onChange={setSubdivisions}
                    />
                    <Range
                        name="maxDepth"
                        value={maxDepth}
                        onChange={setMaxDepth}
                    />
                </div>
                <div>
                    <label>Width: </label>
                    <input
                        type="number"
                        value={width}
                        onChange={event => setWidth(event.target.value)}
                    />
                    <label>Height: </label>
                    <input
                        type="number"
                        value={height}
                        onChange={event => setHeight(event.target.value)}
                    />
                </div>
            </header>
            <svg width={width} height="100%" style={{ margin: "0 auto" }}>
                <Mondrian
                    x={0}
                    y={20}
                    width={width}
                    height={height}
                    data={mondrian}
                />
            </svg>
        </div>
    );
}

export default App;
