import { useMemo } from "react";
import * as d3 from "d3";

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

function useMondrianGenerator({
    redRatio,
    yellowRatio,
    blueRatio,
    blackRatio,
    subdivisions,
    maxDepth
}) {
    let mondrian = useMemo(() => {
        const generateMondrian = ({ value, depth = 0 }) => {
            const N = Math.round(
                1 + Math.random() * (subdivisions * 10 - depth)
            );

            return {
                value,
                color: createColor({
                    redRatio,
                    yellowRatio,
                    blueRatio,
                    blackRatio
                }),
                children:
                    depth < maxDepth * 5
                        ? d3.range(N).map(_ =>
                              generateMondrian({
                                  value: value / N,
                                  depth: depth + 1
                              })
                          )
                        : null
            };
        };

        return generateMondrian({
            value: 100
        });
    }, [subdivisions, maxDepth]);

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

    mondrian = useMemo(() => updateColors(mondrian), [
        redRatio,
        yellowRatio,
        blueRatio,
        blackRatio,
        subdivisions,
        maxDepth
    ]);

    return mondrian;
}

export default useMondrianGenerator;
