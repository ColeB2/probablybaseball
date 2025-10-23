"use client";
import * as d3 from "d3";
import { JSX } from "react";
import { Margins, RotationAngle } from "./types";



interface LinePlotProps extends Margins {
    data: number[];
    width?: number;
    height?: number;
    lineColor?: string;
    dataPointCircles?: boolean;
    xLabels?: string[];
    xLabelTickSteps?: number;
    xLabelColor?: string;
    rotateLabels?: RotationAngle;
}

export default function LinePlot({
    data,
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
}: LinePlotProps): JSX.Element {
    const x = d3
        .scaleLinear<number>()
        .domain([0, data.length - 1])
        .range([marginLeft, width - marginRight]);

    // const extent = d3.extent(data) as [number, number]; // we know data isn't empty
    const maxValue = d3.max(data) ?? 0;
    const y = d3
        .scaleLinear()
        .domain([0, maxValue])
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
                fill="none"
                stroke={lineColor}
                strokeWidth={1.0}
                d={line(data) ?? ""}
            />

            {/* Circles on the data points */}
            {dataPointCircles
            &&  <g fill="white" stroke="currentColor" strokeWidth={1.5}>
                    {data.map((d, i) => (
                        <circle key={i} cx={x(i)} cy={y(d)} r={2.5} />
                    ))}
                </g>
            }

            {/* X-axis with optional labels */}
            <g
                transform={`translate(0,${height - marginBottom})`}
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
