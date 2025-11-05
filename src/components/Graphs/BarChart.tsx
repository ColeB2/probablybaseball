'use client';
import { JSX, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Margins {
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}

interface BarChartProps extends Margins {
    data: number[];
    width?: number;
    height?: number;
    barColor?: string;
}

export default function BarChart({
    data,
    width = 640,
    height = 400,
    marginTop = 20,
    marginRight = 20,
    marginBottom = 30,
    marginLeft = 40,
    // barColor = "steelblue",
}: BarChartProps): JSX.Element {
    const svgRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        // Create an SVG container
        const svg = d3.select(svgRef.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        // create tooltip before binding events so handlers can use it
        const tooltip = d3.select(svgRef.current)
            .append('div')
            .attr('class', 'tooltip')
            .style('visibility', 'hidden');

        //x/y scales
        const xScale = d3
            .scaleBand<string>()
            .domain(data.map((_, i) => i.toString()))
            .range([marginLeft, width - marginRight])
            .padding(0.1);
        
        const maxValue = d3.max(data) ?? 0;
        const yScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .nice()
            .range([height - marginBottom, marginTop]);

        // Add your chart elements here
        // Bind data to rectangles
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (_, i) => xScale(i.toString()) ?? 0)
            .attr('y', (d) => yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => height - yScale(d))
            .attr('class', 'bar')
            .on('mouseover', (event, d) => {
                // Show tooltip on hover
                tooltip.html(`Value: ${d}`)
                .style('visibility', 'visible')
                .style('top', `${event.pageY}px`)
                .style('left', `${event.pageX}px`);
            });

        // Add x-axis
        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(xScale as d3.ScaleBand<string>));

        // Add y-axis
        svg.append('g')
            .call(d3.axisLeft(yScale));
    }, [data, height, marginBottom, marginLeft, marginRight, marginTop, width]);

    return (
        <div>
            <h2>Bar Chart</h2>
            <div ref={svgRef}></div>
        </div>
    );
};