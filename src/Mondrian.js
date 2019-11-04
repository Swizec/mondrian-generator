import React from "react";
import * as d3 from "d3";
import { hierarchy } from "d3-hierarchy";

const MondrianRectangle = ({ node }) => {
    const { x0, y0, x1, y1, children } = node,
        width = x1 - x0,
        height = y1 - y0;

    return (
        <>
            <rect
                x={x0}
                y={y0}
                width={width}
                height={height}
                style={{
                    fill: node.data.color,
                    stroke: "black",
                    strokeWidth: 5
                }}
                onClick={() => alert(`This node is ${node.data.color}`)}
            />
            {children &&
                children.map((node, i) => (
                    <MondrianRectangle node={node} key={i} />
                ))}
        </>
    );
};

const Mondrian = ({ x, y, width, height, data }) => {
    const treemap = d3
        .treemap()
        .size([width, height])
        .padding(5)
        .tile(d3.treemapBinary);

    const root = treemap(
        hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => 0.5 - Math.random())
    );

    return (
        <g transform={`translate(${x}, ${y})`}>
            <MondrianRectangle node={root} />
        </g>
    );
};

export default Mondrian;
