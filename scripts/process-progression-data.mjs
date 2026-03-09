import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const DATA_ROOT = './public/data';
const OUTPUT_ROOT = './src/generated';

function formatTemplate(template, row) {
    return template.replace(/{(\w+)}/g, (_, key) => {
        let val = row[key];
        if (val === undefined || val === null) return "";
        
        // If it's a number, we convert to string to perform the .0 cleanup
        const strVal = String(val);
        return strVal.replace(".0", "");
    });
}

const manifest = JSON.parse(fs.readFileSync('./data-config.json', 'utf-8'));

manifest.articles.forEach(article => {
    const fullData = {};

    article.charts.forEach(c => {
        const rows = parse(fs.readFileSync(path.join(DATA_ROOT, article.folder, c.file), 'utf-8'), { 
            columns: true, 
            cast: true 
        });

        fullData[c.slug] = rows.map(r => {
            const xKey = c.map.x;
            const yKey = c.map.y;
            
            // 1. Determine the numeric value for 'y'
            let roundedY = Number(r[yKey]);
            if (c.slug === 'percentages') {
                roundedY = parseFloat(roundedY.toFixed(2));
            }

            // 2. Create a "Clean Row" for the template
            // We ensure the template sees the rounded number, not the raw CSV string
            const cleanRowForTemplate = { 
                ...r, 
                [yKey]: roundedY 
            };

            return {
                x: String(r[xKey]),
                y: roundedY,
                // 3. Now formatTemplate pulls from cleanRowForTemplate
                label: formatTemplate(c.map.label, cleanRowForTemplate)
            };
        });
    });

    if (!fs.existsSync(OUTPUT_ROOT)) fs.mkdirSync(OUTPUT_ROOT, { recursive: true });
    fs.writeFileSync(path.join(OUTPUT_ROOT, `${article.id}.json`), JSON.stringify(fullData, null, 2));
});