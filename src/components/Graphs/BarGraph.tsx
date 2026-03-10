'use client';
import * as d3 from "d3";
import { JSX, useId } from "react";
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
    alt?: string;
    desc?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export default function BarGraph({
    data,
    barLabels = [],
    barLabelRotation = 0,
    barLabelFontSize = 10,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    barLabelColor = 'white',
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
    barColor = "steelblue",
    xLabels = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    xLabelColor = "white",
    rotateLabels = 0,
    alt="Bar Graph",
    desc="A Bar Graph",
    xAxisLabel="",
    yAxisLabel="",
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

    const titleId = useId();

    return (
        <div className="relative group">
            <svg 
                width={width}
                height={height}
                role="img"
                aria-labelledby={titleId}
            >
                <title id={titleId}>
                    {alt}
                </title>
                <desc>
                    {desc}
                </desc>
                {/* Bars */}
                <g fill={barColor}>
                    {data.map((d, i) => (
                        <rect
                            key={i}
                            x={x(i)}
                            y={y(d)}
                            width={x.bandwidth()}
                            height={y(0) - y(d)}
                            // className="fill-2"
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
                        // const fillColor = textAboveGraph ? "white" : (barLabelColor ?? "black");
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
                                className="fill-current stroke-none"
                                // fill={fillColor}
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

                        // axisSelection.selectAll("text").attr("fill", xLabelColor)
                        axisSelection.selectAll("text").classed("fill-1", true)
                        axisSelection.selectAll("path, line").classed("line-1", true)

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
                {/* X-Axis Label */}
                {xAxisLabel &&
                <text
                    x={(width - marginLeft - marginRight) / 2 + marginLeft}
                    y={height - 5} // Adjust this based on your marginBottom
                    textAnchor="middle"
                    fontSize={14}
                    className="fill-current font-medium"
                    aria-hidden="true"
                >
                    {xAxisLabel}
                </text>
                }

                {/* Y-Axis Label */}
                {yAxisLabel &&
                <text
                    transform={`rotate(-90)`}
                    x={-(height - marginTop - marginBottom) / 2 - marginTop}
                    y={marginLeft / 4} // Positions it to the left of the Y-axis ticks
                    textAnchor="middle"
                    fontSize={14}
                    className="fill-current font-medium"
                    aria-hidden="true"
                >
                    {yAxisLabel}
                </text>
                }
            </svg>
            {/* Screen Reader Table: Hidden from sight, visible to search engines and assistive tech */}
            <div className="sr-only">
                <table className="sr-only">
                    <caption>{alt}</caption>
                    <thead>
                        <tr>
                            <th scope="col">{xAxisLabel || "Year"}</th>
                            <th scope="col">{yAxisLabel || "Value"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((d, i) => (
                            <tr key={i}>
                                <td>{xLabels[i] || i}</td>
                                <td>{d}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}




