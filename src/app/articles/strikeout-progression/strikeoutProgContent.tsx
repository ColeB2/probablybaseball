import BarGraph from "@/components/Graphs/BarGraph";
import LinePlot from "@/components/Graphs/Lineplot";
import MultiLinePlot from "@/components/Graphs/MultiLineplot";
import GraphSlider from "@/components/GraphSlider/GraphSlider";
import strikeoutData from '@/generated/strikeout-history.json'
import StrikeoutGraphs from "./StrikeoutGraphs";


const preModernCfg = {
    start: 0,
    end: 30,
    era: "Pre Modern Era",
    years: "(1871-1900)",
    ariaLabel: "Pre Modern Era (1871-1900) Strikeout Graphs",
    keys: ["Yearly-K-Leader-Pre-Modern-ERA", "K-Record-Holder-Pre-Modern-ERA"],
    graphs: ["yearlyLeaders" as const, "records" as const],
    yAxisLabels: ["Strikeouts (K)", "Strikeouts (K)"],
    xAxisLabels: ["Year", "Year"],
    alt: ["League Strikeout Leaders", "Single Season Strikeout Records"],
    desc: ["A line graph showing strikeout leaders", "A line graph showing strikeout record"]
}
const deadBallCfg = {
    start: 29,
    end: 49,
    era: "Dead Ball Era",
    years: "(1900-1919)",
    ariaLabel: "Deadball Era (1900-1919) Strikeout Graphs",
    keys: ["Yearly-K-Leader-Dead-Ball-ERA", "K-Record-Holder-Dead-Ball-ERA"],
    graphs: ["yearlyLeaders" as const, "records" as const],
    yAxisLabels: ["Strikeouts (K)", "Strikeouts (K)"],
    xAxisLabels: ["Year", "Year"],
    alt: ["League Strikeout Leaders", "Single Season Strikeout Records"],
    desc: ["A line graph showing strikeout leaders", "A line graph showing strikeout record"]
};
const goldenAgeCfg = {
    start: 49,
    end: 76,
    era: "Liveball Era and Golden Age",
    years: "(1920-1947)",
    ariaLabel: "Liveball Era and Golden Age (1920-1947) Strikeout Graphs",
    keys: ["Yearly-K-Leader-Golden-Age-ERA", "K-Record-Holder-Golden-Age-ERA"],
    graphs: ["yearlyLeaders" as const, "records" as const],
    yAxisLabels: ["Strikeouts (K)", "Strikeouts (K)"],
    xAxisLabels: ["Year", "Year"],
    alt: ["League Strikeout Leaders", "Single Season Strikeout Records"],
    desc: ["A line graph showing strikeout leaders", "A line graph showing strikeout record"]
};

const integrationCfg = {
    start: 76,
    end: 90,
    era: "Integration Era",
    years: "(1947-1960)",
    ariaLabel: "Integration Era (1947-1960) Strikeout Graphs",
    keys: ["Yearly-K-Leader-Integration-ERA", "K-Record-Holder-Integration-ERA"],
    graphs: ["yearlyLeaders" as const, "records" as const],
    yAxisLabels: ["Strikeouts (K)", "Strikeouts (K)"],
    xAxisLabels: ["Year", "Year"],
    alt: ["League Strikeout Leaders", "Single Season Strikeout Records"],
    desc: ["A line graph showing strikeout leaders", "A line graph showing strikeout record"]
};

const expansionCfg = {
    start: 90,
    end: 133,
    era: "Expansion Era",
    years: "(1961-2003)",
    ariaLabel: "Expansion Era (1961-2003) Strikeout Graphs",
    keys: ["Yearly-K-Leader-Expansion-ERA", "K-Record-Holder-Expansion-ERA"],
    graphs: ["yearlyLeaders" as const, "records" as const],
    yAxisLabels: ["Strikeouts (K)", "Strikeouts (K)"],
    xAxisLabels: ["Year", "Year"],
    alt: ["League Strikeout Leaders", "Single Season Strikeout Records"],
    desc: ["A line graph showing strikeout leaders", "A line graph showing strikeout record"]
};

