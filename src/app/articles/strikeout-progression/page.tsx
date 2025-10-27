'use client';
import BarGraph from "@/components/Graphs/BarGraph";
import LinePlot from "@/components/Graphs/Lineplot";
import MultiLinePlot from "@/components/Graphs/MultiLineplot";
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

interface CSVRow2 {
    yearID: string; //number;
    playerID: string;
    SO: string; //number;
}


export default function ArticlePage() {
    const [data, setData] = useState<number[]>([]);
    const [barLabels, setBarLabels] = useState<string[]>([]);
    const [xLabels, setXLabels] = useState<string[]>([]);

    //graph 2 potentially be its own component
    const [data2, setData2] = useState<number[]>([]);
    const [barLabels2, setBarLabels2] = useState<string[]>([]);
    const [xLabels2, setXLabels2] = useState<string[]>([]);

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

    //Graph 2
    useEffect(() => {
        d3.csv("/data/highest_so_per_season_record.csv", (row: d3.DSVRowString): CSVRow2 => ({
            yearID: row.yearID,
            playerID: row.playerID,
            SO: row.SO,
        })).then((csvData: CSVRow2[]) => {
            const numbers = csvData.map(row => Number(row.SO));
            const xLabels = csvData.map(row => row.yearID);
            const playerLabels = csvData.map(row => 
                row.playerID 
                + " - " 
                + row.SO.replace(".0", "") );

            setData2(numbers);
            setBarLabels2(playerLabels);
            setXLabels2(xLabels);
        });
    }, []);
    return (<></>); // to hide all the data until published
    return (
        <div className="font-sans flex flex-col min-h-screen">
            <main className="flex-grow px-6 sm:px-20 py-8 max-w-3xl mx-auto">
                <article className="prose prose-lg max-w-none ">
                    {/* text-gray-200/300/400 */}
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">
                        Strikeouts - Baseballs Chase for Ineptitude
                    </h1>
                    <p className="">By: ProbablyBaseball</p>
                    <p className="mb-8">Published on October 20, 2025</p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-3">
                            Introduction - The Strikeout King
                        </h2>
                        <p className="text-lg leading-relaxed">
                            The year is 1871. The player, Reinder &quot;Rynie&quot; Albertus Wolters, a 27 year-old Dutch standout
                            pitching for the New York Mutuals. That year Rynie would go on to lead the league in games started,
                            complete games, innings pitched, and tie for first in shutouts with 1. On the offensive side he would lead the league
                            in RBI&apos;s with 44, while slashing a .370/.412/.543, good enough for an OPS/OPS+ of .956/182. He would also go on
                            to strikeout 8 times, leading the league in that category on a team that would only strikeout 15 times in 33 games. This
                            feat would set the stage for baseballs biggest, glorious and most prestigous title, The strikeout king.
                        </p>
                    </section>
                     <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-2">
                            Chapter 1 - The Pre Modern Era
                        </h2>
                        <p className="text-sm italic text-gray-200 mb-6 ml-6">
                            - The league pre 1900&apos;s
                        </p>
                        <p className="text-lg leading-relaxed mb-6">
                            The game as we know it, was not the same game the Rynie use to play. Before the start of the modern era, a walk would
                            require as many as 8 balls, foul balls would not be considered strikes, balls would have to be pitched underhand,
                            not thrown overhand like the missile throwing chuckers of today, outs could be caught off the bounce, and many different oddities
                            which could make for an article of their own can be read
                            about <a className=" text-blue-300 hover:text-blue-500" href="https://www.baseball-almanac.com/rule11.shtml">here</a>.
                            Beyond that will be left as an exercise to the reader, but knowing that it is still, 1, 2, 3 strikes you are out,
                            is all that we really need to know about for now.
                        </p>
                        <p className="text-lg leading-relaxed  mb-6">
                            Although it was a wild-wild west of a game, and not the near, uniform game of professionalism we have today,
                            we can quickly see and point out some of the strikeout kings to hold the record as baseballs best swing and missers.
                            Some players of note to hold the record of strikeout king include:
                        </p>
                        <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                            <li>Candy Cummings,  a Pitcher/Outfielder for numerous teams, who would hold the record from 1872-1874 at 14.</li>
                            <li>Herman Dehlman - A first basemen and the first non-hitter on this list.</li>
                            <li>Lew Brown - a Catcher, who would be the first hitter to break the 30 strikeout barrier.</li>
                            <li>Will White - A Pitcher, primarily for the Cincinatti team who would be the first to break the 40 strikeout barrier.</li>
                            <li>Pud Galvin - A Pitching Hall of Famer who would break the record in 1879, and break it 3 more times, while holding if for 5 years</li>
                        </ul>

                        <p className="text-lg leading-relaxed mb-6">
                            Finally we round out the era with Sam Wise - a middle infielder from Akron, who would set the record for most strikeouts in 1884,
                            by striking out 104 times in 451 plate appears being the first player to break the 100 barrier. He would continue to hold the record of
                            strikeout king for the remainder of the pre modern era, as well as hold that record for a few years into the modern era as well. Holding 
                            it for 20 seasons, as well as being the only person to strikeout 100 times until it would be broken again, no one could really hold a light
                            to Sam Wise until the turn of the century. He truly was one of a kind, and a modern day gladiator with the stick.
                        </p>
                        {/* Bar graphs for PreModern Era */}
                        {data.length !== 0 
                        && <div className="overflow-x-auto">
                                <BarGraph
                                    data={data.slice(0,30)}
                                    barLabels={barLabels.slice(0,30)}
                                    barLabelRotation={-90} // 0 or +/-90
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={xLabels.slice(0,30)}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            </div>
                        }
                        {data.length !== 0 
                        && <div className="overflow-x-auto">
                                <BarGraph
                                    data={data2.slice(0,30)}
                                    barLabels={barLabels2.slice(0,30)}
                                    barLabelRotation={-90} // 0 or +/-90
                                    // width={640}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={xLabels2.slice(0,30)}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            </div>
                        }
                    </section>
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-3">
                            Chapter 2 - The Modern Era
                        </h2>
                        <p className="text-lg leading-relaxed">
                        </p>
                        <p className="text-lg leading-relaxed">
                        </p>
                    </section>
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-3">
                        </h2>
                        <p className="text-lg leading-relaxed">
                        </p>
                        <p className="text-lg leading-relaxed">
                        </p>
                    </section>

                    

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
                                // xLabelColor="black"
                                rotateLabels={45}
                            />
                        </div>
                    }
                    {/* <BarGraph data={myData}/> */}

                    {/* Line Plot */}
                    {data.length !== 0
                    &&
                        <div className="overflow-x-auto">
                            <LinePlot
                                data={data}
                                dataLabels={barLabels}
                                dataLabelRotation={-90}
                                width={Math.max(640, data.length * 20)} //dynamic width
                                // dataPointCircles={false}
                                marginLeft={35}
                                xLabels={xLabels}
                                xLabelTickSteps={1}
                                rotateLabels={45}
                                marginBottom={35}
                                
                            />
                        </div>
                    }

                    {/* MultiLine Plot */}
                    {data.length !== 0
                    &&
                        <div className="overflow-x-auto">
                            <MultiLinePlot
                                data={[data, data2]}
                                showDataLabels={false}
                                // dataLabels={[barLabels]}
                                dataLabelRotation={-90}
                                width={Math.max(640, data.length * 20)} //dynamic width
                                dataPointCircles={false}
                                marginLeft={35}
                                lineColors={["white", "red"]}
                                xLabels={xLabels}
                                xLabelTickSteps={1}
                                rotateLabels={45}
                                marginBottom={35}
                                
                            />
                        </div>
                    }

                    {/* Graph 2 */}
                    {data.length !== 0 
                    && <div className="overflow-x-auto">
                            <BarGraph
                                data={data2}
                                barLabels={barLabels2}
                                barLabelRotation={-90} // 0 or +/-90
                                // width={640}
                                width={Math.max(640, data.length * 20)} //dynamic width
                                height={500}
                                marginLeft={35}
                                marginBottom={100}
                                xLabels={xLabels2}
                                // xLabelColor="black"
                                rotateLabels={45}
                            />
                        </div>
                    }
                    

                    
                </article>
            </main>

        </div>
    );
}
