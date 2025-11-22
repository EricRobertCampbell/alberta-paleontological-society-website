import { c as createComponent, b as createAstro, m as maybeRenderHead, a as renderTemplate, e as defineScriptVars, r as renderComponent } from '../../../chunks/astro/server_DfjRAjzK.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../../chunks/Layout_CYpN8CjO.mjs';
import { $ as $$HeadingWithBackground } from '../../../chunks/HeadingWithBackground_DUFFj7ww.mjs';
import { $ as $$Alert } from '../../../chunks/Alert_C8qNr_ez.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_kjL--9gh.mjs';
import 'clsx';
/* empty css                                      */
export { renderers } from '../../../renderers.mjs';

function getTotalSorted(jar) {
  if (jar.initialWeightGrams === void 0 || jar.finalWeightGrams === void 0) {
    return 0;
  }
  return jar.finalWeightGrams - jar.initialWeightGrams;
}

const $$Astro = createAstro();
const $$BestWorstDays = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BestWorstDays;
  const { bestDay, worstDay, bestLabel, worstLabel, valueFormatter } = Astro2.props;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };
  return renderTemplate`${maybeRenderHead()}<div class="best-worst-days" data-astro-cid-zzryylxi> <div class="stat" data-astro-cid-zzryylxi> <div class="stat-label" data-astro-cid-zzryylxi>${bestLabel}</div> <div class="stat-value" data-astro-cid-zzryylxi>${valueFormatter(bestDay.value)}</div> <div class="stat-date" data-astro-cid-zzryylxi>${formatDate(bestDay.date)}</div> </div> <div class="stat" data-astro-cid-zzryylxi> <div class="stat-label" data-astro-cid-zzryylxi>${worstLabel}</div> <div class="stat-value" data-astro-cid-zzryylxi>${valueFormatter(worstDay.value)}</div> <div class="stat-date" data-astro-cid-zzryylxi>${formatDate(worstDay.date)}</div> </div> </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/graphs/BestWorstDays.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(raw || cooked.slice()) }));
var _a$3;
const $$AmountSortedGraph = createComponent(async ($$result, $$props, $$slots) => {
  const fossilData = await getCollection("fossilSortingData");
  const totalCollectedData = fossilData.reduce((acc, fossilEntry) => {
    const { data } = fossilEntry;
    if (!data.date) {
      return acc;
    }
    const date = new Date(data.date);
    const totalSorted = data.jars.reduce((acc2, jar) => {
      const jarChange = getTotalSorted(jar);
      if (jarChange > 0) {
        return acc2;
      }
      return acc2 + Math.abs(jarChange);
    }, 0);
    if (totalSorted !== void 0 && totalSorted !== null && totalSorted > 0) {
      acc.push({
        date,
        totalGrams: totalSorted,
        notes: data.notes
      });
    }
    return acc;
  }, []);
  totalCollectedData.sort((a, b) => a.date.getTime() - b.date.getTime());
  const bestDayAmount = totalCollectedData.reduce(
    (best, current) => current.totalGrams > best.totalGrams ? current : best
  );
  const worstDayAmount = totalCollectedData.reduce(
    (worst, current) => current.totalGrams < worst.totalGrams ? current : worst
  );
  const chartData = totalCollectedData.map((item) => ({
    date: item.date.toISOString().split("T")[0],
    // Format as YYYY-MM-DD
    totalGrams: Number(item.totalGrams),
    notes: item.notes
  }));
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", " ", '<div class="graph-container" data-astro-cid-6ehqmtsd> <canvas id="amount-sorted-chart" data-astro-cid-6ehqmtsd></canvas> </div> <script defer>(function(){', "\n	// Wait for Chart.js to be available\n	function initChart() {\n		if (typeof Chart === 'undefined') {\n			// Chart.js not loaded yet, try again shortly\n			setTimeout(initChart, 50);\n			return;\n		}\n\n		const ctx = document.getElementById('amount-sorted-chart');\n		if (!ctx) {\n			throw new Error('Canvas element not found');\n		}\n\n		// Get CSS color variable\n		const root = document.documentElement;\n		const accentColor = getComputedStyle(root).getPropertyValue('--accent-colour-5-medium').trim();\n\n		// Parse dates for proper sorting and display\n		const labels = chartData.map(item => item.date);\n		const dataPoints = chartData.map(item => item.totalGrams);\n		const notesData = chartData.map(item => item.notes);\n\n		new Chart(ctx, {\n		type: 'line',\n		data: {\n			labels: labels,\n			datasets: [{\n				label: 'Total Amount Sorted (grams)',\n				data: dataPoints,\n				borderColor: accentColor,\n				backgroundColor: accentColor.replace(')', ', 0.2)').replace('hsl', 'hsla'),\n				tension: 0.1,\n				fill: true\n			}]\n		},\n		options: {\n			responsive: true,\n			maintainAspectRatio: false,\n			scales: {\n				x: {\n					title: {\n						display: true,\n						text: 'Date'\n					},\n					ticks: {\n						maxRotation: 45,\n						minRotation: 45\n					}\n				},\n				y: {\n					beginAtZero: true,\n					title: {\n						display: true,\n						text: 'Amount Sorted (grams)'\n					}\n				}\n			},\n			plugins: {\n				title: {\n					display: true,\n					text: 'Total Amount Sorted Over Time'\n				},\n				legend: {\n					display: true,\n					position: 'top'\n				},\n				tooltip: {\n					callbacks: {\n						afterBody: (tooltipItems) => {\n							const tooltipIndex = tooltipItems[0].dataIndex;\n							const notes = notesData[tooltipIndex];\n							if (notes) {\n								return `\\nNote: ${notes}`;\n							}\n							return '';\n						}\n					}\n				}\n			}\n		}\n		});\n	}\n\n	initChart();\n})();<\/script> "], ["", " ", '<div class="graph-container" data-astro-cid-6ehqmtsd> <canvas id="amount-sorted-chart" data-astro-cid-6ehqmtsd></canvas> </div> <script defer>(function(){', "\n	// Wait for Chart.js to be available\n	function initChart() {\n		if (typeof Chart === 'undefined') {\n			// Chart.js not loaded yet, try again shortly\n			setTimeout(initChart, 50);\n			return;\n		}\n\n		const ctx = document.getElementById('amount-sorted-chart');\n		if (!ctx) {\n			throw new Error('Canvas element not found');\n		}\n\n		// Get CSS color variable\n		const root = document.documentElement;\n		const accentColor = getComputedStyle(root).getPropertyValue('--accent-colour-5-medium').trim();\n\n		// Parse dates for proper sorting and display\n		const labels = chartData.map(item => item.date);\n		const dataPoints = chartData.map(item => item.totalGrams);\n		const notesData = chartData.map(item => item.notes);\n\n		new Chart(ctx, {\n		type: 'line',\n		data: {\n			labels: labels,\n			datasets: [{\n				label: 'Total Amount Sorted (grams)',\n				data: dataPoints,\n				borderColor: accentColor,\n				backgroundColor: accentColor.replace(')', ', 0.2)').replace('hsl', 'hsla'),\n				tension: 0.1,\n				fill: true\n			}]\n		},\n		options: {\n			responsive: true,\n			maintainAspectRatio: false,\n			scales: {\n				x: {\n					title: {\n						display: true,\n						text: 'Date'\n					},\n					ticks: {\n						maxRotation: 45,\n						minRotation: 45\n					}\n				},\n				y: {\n					beginAtZero: true,\n					title: {\n						display: true,\n						text: 'Amount Sorted (grams)'\n					}\n				}\n			},\n			plugins: {\n				title: {\n					display: true,\n					text: 'Total Amount Sorted Over Time'\n				},\n				legend: {\n					display: true,\n					position: 'top'\n				},\n				tooltip: {\n					callbacks: {\n						afterBody: (tooltipItems) => {\n							const tooltipIndex = tooltipItems[0].dataIndex;\n							const notes = notesData[tooltipIndex];\n							if (notes) {\n								return \\`\\\\nNote: \\${notes}\\`;\n							}\n							return '';\n						}\n					}\n				}\n			}\n		}\n		});\n	}\n\n	initChart();\n})();<\/script> "])), renderComponent($$result, "BestWorstDays", $$BestWorstDays, { "bestDay": { date: bestDayAmount.date.toISOString().split("T")[0], value: bestDayAmount.totalGrams }, "worstDay": { date: worstDayAmount.date.toISOString().split("T")[0], value: worstDayAmount.totalGrams }, "bestLabel": "Most Sorted", "worstLabel": "Least Sorted", "valueFormatter": (value) => `${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}g`, "data-astro-cid-6ehqmtsd": true }), maybeRenderHead(), defineScriptVars({ chartData }));
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/graphs/AmountSortedGraph.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$PeopleSortingGraph = createComponent(async ($$result, $$props, $$slots) => {
  const fossilData = await getCollection("fossilSortingData");
  const peopleSortingData = fossilData.reduce((acc, fossilEntry) => {
    const { data } = fossilEntry;
    if (!data.date || data.totalPeople === void 0 || data.totalPeople === null || data.totalPeople === 0) {
      return acc;
    }
    const date = new Date(data.date);
    acc.push({
      date,
      totalPeople: data.totalPeople,
      notes: data.notes
    });
    return acc;
  }, []);
  peopleSortingData.sort((a, b) => a.date.getTime() - b.date.getTime());
  const bestDayPeople = peopleSortingData.reduce(
    (best, current) => current.totalPeople > best.totalPeople ? current : best
  );
  const worstDayPeople = peopleSortingData.reduce(
    (worst, current) => current.totalPeople < worst.totalPeople ? current : worst
  );
  const chartData = peopleSortingData.map((item) => ({
    date: item.date.toISOString().split("T")[0],
    // Format as YYYY-MM-DD
    totalPeople: Number(item.totalPeople),
    notes: item.notes
  }));
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", " ", '<div class="graph-container" data-astro-cid-gbbkd6tl> <canvas id="people-sorting-chart" data-astro-cid-gbbkd6tl></canvas> </div> <script defer>(function(){', "\n	// Wait for Chart.js to be available\n	function initChart() {\n		if (typeof Chart === 'undefined') {\n			// Chart.js not loaded yet, try again shortly\n			setTimeout(initChart, 50);\n			return;\n		}\n\n		const ctx = document.getElementById('people-sorting-chart');\n		if (!ctx) {\n			throw new Error('Canvas element not found');\n		}\n\n		// Get CSS color variable\n		const root = document.documentElement;\n		const accentColor = getComputedStyle(root).getPropertyValue('--accent-colour-4-medium').trim();\n\n		// Parse dates for proper sorting and display\n		const labels = chartData.map(item => item.date);\n		const dataPoints = chartData.map(item => item.totalPeople);\n		const notesData = chartData.map(item => item.notes);\n\n		new Chart(ctx, {\n			type: 'line',\n			data: {\n				labels: labels,\n				datasets: [{\n					label: 'Number of People Sorting',\n					data: dataPoints,\n					borderColor: accentColor,\n					backgroundColor: accentColor.replace(')', ', 0.2)').replace('hsl', 'hsla'),\n					tension: 0.1,\n					fill: true\n				}]\n			},\n			options: {\n				responsive: true,\n				maintainAspectRatio: false,\n				scales: {\n					x: {\n						title: {\n							display: true,\n							text: 'Date'\n						},\n						ticks: {\n							maxRotation: 45,\n							minRotation: 45\n						}\n					},\n					y: {\n						beginAtZero: true,\n						title: {\n							display: true,\n							text: 'Number of People'\n						}\n					}\n				},\n				plugins: {\n					title: {\n						display: true,\n						text: 'People Sorting Over Time'\n					},\n					legend: {\n						display: true,\n						position: 'top'\n					},\n					tooltip: {\n						callbacks: {\n							afterBody: (tooltipItems) => {\n								const tooltipIndex = tooltipItems[0].dataIndex;\n								const notes = notesData[tooltipIndex];\n								if (notes) {\n									return `\\nNote: ${notes}`;\n								}\n								return '';\n							}\n						}\n					}\n				}\n			}\n		});\n	}\n\n	initChart();\n})();<\/script> "], ["", " ", '<div class="graph-container" data-astro-cid-gbbkd6tl> <canvas id="people-sorting-chart" data-astro-cid-gbbkd6tl></canvas> </div> <script defer>(function(){', "\n	// Wait for Chart.js to be available\n	function initChart() {\n		if (typeof Chart === 'undefined') {\n			// Chart.js not loaded yet, try again shortly\n			setTimeout(initChart, 50);\n			return;\n		}\n\n		const ctx = document.getElementById('people-sorting-chart');\n		if (!ctx) {\n			throw new Error('Canvas element not found');\n		}\n\n		// Get CSS color variable\n		const root = document.documentElement;\n		const accentColor = getComputedStyle(root).getPropertyValue('--accent-colour-4-medium').trim();\n\n		// Parse dates for proper sorting and display\n		const labels = chartData.map(item => item.date);\n		const dataPoints = chartData.map(item => item.totalPeople);\n		const notesData = chartData.map(item => item.notes);\n\n		new Chart(ctx, {\n			type: 'line',\n			data: {\n				labels: labels,\n				datasets: [{\n					label: 'Number of People Sorting',\n					data: dataPoints,\n					borderColor: accentColor,\n					backgroundColor: accentColor.replace(')', ', 0.2)').replace('hsl', 'hsla'),\n					tension: 0.1,\n					fill: true\n				}]\n			},\n			options: {\n				responsive: true,\n				maintainAspectRatio: false,\n				scales: {\n					x: {\n						title: {\n							display: true,\n							text: 'Date'\n						},\n						ticks: {\n							maxRotation: 45,\n							minRotation: 45\n						}\n					},\n					y: {\n						beginAtZero: true,\n						title: {\n							display: true,\n							text: 'Number of People'\n						}\n					}\n				},\n				plugins: {\n					title: {\n						display: true,\n						text: 'People Sorting Over Time'\n					},\n					legend: {\n						display: true,\n						position: 'top'\n					},\n					tooltip: {\n						callbacks: {\n							afterBody: (tooltipItems) => {\n								const tooltipIndex = tooltipItems[0].dataIndex;\n								const notes = notesData[tooltipIndex];\n								if (notes) {\n									return \\`\\\\nNote: \\${notes}\\`;\n								}\n								return '';\n							}\n						}\n					}\n				}\n			}\n		});\n	}\n\n	initChart();\n})();<\/script> "])), renderComponent($$result, "BestWorstDays", $$BestWorstDays, { "bestDay": { date: bestDayPeople.date.toISOString().split("T")[0], value: bestDayPeople.totalPeople }, "worstDay": { date: worstDayPeople.date.toISOString().split("T")[0], value: worstDayPeople.totalPeople }, "bestLabel": "Most People", "worstLabel": "Fewest People", "valueFormatter": (value) => `${value} ${value === 1 ? "person" : "people"}`, "data-astro-cid-gbbkd6tl": true }), maybeRenderHead(), defineScriptVars({ chartData }));
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/graphs/PeopleSortingGraph.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$EfficiencyGraph = createComponent(async ($$result, $$props, $$slots) => {
  const fossilData = await getCollection("fossilSortingData");
  const efficiencyData = fossilData.reduce((acc, fossilEntry) => {
    const { data } = fossilEntry;
    if (!data.date || data.totalPeople === void 0 || data.totalPeople === 0) {
      return acc;
    }
    const date = new Date(data.date);
    const totalSorted = data.jars.reduce((acc2, jar) => {
      const jarChange = getTotalSorted(jar);
      if (jarChange > 0) {
        return acc2;
      }
      return acc2 + Math.abs(jarChange);
    }, 0);
    const efficiency = totalSorted / data.totalPeople;
    if (efficiency !== void 0 && efficiency !== null && !isNaN(efficiency) && efficiency > 0) {
      acc.push({
        date,
        efficiency,
        notes: data.notes
      });
    }
    return acc;
  }, []);
  efficiencyData.sort((a, b) => a.date.getTime() - b.date.getTime());
  const bestDayEfficiency = efficiencyData.reduce(
    (best, current) => current.efficiency > best.efficiency ? current : best
  );
  const worstDayEfficiency = efficiencyData.reduce(
    (worst, current) => current.efficiency < worst.efficiency ? current : worst
  );
  const chartData = efficiencyData.map((item) => ({
    date: item.date.toISOString().split("T")[0],
    // Format as YYYY-MM-DD
    efficiency: Number(item.efficiency.toFixed(2)),
    // Round to 2 decimal places
    notes: item.notes
  }));
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", " ", '<div class="graph-container" data-astro-cid-3unaojhb> <canvas id="efficiency-chart" data-astro-cid-3unaojhb></canvas> </div> <script defer>(function(){', "\n	// Wait for Chart.js to be available\n	function initChart() {\n		if (typeof Chart === 'undefined') {\n			// Chart.js not loaded yet, try again shortly\n			setTimeout(initChart, 50);\n			return;\n		}\n\n		const ctx = document.getElementById('efficiency-chart');\n		if (!ctx) {\n			throw new Error('Canvas element not found');\n		}\n\n		// Get CSS color variable\n		const root = document.documentElement;\n		const accentColor = getComputedStyle(root).getPropertyValue('--accent-colour-1-medium').trim();\n\n		// Parse dates for proper sorting and display\n		const labels = chartData.map(item => item.date);\n		const dataPoints = chartData.map(item => item.efficiency);\n		const notesData = chartData.map(item => item.notes);\n\n		new Chart(ctx, {\n			type: 'line',\n			data: {\n				labels: labels,\n				datasets: [{\n					label: 'Grams Sorted per Person per Session',\n					data: dataPoints,\n					borderColor: accentColor,\n					backgroundColor: accentColor.replace(')', ', 0.2)').replace('hsl', 'hsla'),\n					tension: 0.1,\n					fill: true\n				}]\n			},\n			options: {\n				responsive: true,\n				maintainAspectRatio: false,\n				scales: {\n					x: {\n						title: {\n							display: true,\n							text: 'Date'\n						},\n						ticks: {\n							maxRotation: 45,\n							minRotation: 45\n						}\n					},\n					y: {\n						beginAtZero: true,\n						title: {\n							display: true,\n							text: 'Grams per Person per Session'\n						}\n					}\n				},\n				plugins: {\n					title: {\n						display: true,\n						text: 'Sorting Efficiency Over Time'\n					},\n					legend: {\n						display: true,\n						position: 'top'\n					},\n					tooltip: {\n						callbacks: {\n							afterBody: (tooltipItems) => {\n								const tooltipIndex = tooltipItems[0].dataIndex;\n								const notes = notesData[tooltipIndex];\n								if (notes) {\n									return `\\nNote: ${notes}`;\n								}\n								return '';\n							}\n						}\n					}\n				}\n			}\n		});\n	}\n\n	initChart();\n})();<\/script> "], ["", " ", '<div class="graph-container" data-astro-cid-3unaojhb> <canvas id="efficiency-chart" data-astro-cid-3unaojhb></canvas> </div> <script defer>(function(){', "\n	// Wait for Chart.js to be available\n	function initChart() {\n		if (typeof Chart === 'undefined') {\n			// Chart.js not loaded yet, try again shortly\n			setTimeout(initChart, 50);\n			return;\n		}\n\n		const ctx = document.getElementById('efficiency-chart');\n		if (!ctx) {\n			throw new Error('Canvas element not found');\n		}\n\n		// Get CSS color variable\n		const root = document.documentElement;\n		const accentColor = getComputedStyle(root).getPropertyValue('--accent-colour-1-medium').trim();\n\n		// Parse dates for proper sorting and display\n		const labels = chartData.map(item => item.date);\n		const dataPoints = chartData.map(item => item.efficiency);\n		const notesData = chartData.map(item => item.notes);\n\n		new Chart(ctx, {\n			type: 'line',\n			data: {\n				labels: labels,\n				datasets: [{\n					label: 'Grams Sorted per Person per Session',\n					data: dataPoints,\n					borderColor: accentColor,\n					backgroundColor: accentColor.replace(')', ', 0.2)').replace('hsl', 'hsla'),\n					tension: 0.1,\n					fill: true\n				}]\n			},\n			options: {\n				responsive: true,\n				maintainAspectRatio: false,\n				scales: {\n					x: {\n						title: {\n							display: true,\n							text: 'Date'\n						},\n						ticks: {\n							maxRotation: 45,\n							minRotation: 45\n						}\n					},\n					y: {\n						beginAtZero: true,\n						title: {\n							display: true,\n							text: 'Grams per Person per Session'\n						}\n					}\n				},\n				plugins: {\n					title: {\n						display: true,\n						text: 'Sorting Efficiency Over Time'\n					},\n					legend: {\n						display: true,\n						position: 'top'\n					},\n					tooltip: {\n						callbacks: {\n							afterBody: (tooltipItems) => {\n								const tooltipIndex = tooltipItems[0].dataIndex;\n								const notes = notesData[tooltipIndex];\n								if (notes) {\n									return \\`\\\\nNote: \\${notes}\\`;\n								}\n								return '';\n							}\n						}\n					}\n				}\n			}\n		});\n	}\n\n	initChart();\n})();<\/script> "])), renderComponent($$result, "BestWorstDays", $$BestWorstDays, { "bestDay": { date: bestDayEfficiency.date.toISOString().split("T")[0], value: bestDayEfficiency.efficiency }, "worstDay": { date: worstDayEfficiency.date.toISOString().split("T")[0], value: worstDayEfficiency.efficiency }, "bestLabel": "Most Efficient", "worstLabel": "Least Efficient", "valueFormatter": (value) => `${value.toFixed(2)}g/person`, "data-astro-cid-3unaojhb": true }), maybeRenderHead(), defineScriptVars({ chartData }));
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/graphs/EfficiencyGraph.astro", void 0);

const $$YearlyTotals = createComponent(async ($$result, $$props, $$slots) => {
  const fossilData = await getCollection("fossilSortingData");
  const yearDataMap = /* @__PURE__ */ new Map();
  fossilData.forEach((fossilEntry) => {
    const { data } = fossilEntry;
    if (!data.date) return;
    const date = new Date(data.date);
    const year = date.getFullYear();
    if (!yearDataMap.has(year)) {
      yearDataMap.set(year, {
        year,
        gramsSorted: 0,
        personHours: 0
      });
    }
    const yearData = yearDataMap.get(year);
    const totalSorted = data.jars.reduce((acc, jar) => {
      const jarChange = getTotalSorted(jar);
      if (jarChange > 0) {
        return acc;
      }
      return acc + Math.abs(jarChange);
    }, 0);
    yearData.gramsSorted += totalSorted;
    if (data.totalPeople && data.sessionDurationMinutes) {
      const hours = data.sessionDurationMinutes / 60;
      yearData.personHours += data.totalPeople * hours;
    }
  });
  const sortedYears = Array.from(yearDataMap.values()).sort((a, b) => b.year - a.year);
  return renderTemplate`${maybeRenderHead()}<div class="yearly-totals" data-astro-cid-pngr55p5> <h3 data-astro-cid-pngr55p5>Yearly Totals</h3> <div class="totals-grid" data-astro-cid-pngr55p5> <div class="total-item" data-astro-cid-pngr55p5> <div class="total-label" data-astro-cid-pngr55p5>Amount Sorted</div> <div class="total-values" data-astro-cid-pngr55p5> ${sortedYears.map((yearData) => renderTemplate`<div class="year-value" data-astro-cid-pngr55p5> <span class="year" data-astro-cid-pngr55p5>${yearData.year}</span> <span class="value" data-astro-cid-pngr55p5>${yearData.gramsSorted.toLocaleString("en-US", { maximumFractionDigits: 0 })}g</span> </div>`)} </div> </div> <div class="total-item" data-astro-cid-pngr55p5> <div class="total-label" data-astro-cid-pngr55p5>Person-Hours</div> <div class="total-values" data-astro-cid-pngr55p5> ${sortedYears.map((yearData) => renderTemplate`<div class="year-value" data-astro-cid-pngr55p5> <span class="year" data-astro-cid-pngr55p5>${yearData.year}</span> <span class="value" data-astro-cid-pngr55p5>${yearData.personHours.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}h</span> </div>`)} </div> </div> </div> </div> `;
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/components/graphs/YearlyTotals.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const prerender = true;
const $$Data = createComponent(async ($$result, $$props, $$slots) => {
  await getCollection("fossilSortingData");
  return renderTemplate(_a || (_a = __template(["", '  <script src="https://cdn.jsdelivr.net/npm/chart.js" defer><\/script>'])), renderComponent($$result, "Layout", $$Layout, { "subtitle": "Fossil Sorting Data", "data-astro-cid-r37zgaqr": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeadingWithBackground", $$HeadingWithBackground, { "background": "/events/2025/fishSkull.jpeg", "backgroundPositionY": "50%", "data-astro-cid-r37zgaqr": true }, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-r37zgaqr>Fossil Sorting Data</h1> ` })} <p data-astro-cid-r37zgaqr>
