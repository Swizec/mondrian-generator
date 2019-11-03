import React, { useState, useMemo } from "react";
import * as d3 from "d3";

import "./App.css";
import Mondrian from "./Mondrian";

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

// Create weighted probability distribution to pick a random color for a square
const createColor = ({ redRatio, blueRatio, yellowRatio, blackRatio }) => {
    const probabilitySpace = [
        ...new Array(redRatio * 10).fill("red"),
        ...new Array(blueRatio * 10).fill("blue"),
        ...new Array(yellowRatio * 10).fill("yellow"),
        ...new Array(blackRatio * 10).fill("black"),
        ...new Array(
            redRatio * 10 + blueRatio * 10 + yellowRatio * 10 + blackRatio * 10
        ).fill("#fffaf1")
    ];

    return d3.shuffle(probabilitySpace)[0];
};

function App() {
    const [redRatio, setRedRatio] = useState(0.3);
    const [yellowRatio, setYellowRatio] = useState(0.3);
    const [blueRatio, setBlueRatio] = useState(0.3);
    const [blackRatio, setBlackRatio] = useState(0.3);

    let mondrian = useMemo(() => {
        const generateMondrian = ({ value, depth = 0 }) => {
            const N = Math.round(Math.random() * 7);

            return {
                value,
                color: createColor({
                    redRatio,
                    yellowRatio,
                    blueRatio,
                    blackRatio
                }),
                children:
                    depth < 2
                        ? d3.range(N).map(_ =>
                              generateMondrian({
                                  value: value / N,
                                  depth: depth + 1
                              })
                          )
                        : null
            };
        };

        return generateMondrian({ value: 100 });
    }, []);

    // Recalculate node colors on every render
    const updateColors = node => ({
        ...node,
        color: createColor({
            redRatio,
            yellowRatio,
            blueRatio,
            blackRatio
        }),
        children: node.children ? node.children.map(updateColors) : null
    });

    mondrian = updateColors(mondrian);

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
                </div>
            </header>
            <svg width="100%" height="100%">
                <Mondrian
                    x={100}
                    y={10}
                    width={600}
                    height={400}
                    data={mondrian}
                />
            </svg>
        </div>
    );
}

export default App;
