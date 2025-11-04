'use client';
import BarGraph from "@/components/Graphs/BarGraph";
import LinePlot from "@/components/Graphs/Lineplot";
import MultiLinePlot from "@/components/Graphs/MultiLineplot";
import GraphSlider from "@/components/GraphSlider/GraphSlider";
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

interface Daily2008 {
    name:string;
    [key: number]: string; 
    
}


export default function StrikeoutProgContent() {
    const [data, setData] = useState<number[]>([]);
    const [dataLabels, setDataLabels] = useState<string[]>([]);
    const [xLabels, setXLabels] = useState<string[]>([]);

    //graph 2 potentially be its own component
    const [data2, setData2] = useState<number[]>([]);
    const [dataLabels2, setDataLabels2] = useState<string[]>([]);
    const [xLabels2, setXLabels2] = useState<string[]>([]);

    //gameKKs
    const [gameKData, setgameKData] = useState<number[][]>([[]]);
    const [gameKDataLabels, setgameKDataLabels] = useState<string[][]>([[]]);
    const [gameKXLabels, setgameKXLabels] = useState<string[]>([]);

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
            setDataLabels(playerLabels);
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
            setDataLabels2(playerLabels);
            setXLabels2(xLabels);
        });
    }, []);

    useEffect(() => {
        d3.csv("/data/game_k_2008.csv").then((csvData) => {
        const dataArray = csvData as unknown as Daily2008[];

        const data: number[][] = [];
        const dataLabels: string[][] = [];
        const playerNames: string[] = [];
        const xLabels: string[] = [];

        dataArray.forEach((player) => {
            playerNames.push(player.name);

            const playerValues: number[] = [];
            const playerLabels: string[] = [];
            

            for (let i = 1; i <= 162; i++) {
                const valStr = player[i];
                const valNum = valStr ? Number(valStr) : 0;
                playerValues.push(valNum);
                playerLabels.push(valStr ?? "0");
                xLabels.push(String(i));
            }

            data.push(playerValues);
            dataLabels.push(playerLabels);
        });

        // Now you have:
        // data = [[...player1Values], [...player2Values], ...]
        // dataLabels = [[...player1Labels], [...player2Labels], ...]
        // playerNames = ["Player1", "Player2", ...]
        setgameKData(data)
        setgameKDataLabels(dataLabels);
        setgameKXLabels(xLabels);

        console.log({ data, dataLabels, playerNames });
        });

        

    }, []);

    const preModernGraphConfigs = [
        {
            key: "Yearly-K-Leader-Pre-Modern-ERA",
            data: data.slice(0, 30),
            dataLabels: dataLabels.slice(0, 30),
            xLabels: xLabels.slice(0, 30),
        },
        {
            key: "K-Record-Holder-Pre-Modern-ERA",
            data: data2.slice(0, 30),
            dataLabels: dataLabels2.slice(0, 30),
            xLabels: xLabels2.slice(0, 30),
        },
    ]
    const deadBallEraGraphConfigs = [
        {
            key: "Yearly-K-Leader-Dead-Ball-ERA",
            data: data.slice(29, 49),
            dataLabels: dataLabels.slice(29, 49),
            xLabels: xLabels.slice(29, 49),
        },
        {
            key: "K-Record-Holder-Dead-Ball-ERA",
            data: data2.slice(29, 49),
            dataLabels: dataLabels2.slice(29, 49),
            xLabels: xLabels2.slice(29, 49),
        },
    ]

    const goldenAgeEraGraphConfigs = [
        {
            key: "Yearly-K-Leader-Golden-Age-ERA",
            data: data.slice(49, 76),
            dataLabels: dataLabels.slice(49, 76),
            xLabels: xLabels.slice(49, 76),
        },
        {
            key: "K-Record-Holder-Golden-Age-ERA",
            data: data2.slice(49, 76),
            dataLabels: dataLabels2.slice(49, 76),
            xLabels: xLabels2.slice(49, 76),
        },
    ]
    const integrationEraGraphConfigs = [
        {
            key: "Yearly-K-Leader-Integration-ERA",
            data: data.slice(76, 90),
            dataLabels: dataLabels.slice(76, 90),
            xLabels: xLabels.slice(76, 90),
        },
        {
            key: "K-Record-Holder-Integratione-ERA",
            data: data2.slice(76, 90),
            dataLabels: dataLabels2.slice(76, 90),
            xLabels: xLabels2.slice(76, 90),
        },
    ]
    const expansionEraGraphConfigs = [
        {
            key: "Yearly-K-Leader-Golden-Age-ERA",
            data: data.slice(90, 133),
            dataLabels: dataLabels.slice(90, 133),
            xLabels: xLabels.slice(90, 133),
        },
        {
            key: "K-Record-Holder-Golden-Age-ERA",
            data: data2.slice(90, 133),
            dataLabels: dataLabels2.slice(90, 133),
            xLabels: xLabels2.slice(90, 133),
        },
    ]
    const modernEraGraphConfigs = [
        {
            key: "Yearly-K-Leader-Modern-ERA",
            data: data.slice(133),
            dataLabels: dataLabels.slice(133),
            xLabels: xLabels.slice(133),
        },
        {
            key: "K-Record-Holder-Modern-ERA",
            data: data2.slice(133),
            dataLabels: dataLabels2.slice(133),
            xLabels: xLabels2.slice(133),
        },
    ]
    const gameK2008Configs = [
        {
            key: "gameK-2008",
            data: gameKData,
            dataLabels: gameKDataLabels,
            xLabels: gameKXLabels,
        },
        // {
        //     key: "K-Record-Holder-Golden-Age-ERA",
        //     data: data2.slice(133),
        //     dataLabels: dataLabels2.slice(133),
        //     xLabels: xLabels2.slice(133),
        // },
    ]
    // return (<></>); // to hide all the data until published
    return (
        <>
            <section id="chapter1" className="mb-12">
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
                    about <a className="text-blue-300 hover:text-blue-500" href="https://www.baseball-almanac.com/rule11.shtml">here</a>.
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
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            preModernGraphConfigs.map((cfg) =>
                                <LinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    dataLabels={cfg.dataLabels}
                                    dataLabelRotation={-90} // 0 or +/-90
                                    dataLabelFontSize={14}
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            )

                        }
                    />
                }
            </section>
            <section id="chapter2" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Chapter 2 - The Deadball Era
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    With the addition of a new rule, that is foul balls now count as strikes (1901 in NL and 1903 in AL),
                    it helped usher in a new era of baseball, The Deadball Era. An era of small ball
                    with tonnes of stealing, bunting, and hit and runs to manufacture as many runs as 
                    possible as they were tough to come by. With addition of pitchers not having to 
                    swap balls as often as they do today and the allowance of spit balls, made hitting
                    a lot more difficult.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    With eyes more on contact and bunting, we don&apos;t see broken nearly as often as the previous era.
                    Sam Wises dominance of holding the record for 20 seasons would come to an end though, be broken by 
                    Harry Lumley. A lefthanded right fielder from Pennsylvania. Spending his whole career with the Brooklyn Superbas,
                    Harry started his career out strong, striking out 106 times in 633 plate appearances. A career 134 OPS+ hitter,
                    he would cut back on those strikeouts, but would still hold onto the record for 2 full seasons, before his teammate,
                    Billy Maloney, a once catcher, who spent most of his time in the outfield, would take it from him, striking out
                    116 times in 637 plate appearances. He would lead the NL in strikeout for 3 consecutive years, from 1905-1907 and 
                    held the record for over a year after he retired in 1908.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    With teammates holding the record for 6 seasons, baseball was ready for a change. A new 
                    King of K, a man who would lead the AL in K&apos;s 2 times before he&apos;d finally take the record,
                    and a man who would go on to hold that record for an astonishing 28 seasons! A true champion of the
                    swing and miss, his name was, Jake Stahl. A first basemen/outfielder who played for 3 teams, but most 
                    notably, the Boston Americans for six seasons. His dominance was so large that he not only held the record
                    for the remaining of the deadball era, but also would hold it for most of the golden age as well. A truly legendary 
                    run for the record book.
                </p>
                <p>Some players of note this era:</p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>Danny Hofman, a center fielder for the Philadelphia Athletics who came close to breaking the record in 1905 (105). </li>
                    <li>Gus Williams, a right fielder for the St. Louis Browns, who if not for Jake Stahl, would have set the record in 1914 (120) and held it for over 20 seasons.</li>
                    <li>Babe Ruth, the legend himself, who lead th league in K&apos;s in 1918 (58) It was his first full season not being purely a pitcher, and would be his first of 5 times leading the AL in strikeouts, although he never struckout more than 100 times.</li>
                </ul>
                {/* Bar graphs for PreModern Era */}
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            deadBallEraGraphConfigs.map((cfg) =>
                                <LinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    dataLabels={cfg.dataLabels}
                                    dataLabelRotation={-90} // 0 or +/-90
                                    dataLabelFontSize={14}
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            )

                        }
                    />
                }
            </section>
            <section id="chapter3" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Chapter 3 - The Live Ball Era and The Golden Age
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    In 1920 a new rule would hit the field that would change the game as we know it. A small,
                    simple change, lead to drastic results. No lnoger would balls stick around after being defaced,
                    dirtied and overall just over used. Now the first sign of wear would lead to an immediate replacement.
                    (They also banned the spit ball). This lead to beautiful pearly white baseball that any hitter could
                    see from a mile away, and lead to massive changes in how the game was played. No longer needing to bunt,
                    steal, and hit and run, players could actually just try to hit the ball. This lead to Babe Ruth shattering
                    the home run record (54), and even allowed contact hitters to shine as well (Sisler racked up a record 257 hits that year).
                    A new, more golden era of baseball was upon us.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    It was these rules that allowed Jake Stahl to shine for so many seasons. A record held 
                    for 28 seasons, their was no way anyone whould surely break it again. From 1920 to 1934 only 2! hitters
                    would strike out 100 or more times, Bruce Cambell (102), and Harlond Clift(100). It wouldn&apos;t be until
                    the rise of the DiMaggio brothers and more specifically, Vince DiMaggio, that we would see a new record holder.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    One of 3 big league center fielders in the family, Vince started his career swining. He would take a run at the 
                    title in 1937, but fall short, leading the league in strikeouts with only 111. But it didn&apos;t take long for Vince 
                    to do what no other man had done in 28 seasons, when we finally broken the record in only his second seasons, striking 
                    out 134 times in 611 plate appearances in 1938. He would take many attempts again at breaking the record over his career,
                    but always falling short, but he lead the league in K&apos;s 6 times in his career, and in 1943 had his best change to further
                    the record but could only muster 126 swing and misses, falling short of extending his run, but his 1938 record would go on
                    to hold for 18 seasons, and wouldn&apos;t be broken again until 1956, truly displaying his dominance through the 40&apos;s.
                </p>
                <p>Notable of the golden age:</p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>The &quot;Other&quot; Dimmagio&apos;s, not found on any of these lists or graphs, finished their career, with career highs of 68 (Dom), and 39 (Joe). Clearly men who did not want to try and take their brother&apos;s spotlight. </li>
                    <li>Hack Wilson - 3 time MLB leader, 5 time NL leader, and notable Power hitting center fielder for the Cubs. Most notable for his single season RBI record of 191.</li>
                    <li>Sluggers: Babe Ruth returns 3 times, Jimmie Foxx finds his way on the board a couple, and Ralph Kiner takes a run for the title before integration.</li>
                </ul>
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            goldenAgeEraGraphConfigs.map((cfg) =>
                                <LinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    dataLabels={cfg.dataLabels}
                                    dataLabelRotation={-90} // 0 or +/-90
                                    dataLabelFontSize={14}
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            )

                        }
                    />
                }
            </section>
            <section id="chapter4" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Chapter 4 - The Integration Era
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    1947 would usher in what is know as the Integration era, as the debut of Jackie Robinson on opening day with the Dodgers in the NL and 
                    Larry Doby making his debut in July in the AL with Cleveland, would set the stage for more talent to enter the league and an increasing rate.
                    The addition of talent though did not help push th erecord much futher along. In 1956 Jim Lemon, and outfielder for the Washington Nationals would strikeout
                    4 more times than Vince DiMaggio, breaking his record. A quiet era for sure though, saw notable slugger/Hall of Famers, Mickey Mantle and Eddie Mathews take 
                    some runs at the record, but the only real attempt for the record came in the form of Pancho Herrera (136). A Cuban infielder for the Phillies, whose career in the 
                    minor leagues are expanded his career in the big leagues. With the record being broken in such small margins (128 in 1910 to 138 in 1956), it seemed like the 
                    race for 200 would never take hold, well that was not until the league was ready to grow.
                    From 1960 until the 2000&apos;s baseball was looking to expand in grow in multiple ways. From expanding the league to many more teams, to the players taking 
                    supplements to expand themselves to new sizes, the strikeout record was ready to take on new life, and lead eventually getting us back on track to new heights.
                </p>
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            integrationEraGraphConfigs.map((cfg) =>
                                <LinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    dataLabels={cfg.dataLabels}
                                    dataLabelRotation={-90} // 0 or +/-90
                                    dataLabelFontSize={14}
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            )

                        }
                    />
                }
            </section>
            <section id="chapter5" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Chapter 5 - The &quot;Expansion&quot; Era
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    In 1961 the league was on the rise and starting to grow. With 16 teams overall, the league want to grow and grow fast, with goals 
                    of eventually double the amount of teams in the league. 2 teams (Los Angeles Angels and Washing Senators) would initially join the American League in 1961
                    2 more teams would sign up in the National League in 1962, (Houston Colt .45s and the New York Mets), reaching 20 teams.
                    1969 The Montreal Expos and San Diego Padres in the National League and the Kansas City Royals and Seattle Pilots in the American League helped the league reach 24.
                    In 1977 the Seattle Mariners and Toronto Blue Jays would finally join on, and the final 4 teams would join in 1993 (Colorado Rockies and Florida Marlins in the NL) and 
                    1998 (The Arizona Diamondbacks, and Tampa Bay Devil Rays). These additions would lead to expansion drafts occuring in 1960, 1961, 1968, 1976, 1992 and 1997. Which would 
                    help divide the talent among many more teams. 

                    In the late 1980&apos;s the league also saw the players grow in size, massively. The lack if drug testing lead to many players growing beyond what the league 100 years ago 
                    would imagine. With size and power starting to take hold, and the surge of the home run, it mean&apos;t more players were looking to swing hard and aim later, which would make
                    reaching new height&apos;s in strikeout a popular endeavor to reach for the games biggest, brightest starts.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Starting off with Jake Wood striking out for the Tigers 141 times in 731 player appearance in 1941, and Twins Power legend, Harmon Killebrew besting him a year later,
                    with 142 in 666 plate appearance, the growth of the game, was ready to show off it&apos;s best and it would not take long. After seeing the record broken twice in 
                    as many years, outfielder Dave Nicholson decided he was done playing around and showed off dominance not seen in many, many, many years. In 1963, in only 520 plate appearances
                    for the Chicago White Sox, Dave Nicholson would swing and miss enough times to rack up an impressive 175 strikeouts. On August 27, he would strike out 4 times, breaking the record
                    with 145 strieouts. He would then cruise on striking out 30 more times after that, smashing a record that wouldn&apos;t be beaten by more than 10 since 1910. A run so insane, that many 
                    probably didn&apos;t think the record could ever be broken again. He would hold that record, for only 6 seasons, until the longest holder in the history of the game would step in. 
                    A man whose name is known by many, and will be remembered forever for his other contributions to the game.

                </p>
                <p className="text-lg leading-relaxed mb-6">
                    In 1969, Bobby Bonds would play his first full season for the San Francison Giants. Maybe best known for being the father of Giant&apos;s legend, Barry Bonds, Bobby was 
                    ready to set records of his own. In 1969, he would go on to strikeout 187 times in 720 plate appearances. A number that wouldn&apos;t be matched by another human again until the 
                    turn of the millenium. The only person who had a change, was himself who repeated the feat in 1970, 2 upping himself striking out 189 times in 745 plate appearances. Bonds had many 
                    people take tries at breaking his record, many getting close, but ultimately coming up short, a truly great run that would culminate in him holding the record for 35 seasons, a truly remarkable feat.
                    
                </p>
                <p>Notables during the expansion era:</p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>Phillies Hall of Famer, Mike Schmidt, who made his best run of the record in 1975 with 180 strikeouts in 674 plate appearances.</li>
                    <li>Ranger and journeyman left fielder, Pete Incaviglia, whose debut season with the Rangers led to him striking out 185 times in 606 plate appearances.</li>
                    <li>Rob Deer, who came up short in 1987, striking out 186 times in only 566 plate appearances.</li>
                    <li>Cecil Fielder, who is probably best known for hitting the exact same amount of homers as his son Prince, struck out 182 times in 673 plate appearances in 1990.</li>
                    <li>Preston Wilson, a center fielder for Florida, who matched Bonds&apos; first record with 187 in 674 plate appearances in 2000.</li>
                    <li>José Hernández, a Cub and journey man infielder, who had many great attempts, from 2001 to 2003, striking out 185, 188 and 177 times respectively.</li>
                    <li>Other Notable Sluggers:  Reggie Jackson who made the leaderboard a few times, 2 sport athlete, Bo Jackson and Jim Thome.</li>
                </ul>
                
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            expansionEraGraphConfigs.map((cfg) =>
                                <LinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    dataLabels={cfg.dataLabels}
                                    dataLabelRotation={-90} // 0 or +/-90
                                    dataLabelFontSize={14}
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            )

                        }
                    />
                }
            </section>
            <section id="chapter6" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Chapter 6 - The Modern Game - Three True Outcomes
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    With the turn of the century and millenium, analytics and sabermetrics started to take their stranglehold on the game. Singles and contact
                    hitting started to lose value. Walks and long balls start to explode in popularity and with the change of time, velocities started rising faster
                    than tides on a stormy day and elbows started blowing up left and right trying to keep up with it all, a new era started its dawn.
                    Baseball stopped being played on the field, and started being played in the brains of &quot;nerds&quot; and their computers.
                    No longer does the game look like it ever has, and the old strikeout records of yesteryear will very quickly become the every day status quo. This is the 
                    start of the three true outcome era.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    With teams quickly finding out that 4 bases is greather than 1 base, teams started scouting for hulking mamoths that would swing out of their cleats,
                    even with two strikes. They also realized that faster fastballs get more outs than slower fastballs and modern diets and training lead to metric chasing
                    never before seen. Adults, parents and kids all start chasing exit velocity, and launch angle, along with velocity and movement. The data at the fingertips
                    of players, trainers at all levels exploded the talent to new heights. The game is not the same game Rhynie Wolters played and likely never will. 
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    This new era quickly begins. Adam Dunn, a long time Cincinatti Reds left fielder, beging the trend of swing and miss sluggers. He would break the long standing
                    Bonds record, with 195 strikeouts in 681 plate appearances in 2004, and continue striving for swing and miss excellence, making many runs at the record over his 14 year career
                    and throwing his hat in the ring as a man who could potentially be the first to 200.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Holding the record for only 3 seasons, and trying his best, he would eventually be bested by career Phillie first basemen, Ryan Howard, who would strike out 199 times,
                    both in 2007 in 648 plate appearance. With these massive sluggers caring more about the long ball than anything else, the race for 200 was on, and appeared that Dunn and 
                    Howard would be the early favourites to break the once though impossible, but now obtainable barrier. Entering the final stretch to break the record, it appeared that 
                    Ryan Howard would be the victor. With Adam Dunn cutting back on his K numbers just a touch in 2007 it appeared he would have to enter 2008 on his A game to have a chance.
                    Long shot guys, not completely out of it, Curtis Granderson (lead the AL in 2006 with 174) and Jack Cust (lead the AL in 2007) as well as Dan Uggla, a Marlin at the time
                    would also be throwing their hats in the ring with a change to take baseballs glorious crown. The race to 200 looked to be on.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    2008 was going to be the year. With Curtis Granderson missing time at the start of the season, and limiting his strikeouts,  he pulled himself out of the race altogether,
                    finishing with 52 at the break, and only 111 on the season. Dan Uggla came out punching strong, striking out 27, 33, and 31 times in the months of April, May and June.
                    He would finish the first half with 96 strikeouts. Adam Dunn, started out a little slower, with 22, and 27 in April and May, but a strong June with 39 K&apos;s would
                    lead him into the break with 99. Jack Cust, after leading the AL in 2007, came out with a bang, string out 27, 31, and 33 as well, matching Uggla&apos;s first three months, but 
                    a very strong start of July would lead him into the break with a whopping 114 strikeouts. Ryan Howard would run away early though with a commanding lead, striking out 
                    38, 40 and 36 strikeouts in April through June and would himself walk into the all-star break sitting at 129 strikeouts and be a clear favourite. With a weak July 
                    leaving the break for both Uggla and Dunn, their chance on the title quickly slipped through their fingers, and would both finish the second half, much better hitters
                    striking out only 75 and 65 times each, finishing their seasons at 171 (Uggla) and 164 (Dunn). 
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    A third hitter was waiting in the wings though, one second year player for the Diamondback, Mark Reynolds. A man who matched Howards May and June, but had a weaker May,
                    would cruise into the break with 111 strikeouts, giving him an outside change in the race to 200 with Jack Cust and Ryan Howard. With really strong July from Cust, and a 
                    a stronger month from Reynolds, the gap sould shrink, and shrink drastically, with Cust, Howard and Reynolds going into august sitting at 136, 142 and 134 strikeouts respectively.
                    With another strong showing from Reynolds and Howard in August, and slowing some slowing down from Jack Cust, the trio would enter September, with Ryan leading the way at 178, Reynolds
                    sitting in second with 171, and Jack Cust pulling up the rear with 167 strikeouts. With Jack needed 33, and only striking out that many times during 2 months, he appeared to be fading.
                    With needing only 22, and him topping that number every month, he appeared to be the heavy favourite, and Mark needing 29, which he had done every month except one kept him in the hunt.
                    The race for 200 was going to be tight.
                </p>
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            gameK2008Configs.map((cfg) =>
                                <MultiLinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    showDataLabels={false}
                                    // dataLabels={cfg.dataLabels}
                                    // dataLabelRotation={0} // 0 or +/-90
                                    width={1500}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    lineColors={["blue","black","red","orange","purple"]}
                                    dataPointCircles={false}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={90}
                                />
                            )

                        }
                    />
                }
                
                {data.length !== 0 && data2.length !== 0
                && <GraphSlider 
                        graphs={
                            modernEraGraphConfigs.map((cfg) =>
                                <LinePlot
                                    key={cfg.key}
                                    data={cfg.data}
                                    dataLabels={cfg.dataLabels}
                                    dataLabelRotation={-90} // 0 or +/-90
                                    width={780}
                                    // width={Math.max(640, data.length * 20)} //dynamic width
                                    height={500}
                                    marginLeft={35}
                                    marginBottom={100}
                                    xLabels={cfg.xLabels}
                                    // xLabelColor="black"
                                    rotateLabels={45}
                                />
                            )

                        }
                    />
                }
            </section>
            <section id="epilogue" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Epilogue
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
                        barLabels={dataLabels}
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
                        dataLabels={dataLabels}
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
                        // dataLabels={[dataLabels, dataLabels2]}
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
                        barLabels={dataLabels2}
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
            {/* Graph 2 */}
            {data.length !== 0 
            && <div className="overflow-x-auto">
                    <LinePlot
                        data={data2}
                        dataLabels={dataLabels2}
                        dataLabelRotation={-90} // 0 or +/-90
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
            <p className="w-full pt-8 text-center text-sm text-gray-500"
            >
                Data courtesy of the <a href="https://sabr.org/lahman-database/">Lahman Baseball Database</a>
            </p>
    </>
    );
}
