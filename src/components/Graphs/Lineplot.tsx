"use client";
import * as d3 from "d3";
import { JSX } from "react";
import { DataLabelRotationAngle, Margins, RotationAngle } from "./types";
import { flipAnchor } from "./helper";



interface LinePlotProps extends Margins {
    data: number[];
    showDataLabels?: boolean;
    dataLabels?: string[];
    dataLabelRotation?: DataLabelRotationAngle;
    dataLabelFontSize?: number;
    dataLabelColor?: string;
    width?: number;
    height?: number;
    lineColor?: string;
    dataPointCircles?: boolean;
    xLabels?: string[];
    xLabelTickSteps?: number;
    xLabelColor?: string;
    rotateLabels?: RotationAngle;
    minValue?: number;
    maxValue?: number;
}

export default function LinePlot({
    data,
    showDataLabels = true,
    dataLabels = [],
    dataLabelRotation = 0,
    dataLabelFontSize = 10,
    dataLabelColor = 'white',
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 20,
    marginLeft = 20,
    lineColor = "white",
    dataPointCircles = true,
    xLabels = [],
    xLabelTickSteps = 1, // defaults to every year
    xLabelColor = "white",
    rotateLabels = 0,
    minValue,
    maxValue, 
}: LinePlotProps): JSX.Element {
    const padding = 0;
    // domain -1, to give space off the y axis/x=0
    const x = d3
        .scaleLinear<number>()
        .domain([-1, data.length - 1])
        .range([marginLeft + padding, width - marginRight - padding]);

    // const extent = d3.extent(data) as [number, number]; // we know data isn't empty
    const minVal = minValue ?? d3.min(data) ?? 0;
    const maxVal = maxValue ?? d3.max(data) ?? 0;
    const y = d3
        .scaleLinear()
        .domain([minVal, maxVal])
        .nice()
        .range([height - marginBottom, marginTop]);

    //  Correct line generator type
    const line = d3
        .line<number>()
        .x((_, i) => x(i))
        .y((d) => y(d));

    return (
        <svg width={width} height={height}>
            {/* Line connecting all data points */}
            <path
                className="line-1"
                fill="none"
                // stroke={lineColor}
                strokeWidth={1}
                d={line(data) ?? ""}
            />

            {/* Circles on the data points */}
            {dataPointCircles
            &&  <g className="fill-1" strokeWidth={1.5}>
                    {data.map((d, i) => (
                        <circle key={i} cx={x(i)} cy={y(d)} r={2.5} />
                    ))}
                </g>
            }
            {/* Labels -> number values from data */}
            { showDataLabels && (
                <g>
                    {data.map((d, i) => {
                        const labelText = dataLabels ? dataLabels[i] ?? d : d
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
                            >
                                {labelText}
                            </text>
                        );
                    })}
                </g>
            )}

            {/* X-axis with optional labels */}
            <g
                transform={`translate(0,${height - marginBottom})`}
                // className="line-1"
                ref={(node) => {
                    if (!node) return;


                    // Display all x values
                    const years = data.map((_,i) => i)
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
                    // axisSelection.selectAll("text").attr("color", "color-line-1")
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
                // className="line-1"
                // className="line-1 fill-current stroke-none"
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
