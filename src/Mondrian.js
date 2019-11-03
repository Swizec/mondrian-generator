import React from "react";
import * as d3 from "d3";
import { hierarchy } from "d3-hierarchy";

const data = {
    value: 1,
    children: [
        { value: 1 },
        {
            value: 1,
            children: [{ value: 1 }, { value: 1 }]
        },
        {
            value: 1,
            children: [
                { value: 1 },
                { value: 1 },
                {
                    value: 1,
                    children: [{ value: 1 }, { value: 1 }]
                }
            ]
        }
    ]
};

const MondrianRectangle = ({ node }) => {
    const { x0, y0, x1, y1, children } = node,
        width = x1 - x0,
        height = y1 - y0;

    const color = () => {
        const ratio = width > height ? height / width : width / height;
        if (!node.parent) {
            // Root node is black
            return "black";
        } else if (ratio >= 0.9) {
            return "red";
        } else if (ratio >= 0.7) {
            return "blue";
        } else if (ratio >= 0.5) {
            return "yellow";
        } else {
            // default is off white
            return "#fffaf1";
        }
    };

    return (
        <>
            <rect
                x={x0}
                y={y0}
                width={width}
                height={height}
                style={{
                    fill: color(),
                    stroke: "black"
                }}
            />
            {children &&
                children.map((node, i) => (
                    <MondrianRectangle node={node} key={i} />
                ))}
        </>
    );
};

const Mondrian = ({ x, y, width, height }) => {
    const treemap = d3
        .treemap()
        .size([width, height])
        .padding(10)
        .tile(d3.treemapBinary);

    const root = treemap(
        hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.height - a.height || b.value - a.value)
    );

    return (
        <g transform={`translate(${x}, ${y})`}>
            <MondrianRectangle node={root} />
        </g>
    );
};

export default Mondrian;
