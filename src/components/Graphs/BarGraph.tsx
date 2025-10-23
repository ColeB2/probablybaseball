'use client';
import * as d3 from "d3";
import { JSX } from "react";
import { flipAnchor } from "./helper";
import { BarLabelRotationAngle, Margins, RotationAngle } from "./types";


interface BarGraphProps extends Margins {
    data: number[];
    barLabels?:  string[];
    barLabelRotation?: BarLabelRotationAngle;
    barLabelFontSize?: number;
    barLabelColor?: string;
    width?: number;
    height?: number;
    barColor?: string;
    xLabels?: string[];
    xLabelColor?: string;
    rotateLabels?: RotationAngle;
}

export default function BarGraph({
    data,
    barLabels = [],
    barLabelRotation = 0,
    barLabelFontSize = 10,
    barLabelColor = 'white',
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
    barColor = "steelblue",
    xLabels = [],
    xLabelColor = "white",
    rotateLabels = 0,
}: BarGraphProps): JSX.Element {
    // --- X scale (band for categories) ---
    const x = d3
        .scaleBand<number>()
        .domain(d3.range(data.length))
        .range([marginLeft, width - marginRight])
        .padding(0.1);

    // --- Y scale (linear for values) ---
    // const extent = d3.extent(data) as [number, number]; // we know data isn't empty
    const maxValue = d3.max(data) ?? 0;
    const y = d3
        .scaleLinear()
        .domain([0, maxValue])
        .nice()
        .range([height - marginBottom, marginTop]);

    return (
        <svg width={width} height={height}>
            {/* Bars */}
            <g fill={barColor}>
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={x(i)}
                        y={y(d)}
                        width={x.bandwidth()}
                        height={y(0) - y(d)}
                    />
                ))}
            </g>
            {/* Labels -> number values from data */}
            <g className="bar-labels">
                {data.map((d, i) => {
                    const labelText = barLabels ? barLabels[i] ?? d : d
                    const textWidth = (barLabelFontSize ?? 10) * 0.6 * String(labelText).length
                    const xPos = x(i)! + x.bandwidth() / 2;
                    const baseY = y(d);
                    const offset = 5; // base gap between bar and label
                    // const barHeight = y(0) - y(d)
                    const rotation = barLabelRotation ?? 0;
                    const settings: Record<number, { anchor: "start" | "middle" | "end"; dy: string }> = {
                        0: { anchor: "middle", dy: "-0.2em" },
                        90: { anchor: "end", dy: "0.35em" },
                        [-90]: { anchor: "start", dy: "0.35em" }
                    };
                    const { anchor, dy } = settings[rotation] ?? settings[0]

                    // Default placement (above bar)
                    const textY = baseY - offset;
                    // Change values for above text that goes above the graph
                    const textAboveGraph = textY < textWidth;
                    const yPos = textAboveGraph ? textY + 10 : textY
                    const fillColor = textAboveGraph ? "white" : (barLabelColor ?? "black");
                    const textAnchor = textAboveGraph ? flipAnchor(anchor) : anchor;

                    
                    return (
                        <text
                            key={i}
                            // x={xPos}
                            x={xPos}
                            y={yPos}
                            dy={dy}
                            transform={`rotate(${rotation}, ${xPos}, ${yPos})`}
                            textAnchor={textAnchor}
                            fontSize={barLabelFontSize ?? 10}
                            fill={fillColor}
                        >
                            {labelText}
                        </text>
                    );
                })}
            </g>
            
            {/* X-axis with optional labels */}
            <g
                transform={`translate(0,${height - marginBottom})`}
                ref={(node) => {
                    if (!node) return;

                    // Create base axis
                    const axis = d3.axisBottom<number>(x)
                    .tickFormat((i: number) =>
                        xLabels ? xLabels[i] ?? i.toString() : i.toString()
                    );

                    const axisSelection = d3.select(node).call(axis);

                    axisSelection.selectAll("text").attr("fill", xLabelColor)

                    // Optionally rotate labels if configured
                    const angle = rotateLabels ?? 0;
                    if (angle !== 0) {
                        const text = axisSelection.selectAll("text");
                        if (angle === -45 || angle === 45) {
                            text
                                .attr("transform", `rotate(${angle})`)
                                .attr("text-anchor", angle === -45 ? "end" : "start")
                                .attr("dx", angle === -45 ? "-0.6em" : "0.6em")
                                .attr("dy", "0.4em");
                        } 
                        else if (angle === -90 || angle === 90) {
                            text
                                .attr("transform", `rotate(${angle})`)
                                .attr("text-anchor", angle === -90 ? "end" : "start")
                                .attr("dx", angle === -90 ? "-1em" : "1em")
                                .attr("dy", "-0.7em");
                        } 
                        else {
                            // fallback for custom arbitrary angles
                            text
                                .attr("transform", `rotate(${angle})`)
                                .attr("text-anchor", "middle");
                        }
                    }
                }}
                />
            {/* X-axis */}
            {/* <g
                transform={`translate(0,${height - marginBottom})`}
                ref={(node) => {
                    if (node) {
                        const axis = d3.axisBottom<number>(x).tickFormat((i: number) => i.toString());
                        d3.select(node).call(axis);
                    }
                }}
            /> */}

            {/* Y-axis */}
            <g
                transform={`translate(${marginLeft},0)`}
                ref={(node) => {
                    if (node) {
                        const axis = d3.axisLeft<number>(y).ticks(5);
                        d3.select(node).call(axis);
                    }
                }}
            />
        </svg>
    );
}




