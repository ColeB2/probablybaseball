import LinePlot from "@/components/Graphs/Lineplot";
import GraphSlider from "@/components/GraphSlider/GraphSlider";


interface ConfigType {
    start: number;
    end: number | undefined;
    era: string;
    years: string;
    ariaLabel: string;
    keys: string[];
    graphs: ("yearlyLeaders" | "records")[];
    yAxisLabels: string[];
    xAxisLabels: string[];
    alt: string[];
    desc: string[];
    
}
interface StrikeoutPoint {
  x: string;   // The year (e.g., "1901")
  y: number;   // The stat (e.g., 3.45)
  label: string; // The player name or context (e.g., "Cy Young")
}

type StrikeoutDataMap = Record<string, StrikeoutPoint[]>;
// 1. Create a reusable wrapper
export default function StrikeoutGraphs({ cfg, strikeoutData }: { cfg: ConfigType, strikeoutData: StrikeoutDataMap }) {
  return (
    <div style={{minHeight: '500px', width: '100%', maxWidth: '780px'}}>
        <GraphSlider
            ariaLabel={cfg.ariaLabel}
            graphs={cfg.graphs.map((graphName, i) => {
                const rawSlice = strikeoutData[graphName].slice(cfg.start, cfg.end);
                const dynamicAlt = `${cfg.era}: ${cfg.alt[i]}`;
                const dynamicDesc = `${cfg.desc[i]} during the ${cfg.era} (${cfg.years}).`;
                return (
                    <LinePlot
                        key={cfg.keys[i]}
                        data={rawSlice.map((d) => d.y)}
                        dataLabels={rawSlice.map((d) => d.label)}
                        xLabels={rawSlice.map((d) => d.x)}
                        alt={dynamicAlt}
                        desc={dynamicDesc}
                        yAxisLabel={cfg.yAxisLabels[i]}
                        xAxisLabel={cfg.xAxisLabels[i]}
                        // ... set your defaults here once
                        width={780}
                        height={500}
                        marginLeft={50}
                        marginBottom={50}
                        dataLabelRotation={-90}
                        dataLabelFontSize={14}
                        rotateLabels={45}
                    />
                );
            })}
        />
    </div>
  );
}