const modernCfg = {
    start: 133,
    end: undefined, // Slices to the end of the array automatically
    era: "Modern Game Era",
    years: "(2004-2024)",
    ariaLabel: "Modern Game Era (2004-2024) Strikeout Graphs",
    keys: ["Yearly-K-Leader-Modern-ERA", "K-Record-Holder-Modern-ERA"],
    graphs: ["yearlyLeaders" as const, "records" as const],
    yAxisLabels: ["Strikeouts (K)", "Strikeouts (K)"],
    xAxisLabels: ["Year", "Year"],
    alt: ["League Strikeout Leaders", "Single Season Strikeout Records"],
    desc: ["A line graph showing strikeout leaders", "A line graph showing strikeout record"]
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ERAS = {
    preModern: preModernCfg,
    deadBall: deadBallCfg,
    goldenAge: goldenAgeCfg,
    integration: integrationCfg,
    expansion: expansionCfg,
    modern: modernCfg
};

export default function StrikeoutProgContent() {
    return (
        <>
            <section id="pre-modern" className="mb-12">
                <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                    Chapter 1
                </span>
                <h2 className="text-3xl font-semibold mb-2">
                    The Pre Modern Era
                    <span className="block text-lg italic font-normal text-primary/70 mt-2 ml-4">
                        (1871&ndash;1900)
                    </span>
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    The game as we know it was not the same one Rynie used to play. Before the start of the modern era, a walk would
                    require as many as 8 balls, foul balls would not be considered strikes, balls would have to be pitched underhand,
                    not thrown overhand like the missile-throwing chuckers of today, outs could be caught off the bounce, and many different rule oddities
                    which could make for an article of its own, can be read
                    about <a className="text-blue-300 hover:text-blue-500" href="https://www.baseball-almanac.com/rule11.shtml">here</a>.
                    Beyond that will be left as an exercise to the reader, but knowing that it is still, 1, 2, 3 strikes you are out.
                    This is all that we really need to know about for now.
                </p>
                <p className="text-lg leading-relaxed  mb-6">
                    Although it was a wild-wild west of a game, and not the near-uniform game of professionalism we have today.
                    We can quickly see and point out some of the strikeout kings who hold the record as baseball&apos;s best swing-and-missers.
                    Some players of note to hold the record of strikeout king include:
                </p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>Candy Cummings,  a Pitcher/Outfielder for numerous teams, who would hold the record from 1872-1874 at 14.</li>
                    <li>Herman Dehlman - A first baseman and the first non-hitter on this list.</li>
                    <li>Lew Brown - a Catcher, who would be the first hitter to break the 30 strikeout barrier.</li>
                    <li>Will White - A Pitcher, primarily for the Cincinnati team, who would be the first to break the 40 strikeout barrier.</li>
                    <li>Pud Galvin - A Pitching Hall of Famer who would break the record in 1879, and break it 3 more times, while holding it for 5 years</li>
                </ul>
                <p className="text-lg leading-relaxed mb-6">
                    Finally, we round out the era with <strong>Sam Wise</strong>, a middle infielder from Akron, who would set the record for most strikeouts in 1884,
                    by striking out <strong>104</strong> times in 451 plate appearances, being the first player to break the 100 barrier. He would continue to hold the record of
                    strikeout king for the remainder of the pre-modern era, as well as hold that record for a few years into the modern era. Holding 
                    it for 20 seasons, as well as being the only person to strikeout 100 times until it would be broken again, no one could really hold a light
                    to Sam Wise until the turn of the century. He truly was one of a kind, and a modern-day gladiator with the stick.
                </p>
                {/* Bar graphs for PreModern Era */}
                <StrikeoutGraphs cfg={preModernCfg} strikeoutData={strikeoutData}/>
            </section>
            <section id="deadball" className="mb-12">
                <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                    Chapter 2
                </span>
                <h2 className="text-3xl font-semibold mb-3">
                    The Deadball Era
                    <span className="block text-lg italic font-normal text-primary/70 mt-2 ml-4">
                        (1900&ndash;1919)
                    </span>
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    With the addition of a new rule, that is, foul balls now count as strikes (1901 in NL and 1903 in AL),
                    it helped usher in a new era of baseball, the Deadball Era. An era of small ball
                    with tonnes of stealing, bunting, and hit and runs to manufacture as many runs as 
                    possible, as they were tough to come by. The addition of pitchers not having to 
                    swap balls as often as they do today and the allowance of spit balls made hitting
                    a lot more difficult.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    With eyes more on contact and bunting, we don&apos;t see broken nearly as often as the previous era.
                    Sam Wise&apos;s dominance of holding the record for 20 seasons would come to an end as it was broken
                    by <strong>Harry Lumley</strong>. A left-handed right fielder from Pennsylvania. Spending his whole career with the Brooklyn Superbas,
                    Harry started his career out strong, striking out <strong>106</strong> times in 633 plate appearances. A career 134 OPS+ hitter,
                    he would cut back on those strikeouts, but would still hold onto the record for 2 full seasons, before his
                    teammate, <strong>Billy Maloney</strong>, a once catcher, who spent most of his time in the outfield, would take it from him,
                    striking out <strong>116</strong> times in 637 plate appearances. He would lead the NL in strikeouts for 3 consecutive
                    years, from 1905-1907 and held the record for over a year after he retired in 1908.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    With teammates holding the record for 6 seasons, baseball was ready for a change. A new 
                    King of K, a man who would lead the AL in K&apos;s 2 times before he&apos;d finally take the record,
                    and a man who would go on to hold that record for an astonishing 28 seasons! A true champion of the
                    swing and miss, his name was <strong>Jake Stahl</strong>. A first basemen/outfielder who played for 3 teams, but most 
                    notably, the Boston Americans for six seasons would smash the record with <strong>128</strong> K&apos;s. His dominance was so large that he not only held the record
                    for the remainder of the deadball era, but also would hold it for most of the golden age as well. A truly legendary 
                    run for the record book.
                </p>
                <p>Some players of note this era:</p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>Danny Hofman, a center fielder for the Philadelphia Athletics who came close to breaking the record in 1905 (105). </li>
                    <li>Gus Williams, a right fielder for the St. Louis Browns, who, if not for Jake Stahl, would have set the record in 1914 (120) and held it for over 20 seasons.</li>
                    <li>Babe Ruth, the legend himself, who led the league in K&apos;s in 1918 (58). It was his first full season not being purely a pitcher, and would be his first of 5 times leading the AL in strikeouts, although he never struck out more than 100 times.</li>
                </ul>
                <StrikeoutGraphs cfg={deadBallCfg} strikeoutData={strikeoutData}/>
            </section>
            <section id="live-ball-golden-age" className="mb-12">
                <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                    Chapter 3
                </span>
                <h2 className="text-3xl font-semibold mb-3">
                    The Live Ball Era and The Golden Age
                    <span className="block text-lg italic font-normal text-primary/70 mt-2 ml-4">
                        (1920&ndash;1947)
                    </span>
                </h2>
                <p className="text-sm italic text-primary mb-6 ml-6">
                    - The league post 1919, up until the Integration Era in 1947
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    In 1920, a new rule would hit the field that would change the game as we know it. A small,
                    simple change led to drastic results. No longer would balls stick around after being defaced,
                    dirtied and overall just overused. Now, the first sign of wear would lead to an immediate replacement.
                    (They also banned the spitball.) This led to a beautiful, pearly white baseball that any hitter could
                    see from a mile away, and led to massive changes in how the game was played. No longer needing to bunt,
                    steal, and hit and run, players could actually try to hit the ball. This led to Babe Ruth shattering
                    the home run record (54), and even allowed contact hitters to shine as well (Sisler racked up a record 257 hits that year).
                    A new, more golden era of baseball was upon us.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    It was these rules that allowed Jake Stahl to shine for so many seasons. A record held 
                    for 28 seasons, there was no way anyone would surely break it again. From 1920 to 1934, only 2 hitters
                    would strike out 100 or more times: Bruce Campbell (102) and Harlond Clift(100). It wouldn&apos;t be until
                    the rise of the DiMaggio brothers and more specifically, <strong>Vince DiMaggio</strong>, that we would see a new record holder.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    One of 3 big league center fielders in the family, Vince Dimaggio started his career swinging. He would take a run at the 
                    title in 1937, but fell short, leading the league in strikeouts with only 111. But it didn&apos;t take long for Vince 
                    to do what no other man had done in 28 seasons, when he finally broke the record in only his second season, striking 
                    out <strong>134</strong> times in 611 plate appearances in 1938, someone finally toppled the great Jake Stahl.
                    Vince would go on to make many attempts again at breaking the record over his career,
                    but always falling short, but he led the league in K&apos;s 6 times in his career, and in 1943 had his best chance to further
                    the record but could only muster 126 swing and misses, falling short of extending his run, but his 1938 record would go on
                    to hold for 18 seasons, and wouldn&apos;t be broken again until 1956, truly displaying his dominance through the 40&apos;s.
                </p>
                <p>Notable of the golden age:</p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>The &quot;Other&quot; Dimmagio&apos;s, not found on any of these lists or graphs, finished their career, with career highs of 68 (Dom) and 39 (Joe). Clearly, men who did not want to try and take their brother&apos;s spotlight. </li>
                    <li>Hack Wilson - 3-time MLB leader, 5-time NL leader, and notable power-hitting center fielder for the Cubs. Most notable for his single-season RBI record of 191.</li>
                    <li>Sluggers: Babe Ruth returns 3 times, Jimmie Foxx finds his way on the board a couple, and Ralph Kiner takes a run for the title before integration.</li>
                </ul>
                <StrikeoutGraphs cfg={goldenAgeCfg} strikeoutData={strikeoutData}/>
            </section>
            <section id="integration" className="mb-12">
                <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                    Chapter 4
                </span>
                <h2 className="text-3xl font-semibold mb-3">
                    The Integration Era
                    <span className="block text-lg italic font-normal text-primary/70 mt-2 ml-4">
                        (1947&ndash;1960)
                    </span>
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    1947 would usher in what is known as the Integration era, as the debut of Jackie Robinson on opening day with the Dodgers in the NL, and 
                    Larry Doby, making his debut in July in the AL with Cleveland, would set the stage for more talent to enter the league at an increasing rate.
                    The addition of talent did not help push the record much further along. In 1956, <strong>Jim Lemon</strong>, an outfielder for the Washington Nationals, would strike out
                    <strong>138</strong> times, 4 more than Vince DiMaggio, breaking his record. A quiet era for sure though, saw notable slugger/Hall of Famers, Mickey Mantle and Eddie Mathews, take 
                    some runs at the record, but the only real attempt for the record came in the form of Pancho Herrera (136). A Cuban infielder for the Phillies, whose career in the 
                    minor leagues was extended by his career in the big leagues. With the record being broken in such small margins (128 in 1910 to 138 in 1956), it seemed like the 
                    race for 200 would never take hold. Well, that was not until the league was ready to grow.
                    From 1960 until the 2000&apos;s baseball was looking to expand in grow in multiple ways. From expanding the league to many more teams, to the players taking 
                    supplements to expand themselves to new sizes, the strikeout record was ready to take on new life, and lead, eventually getting us back on track to new heights.
                </p>
                <StrikeoutGraphs cfg={integrationCfg} strikeoutData={strikeoutData}/>
            </section>
            <section id="expansion" className="mb-12">
                <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                    Chapter 5
                </span>
                <h2 className="text-3xl font-semibold mb-3">
                    The &quot;Expansion&quot; Era
                    <span className="block text-lg italic font-normal text-primary/70 mt-2 ml-4">
                        (1961&ndash;2003)
                    </span>
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    In 1961, the league was on the rise and starting to grow. With 16 teams overall, the league want to grow and grow fast, with goals 
                    of eventually doubling the number of teams in the league. 2 teams (the Los Angeles Angels and Washington Senators) would initially join the American League in 1961
                    2 more teams would sign up in the National League in 1962 (Houston Colt .45s and the New York Mets), reaching 20 teams.
                    1969 The Montreal Expos and San Diego Padres in the National League and the Kansas City Royals and Seattle Pilots in the American League helped the league reach 24.
                    In 1977, the Seattle Mariners and Toronto Blue Jays would finally join on, and the final 4 teams would join in 1993 (Colorado Rockies and Florida Marlins in the NL) and 
                    1998 (The Arizona Diamondbacks and Tampa Bay Devil Rays). These additions would lead to expansion drafts occurring in 1960, 1961, 1968, 1976, 1992 and 1997. This would 
                    help divide the talent among many more teams. 

                    In the late 1980&apos;s the league also saw the players grow in size, massively. The lack of drug testing led to many players growing beyond what the league 100 years ago 
                    would have imagined. With size and power starting to take hold, and the surge of the home run, it mean&apos;t more players were looking to swing hard and aim later, which would make
                    reaching new height&apos;s in strikeouts a popular endeavour to reach for the game&apos;s biggest, brightest stars.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Starting off with <strong>Jake Wood</strong> striking out for the Tigers <strong>141</strong> times in 731 player appearances in 1941,
                    and Twins Power legend, <strong>Harmon Killebrew</strong> besting him a year later, with <strong>142</strong> in 666 plate appearances, the growth of the game was ready
                    to show off it&apos;s best, and it would not take long. After seeing the record broken twice in 
                    as many years, outfielder Dave Nicholson decided he was done playing around and showed off dominance not seen in many, many, many years. In 1963, in only 520 plate appearances
                    for the Chicago White Sox, <strong>Dave Nicholson</strong> would swing and miss enough times to rack up an impressive <strong>175</strong> strikeouts.
                    On August 27, he would strike out 4 times, breaking the record
                    with 145 strikeouts. He would then cruise on striking out 30 more times after that, smashing a record that wouldn&apos;t be beaten by more than 10 since 1910. A run so insane that many 
                    probably didn&apos;t think the record could ever be broken again. He would hold that record for only 6 seasons, until the longest holder in the history of the game would step in. 
                    A man whose name is known by many, and will be remembered forever for his other contributions to the game.

                </p>
                <p className="text-lg leading-relaxed mb-6">
                    In 1969, <strong>Bobby Bonds</strong> would play his first full season for the San Francison Giants. Maybe best known for being the father of Giant&apos;s legend, Barry Bonds, Bobby was 
                    ready to set records of his own. In 1969, he would go on to strike out <strong>187</strong> times in 720 plate appearances. A number that wouldn&apos;t be matched by another human again until the 
                    turn of the millennium. The only person who had a chance was himself, who repeated the feat in 1970, 2 upping himself, striking out <strong>189</strong> times in 745 plate appearances. Bonds had many 
                    people try to break his record, many getting close, but ultimately coming up short, a truly great run that would culminate in him holding the record for 35 seasons, a truly remarkable feat.
                    
                </p>
                <p>Notables during the expansion era:</p>
                <ul className="text-sm list-disc list-inside space-y-2 ml-6 mb-6">
                    <li>Phillies Hall of Famer, Mike Schmidt, who made his best run of the record in 1975 with 180 strikeouts in 674 plate appearances.</li>
                    <li>Ranger and journeyman left fielder, Pete Incaviglia, whose debut season with the Rangers led to him striking out 185 times in 606 plate appearances.</li>
                    <li>Rob Deer, who came up short in 1987, striking out 186 times in only 566 plate appearances.</li>
                    <li>Cecil Fielder, who is probably best known for hitting the exact same number of homers as his son Prince, struck out 182 times in 673 plate appearances in 1990.</li>
                    <li>Preston Wilson, a center fielder for Florida, matched Bonds&apos; first record with 187 in 674 plate appearances in 2000.</li>
                    <li>José Hernández, a Cub and journeyman infielder, who had many great attempts, from 2001 to 2003, striking out 185, 188 and 177 times respectively.</li>
                    <li>Other Notable Sluggers:  Reggie Jackson, who made the leaderboard a few times, 2 sport athlete Bo Jackson and Jim Thome.</li>
                </ul>
                <StrikeoutGraphs cfg={expansionCfg} strikeoutData={strikeoutData}/>
            </section>
            <section id="modern-game" className="mb-12">
                <span className="block text-2xl font-mono uppercase tracking-widest text-primary mb-1">
                    Chapter 6
                </span>
                <h2 className="text-3xl font-semibold mb-3">
                    The Modern Game - Three True Outcomes
                    <span className="block text-lg italic font-normal text-primary/70 mt-2 ml-4">
                        (2004&ndash;2024)
                    </span>
                </h2>
                <p className="text-lg leading-relaxed mb-6">
                    With the turn of the century and millennium, analytics and sabermetrics started to take their stranglehold on the game. Singles and contact
                    hitting started to lose value. Walks and long balls began to explode in popularity, and with the change of time, velocities started rising faster
                    than tides on a stormy day, and elbows started blowing up left and right trying to keep up with it all. A new era had dawned.
                    Baseball stopped being played on the field, and started being played in the brains of &quot;nerds&quot; and their computers.
                    No longer does the game look like it ever has, and the old strikeout records of yesteryear will very quickly become the everyday status quo. This is the 
                    start of the three true outcome era.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    With teams quickly finding out that 4 bases is greater than 1 base, teams started scouting for hulking mammoths that would swing out of their cleats,
                    even with two strikes. They also realized that faster fastballs get more outs than slower fastballs, and modern diets and training lead to metric chasing
                    never before seen. Adults, parents and kids all start chasing exit velocity and launch angle, along with velocity and movement. The data at the fingertips
                    of players and trainers at all levels has exploded the talent to new heights. The game is not the same game Rhynie Wolters played, and it will not look like the game he played again. 
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    This new era quickly begins. <strong>Adam Dunn</strong>, a long-time Cincinnati Reds left fielder, began the trend of swing-and-miss sluggers. He would break the long-standing
                    Bonds&apos; record, with <strong>195</strong> strikeouts in 681 plate appearances in 2004, and continues striving for swing and miss excellence, making many runs at the record over his 14-year career
                    and throwing his hat in the ring as a man who could potentially be the first to 200.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                    Holding the record for only 3 seasons, and trying his best, he would eventually be bested by career Phillie first basemen, <strong>Ryan Howard</strong>, who would strike out <strong>199</strong> times,
                    both in 2007 and 2008, in 648 and 700 plate appearances, respectively. With these massive sluggers caring more about the long ball than anything else, the race for 200 was on, and it appeared that Dunn and 
                    Howard would be the early favourite to break the once-thought-impossible, but now obtainable barrier. But we wouldn&apos;t have to wait long, as in 2008, during the great
                    race for 200, <strong>Mark Reynolds</strong> would come out of nowhere and start his career striking out at a rate unheard of. Striking out <strong>204</strong> times and being the first to break that 
                    magical barrier in 2008, he would lead the league 4 more times, but most impressively in the 2009 season, he would strike out a record amount, <strong>223</strong> times in 662 appearances. An 
                    incredible number, only approached once, by Adam Dunn in 2012, when he wiffed 222 times, but falling short, we leave off with the true champion of K, the current 
                    strikeout King, Mark Reynolds. 
                </p>
                <StrikeoutGraphs cfg={modernCfg} strikeoutData={strikeoutData}/>
            </section>
            <section id="epilogue" className="mb-12">
                <h2 className="text-2xl font-semibold mb-3">
                    Epilogue
                </h2>
                <p className="text-lg leading-relaxed">
                    Obviously, the game has evolved and changed in a way no one could ever imagine. Even though this article is written in jest, it says a lot about
                    how far the game has come, and still shows how good these players have to be to get the playing time required to strike out that much. Lord only knows how much worse
                    these numbers could be if I, or some of you, the readers, were to step into the box for the amount of plate appearances these sluggers get. With that, I leave you 
                    the extra graphs and formats I played around with when researching this topic.
                </p>
                <p className="text-lg leading-relaxed">
                </p>
            </section>

            <section id="graphs">
                <h2>Season Strikeout Record, Graphed against Current K Record</h2>
                <div 
                    className="overflow-x-auto"
                    style={{
                        minHeight: '400px',
                        width: '100%',
                        maxWidth: `${Math.max(640, strikeoutData.yearlyLeaders.length * 20)}px`
                    }}
                >
                    <MultiLinePlot
                        data={[
                            strikeoutData.yearlyLeaders.map(d => d.y),
                            strikeoutData.records.map(d => d.y)
                        ]}
                        showDataLabels={false}
                        // dataLabels={[dataLabels, dataLabels2]}
                        dataLabelRotation={-90}
                        dataLabelFontSize={14}
                        width={Math.max(640, strikeoutData.yearlyLeaders.length * 20)}//dynamic width
                        dataPointCircles={false}
                        marginLeft={50}
                        lineColors={["white", "red"]}
                        xLabels={strikeoutData.yearlyLeaders.map(d => d.x)}
                        xLabelTickSteps={1}
                        rotateLabels={45}
                        marginBottom={50}
                        
                    />
                </div>
                <h2>Single Season Strikeout Record for each Individual Season - Full Graph</h2>
                <div 
                    className="overflow-x-auto"
                    style={{
                        minHeight: '500px',
                        width: '100%',
                        maxWidth: `${Math.max(640, strikeoutData.yearlyLeaders.length * 20)}px`
                    }}
                >
                    <GraphSlider
                        graphs={[
                            <LinePlot
                                key="Single-Season-Strikeout-Record-Line-Plot"
                                data={strikeoutData.yearlyLeaders.map(d => d.y)}
                                dataLabels={strikeoutData.yearlyLeaders.map(d => d.label)}
                                dataLabelRotation={-90}
                                dataLabelFontSize={14}
                                height={500}
                                width={Math.max(640, strikeoutData.yearlyLeaders.length * 20)} //dynamic width
                                // dataPointCircles={false}
                                marginLeft={50}
                                marginBottom={50}
                                xLabels={strikeoutData.yearlyLeaders.map(d => d.x)}
                                xLabelTickSteps={1}
                                rotateLabels={45}
                                yAxisLabel="Strikeouts (K)"
                                xAxisLabel="Year"
                            />,
                            <BarGraph
                                key="Single-Season-Strikeout-Record-Bar-Graph"
                                data={strikeoutData.yearlyLeaders.map(d => d.y)}
                                barLabels={strikeoutData.yearlyLeaders.map(d => d.label)}
                                barLabelRotation={-90} // 0 or +/-90
                                barLabelFontSize={14}
                                // width={640}
                                width={Math.max(640, strikeoutData.yearlyLeaders.length * 20)} //dynamic width
                                height={500}
                                marginLeft={50}
                                marginBottom={50}
                                xLabels={strikeoutData.yearlyLeaders.map(d => d.x)}
                                // xLabelColor="black"
                                rotateLabels={45}
                            />
                        ]}
                    />
                </div>
                <h2>Full Record progression Timeline</h2>
                <div 
                    className="overflow-x-auto"
                    style={{
                        minHeight: '500px',
                        width: '100%',
                        maxWidth: `${Math.max(640, strikeoutData.records.length * 20)}px`
                    }}
                >
                    <GraphSlider
                        key="Full-Record-Progression-Graphs-Slider" 
                        graphs={[
                            <LinePlot
                                key="Full-Record-Progression-Line-Plot"
                                data={strikeoutData.records.map(d => d.y)}
                                dataLabels={strikeoutData.records.map(d => d.label)}
                                dataLabelRotation={-90} // 0 or +/-90
                                dataLabelFontSize={14}
                                // width={640}
                                width={Math.max(640, strikeoutData.records.length * 20)}
                                height={500}
                                marginLeft={50}
                                marginBottom={50}
                                xLabels={strikeoutData.records.map(d => d.x)}
                                // xLabelColor="black"
                                rotateLabels={45}
                                yAxisLabel="Strikeouts (K)"
                                xAxisLabel="Year"
                            />,
                            <BarGraph
                                key="Full-Record-Progression-Bar-Graph"
                                data={strikeoutData.records.map(d => d.y)}
                                barLabels={strikeoutData.records.map(d => d.label)}
                                barLabelRotation={-90} // 0 or +/-90
                                barLabelFontSize={14}
                                // width={640}
                                width={Math.max(640, strikeoutData.records.length * 20)}
                                height={500}
                                marginLeft={50}
                                marginBottom={50}
                                xLabels={strikeoutData.records.map(d => d.x)}
                                // xLabelColor="black"
                                rotateLabels={45}
                            />

                        ]}
                    />
                </div>

                <h2>League Wide Strikeout Totals</h2>
                <div 
                    className="overflow-x-auto"
                    style={{
                        minHeight: '500px',
                        width: '100%',
                        maxWidth: `${Math.max(640, strikeoutData.leagueWide.length * 20)}px`
                    }}
                >
                    <GraphSlider
                        graphs={[
                            <LinePlot
                                key="League-Wide-Strikeout-Totals-Line-Graph"
                                data={strikeoutData.leagueWide.map(d => d.y)}
                                // dataLabels={dataLabels3}
                                dataLabelRotation={-90} // 0 or +/-90
                                dataLabelFontSize={14}
                                // width={640}
                                width={Math.max(640, strikeoutData.leagueWide.length * 20)} //dynamic width
                                height={500}
                                marginLeft={45}
                                marginBottom={50}
                                xLabels={strikeoutData.leagueWide.map(d => d.x)}
                                // xLabelColor="black"
                                rotateLabels={45}
                                yAxisLabel="Strikeouts (K)"
                                xAxisLabel="Year"
                            />,
                            <BarGraph
                                key="League-Wide-Strikeout-Totals-Bar-Graph"
                                data={strikeoutData.leagueWide.map(d => d.y)}
                                // barLabels={dataLabels3}
                                barLabelRotation={-90} // 0 or +/-90
                                barLabelFontSize={14}
                                // width={640}
                                width={Math.max(640, strikeoutData.leagueWide.length * 20)} //dynamic width
                                height={500}
                                marginLeft={45}
                                marginBottom={50}
                                xLabels={strikeoutData.leagueWide.map(d => d.x)}
                                // xLabelColor="black"
                                rotateLabels={45}
                            />
                        ]}
                    />
                </div>
                <h2>Leaders Strikeout As a Percentage of League Wide Totals</h2>
                <div 
                    className="overflow-x-auto"
                    style={{
                        minHeight: '500px',
                        width: '100%',
                        maxWidth: `${Math.max(640, strikeoutData.percentages.length * 20)}px`
                    }}
                >
                    <GraphSlider
                        // key="Full-Record-Progression-Graphs-Slider" 
                        graphs={[
                            <LinePlot
                                key="Leaders-Strikeout-As-a-Percentage-of-League-Wide-Totals-Line-Graph"
                                data={strikeoutData.percentages.map(d => d.y)}
                                dataLabels={strikeoutData.percentages.map(d => d.label)}
                                dataLabelRotation={-90} // 0 or +/-90
                                dataLabelFontSize={14}
                                width={Math.max(640, strikeoutData.percentages.length * 20)}
                                height={500}
                                marginLeft={50}
                                marginBottom={50}
                                xLabels={strikeoutData.percentages.map(d => d.x)}
                                rotateLabels={45}
                                yAxisLabel="Strikeouts (K)"
                                xAxisLabel="Year"
                            />,
                            <BarGraph
                                key="Leaders-Strikeout-As-a-Percentage-of-League-Wide-Totals-Bar-Graph"
                                data={strikeoutData.percentages.map(d => d.y)}
                                barLabels={strikeoutData.percentages.map(d => d.label)}
                                barLabelRotation={-90} // 0 or +/-90
                                barLabelFontSize={14}
                                width={Math.max(640, strikeoutData.percentages.length * 20)}
                                height={500}
                                marginLeft={50}
                                marginBottom={50}
                                xLabels={strikeoutData.percentages.map(d => d.x)}
                                rotateLabels={45}
                            />

                        ]}
                    />
                </div>
            </section>
            <p className="w-full pt-8 text-center text-sm text-primary"
            >
                Graphed Data courtesy of the <a href="https://sabr.org/lahman-database/">Lahman Baseball Database</a>
            </p>
    </>
    );
}