Welcome to our fossil sorting data exploration page! This is where you can discover insights and statistics about our fossil sorting sessions. Here you'll find data visualizations, trends, and analysis related to our microfossil sorting efforts and the contributions of our dedicated volunteers.
</p> <section data-astro-cid-r37zgaqr> <h2 data-astro-cid-r37zgaqr>About This Data</h2> <p data-astro-cid-r37zgaqr>
This page showcases data collected from our fossil sorting sessions, including participation statistics, fossil discovery rates, and other metrics that help us understand the impact and progress of our research activities. The data helps us track our contributions to paleontological research and recognize the valuable work of our volunteers.
</p> <p data-astro-cid-r37zgaqr> <a href="/events/fossilsorting/data.json" download="fossilSortingData.json" data-astro-cid-r37zgaqr>
📥 Download the raw data as JSON
</a> </p> ${renderComponent($$result2, "Alert", $$Alert, { "data-astro-cid-r37zgaqr": true }, { "default": ($$result3) => renderTemplate` <strong data-astro-cid-r37zgaqr>Disclaimer:</strong> This data is provided for interest only and should generally be considered unreliable. The measurements and calculations are approximate and may contain errors or inconsistencies. This is just for fun!
` })} </section> <section data-astro-cid-r37zgaqr> <h2 data-astro-cid-r37zgaqr>Learning More</h2> <p data-astro-cid-r37zgaqr>
Interested in learning more or contributing to our fossil sorting efforts? Visit our <a href="/events/fossilsorting/" data-astro-cid-r37zgaqr>main fossil sorting page</a> to learn more about upcoming sessions and how you can participate in this exciting research activity.
</p> <p data-astro-cid-r37zgaqr>
If you would rather explore recent finds, take a look at the <a href="/events/fossilsorting/images/" data-astro-cid-r37zgaqr>Fossil Sorting image gallery</a>.
</p> </section> <section data-astro-cid-r37zgaqr> <h2 data-astro-cid-r37zgaqr>
Dashboard
</h2> ${renderComponent($$result2, "YearlyTotals", $$YearlyTotals, { "data-astro-cid-r37zgaqr": true })} <div class="graphs-grid" data-astro-cid-r37zgaqr> <div data-astro-cid-r37zgaqr> ${renderComponent($$result2, "AmountSortedGraph", $$AmountSortedGraph, { "data-astro-cid-r37zgaqr": true })} </div> <div data-astro-cid-r37zgaqr> ${renderComponent($$result2, "PeopleSortingGraph", $$PeopleSortingGraph, { "data-astro-cid-r37zgaqr": true })} </div> <div data-astro-cid-r37zgaqr> ${renderComponent($$result2, "EfficiencyGraph", $$EfficiencyGraph, { "data-astro-cid-r37zgaqr": true })} </div> </div> </section> ` }));
}, "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/data.astro", void 0);

const $$file = "/Users/ericr/documents/alberta-paleontological-society-website/src/pages/events/fossilsorting/data.astro";
const $$url = "/events/fossilsorting/data";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Data,
    file: $$file,
    prerender,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
