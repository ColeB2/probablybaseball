"use client";
import * as d3 from "d3";
import { JSX } from "react";
import { DataLabelRotationAngle, Margins, RotationAngle } from "./types";
import { flipAnchor } from "./helper";



interface MultiLinePlotProps extends Margins {
    data: number[][];
    showDataLabels?: boolean;
    dataLabels?: string[][];
    dataLabelRotation?: DataLabelRotationAngle;
    dataLabelFontSize?: number;
    dataLabelColor?: string;
    width?: number;
    height?: number;
    lineColors?: string[];
    dataPointCircles?: boolean;
    xLabels?: string[];
    xLabelTickSteps?: number;
    xLabelColor?: string;
    rotateLabels?: RotationAngle;
    alt?: string;
    desc?: string;
    xAxisLabel?: string;
    yAxisLabel?: string;
}

export default function MultiLinePlot({
    data,
    showDataLabels = true,
    dataLabels = [[]],
    dataLabelRotation = 0,
    dataLabelFontSize = 10,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dataLabelColor = 'white',
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    lineColors = ["white"],
    dataPointCircles = true,
    xLabels = [],
    xLabelTickSteps = 1, // defaults to every year
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    xLabelColor = "white",
    rotateLabels = 0,
    alt="Line Plot",
    desc="A Line Plot",
    xAxisLabel="",
    yAxisLabel="",
}: MultiLinePlotProps): JSX.Element {
    const padding = 0;
    // domain -1, to give space off the y axis/x=0
    const x = d3
        .scaleLinear<number>()
        .domain([-1, data[0].length - 1])
        .range([marginLeft + padding, width - marginRight - padding]);

    // const extent = d3.extent(data) as [number, number]; // we know data isn't empty
    // data[0] --> first supplied data as to handle scaling
    const maxValue = d3.max(data.flat()) ?? 0;
    const y = d3
        .scaleLinear()
        .domain([0, maxValue])
        .nice()
        .range([height - marginBottom, marginTop]);

    //  Correct line generator type
    const line = d3
        .line<number>()
        .x((_, i) => x(i))
        .y((d) => y(d))

    return (
        <div className="relative group">
            <svg 
                width={width}
                height={height}
                role="img"
                aria-labelledby={`title-${alt.replace(/\s+/g, '-').toLowerCase()}`}
            >
                <title id={`title-${alt.replace(/\s+/g, '-').toLowerCase()}`}>
                    {alt}
                </title>
                <desc>
                    {desc}
                </desc>
                {/* Line connecting all data points */}
                <g>
                    {data.map((series, i) => (
                        <path
                            className={i == 0 ? "line-1" : "line-5"}
                            key={i}
                            fill="none"
                            // stroke={lineColors[i] ?? "white"}
                            strokeWidth={1.0}
                            d={line(series) ?? ""}
                        />
                    ))}
                </g>

                

                {/* Circles on the data points 
                    - note circles done seemingly show? to do fix.
                */}
                {dataPointCircles && (
                    <g 
                        className="fill-1"
                        strokeWidth={1.5}
                        role="group" 
                        aria-label="Individual data points"
                    >
                        {data.map((series, si) =>
                            series.map((d, i) => (
                                <circle key={`${si}-${i}`} cx={x(i)} cy={y(d)} r={2.5} />
                            ))
                        )}
                    </g>
                )}

                {/* Labels -> number values from data */}
                {/* also need to add ability to turn off values. */}
                { showDataLabels && (
                    <g className="bar-labels">
                        {data.map((series, si) =>
                            series.map((d,i) => {
                                if (dataLabels.length === 0) {return;}
                                // const labelText = dataLabels ? dataLabels[i] ?? d : d
                                const labelText = dataLabels?.[si]?.[i] ?? d.toString();
                                const textWidth = (dataLabelFontSize ?? 10) * 0.6 * String(labelText).length
                                // const xPos = x(i)! + x.bandwidth() / 2;
                                const xPos = x(i);
                                const baseY = y(d);
                                const offset = 5; // base gap between bar and label
                                // const barHeight = y(0) - y(d)
                                const rotation = dataLabelRotation ?? 0;
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
                                // const fillColor = textAboveGraph ? "white" : (dataLabelColor ?? "black");
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
                                        fontSize={dataLabelFontSize ?? 10}
                                        className="fill-current stroke-none"
                                        // fill={fillColor}
                                    >
                                        {labelText}
                                    </text>
                                );
                            })
                        )}
                    </g>
                )}

                {/* X-axis with optional labels */}
                <g
                    transform={`translate(0,${height - marginBottom})`}
                    ref={(node) => {
                        if (!node) return;


                        // Display all x values
                        //mapping years with data[0] data
                        const years = data[0].map((_,i) => i)
                        const step = xLabelTickSteps;
                        const tickIndices = years.filter((_, i) => i % step === 0);

                        const axis = d3.axisBottom(x)
                            .tickValues(tickIndices)        // <- force all years
                            .tickFormat((d: d3.NumberValue) => {
                                const i = Number(d);
                                return xLabels ? xLabels[i] ?? i.toString() : i.toString();
                            });



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
            {/* Screen Reader Table: Organized for multi-series data */}
            <div className="sr-only">
                <table className="sr-only">
                    <caption>{alt}: {desc}</caption>
                    <thead>
                        <tr>
                            <th scope="col">{xAxisLabel || "Year"}</th>
                            {data.map((_, i) => (
                                <th key={i} scope="col">Series {i + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* We assume all series have the same length based on xLabels */}
                        {xLabels.map((label, rowIndex) => (
                            <tr key={rowIndex}>
                                <td>{label}</td>
                                {data.map((series, seriesIndex) => (
                                    <td key={seriesIndex}>{series[rowIndex]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
