'use client';
import BarChart from "@/components/Graphs/BarChart";
import BarGraph from "@/components/Graphs/BarGraph";
import * as d3 from "d3";
import { useEffect, useState } from "react";


interface CSVRow {
    yearID: string; //number;
    playerID: string;
    SO: string; //number;
    nameFirst: string;
    nameLast: string;
    fullName: string;

}


export default function ArticlePage() {
    const [data, setData] = useState<number[]>([]);
    const [barLabels, setBarLabels] = useState<string[]>([]);
    const [xLabels, setXLabels] = useState<string[]>([]);

    useEffect(() => {
        d3.csv("/data/highest_so_per_season.csv", (row: d3.DSVRowString): CSVRow => ({
            yearID: row.yearID,
            playerID: row.playerID,
            SO: row.SO,
            nameFirst: row.NameFirst,
            nameLast: row.NameLast,
            fullName: row.fullName,
        })).then((csvData: CSVRow[]) => {
            const numbers = csvData.map(row => Number(row.SO));
            const xLabels = csvData.map(row => row.yearID);
            const playerLabels = csvData.map(row => 
                row.fullName 
                + " - " 
                + row.SO.replace(".0", "") );

            setData(numbers);
            setBarLabels(playerLabels);
            setXLabels(xLabels);
        });
    }, []);

    return (
        <div className="font-sans flex flex-col min-h-screen">
            <main className="flex-grow px-6 sm:px-20 py-8 max-w-3xl mx-auto">
                <article className="prose prose-lg max-w-none">
                    <h1 className="text-4xl font-bold mb-4">
                        Strikeouts - Baseballs Chase for Ineptitude
                    </h1>
                    <p className="">By: Cole</p>
                    <p className="mb-8">Published on October 20, 2025</p>

                    <p>
                        1871 - Rynie Wolters
                    </p>

                    <h2>Subheading Example</h2>
                    <p>
                        You can use subheadings to break up sections of your article. The layout
                        supports Markdown-style content or rich JSX if you prefer.
                    </p>

                    <ul>
                        <li>Bullet point 1</li>
                        <li>Bullet point 2</li>
                        <li>Bullet point 3</li>
                    </ul>

                    <p>
                        Wrap it up with a conclusion or final thought — and that’s your article!
                    </p>

                    {/* <BarChart data={[10,20,30,40,50]}/> */}
                    {data.length !== 0 
                    && <div className="overflow-x-auto">
                            <BarGraph
                                data={data}
                                barLabels={barLabels}
                                barLabelRotation={-90} // 0 or +/-90
                                // width={640}
                                width={Math.max(640, data.length * 20)} //dynamic width
                                height={500}
                                marginLeft={35}
                                marginBottom={100}
                                xLabels={xLabels}
                                rotateLabels={45}
                            />
                        </div>
                    }
                    {/* <BarGraph data={myData}/> */}
                    

                    
                </article>
            </main>

        </div>
    );
}
