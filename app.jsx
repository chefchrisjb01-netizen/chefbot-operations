const { useState, useEffect } = React;

function App() {
    const [activeTab, setActiveTab] = useState('executive');

    // 1. KPI State
    const [kpis, setKpis] = useState(() => {
        const saved = localStorage.getItem('chefbot_kpis');
        return saved ? JSON.parse(saved) : [
            { id: 1, pillar: 'Financial', kpi: 'Food Cost (Overall)', target: '≤ 28.0%', actual: '28.2%', status: 'Normal' },
            { id: 2, pillar: 'Financial', kpi: 'Inventory Variance', target: '< 0.5%', actual: '0.3%', status: 'Optimal' },
            { id: 3, pillar: 'Food Safety', kpi: 'Critical Unresolved Findings', target: '0', actual: '0', status: 'Optimal' },
            { id: 4, pillar: 'Quality', kpi: 'Recipe Compliance', target: '≥ 95%', actual: '94%', status: 'Review' },
            { id: 5, pillar: 'Guest', kpi: 'Positive Food Feedback', target: '≥ 90%', actual: '95%', status: 'Optimal' },
            { id: 6, pillar: 'People', kpi: 'Training Completion', target: '≥ 95%', actual: '90%', status: 'Review' }
        ];
    });

    // 2. Fact Base Governance State
    const [factBase, setFactBase] = useState(() => {
        const saved = localStorage.getItem('chefbot_factbase');
        return saved ? JSON.parse(saved) : [
            { id: 1, topic: 'CDC Scope', current: 'ดูแล Culinary Operations ทั้ง Salt Society, Ember และ Monsoon', status: 'CONFIRMED' },
            { id: 2, topic: 'Total Team', current: '13 คน รวม CDC (Production team 12 คน)', status: 'CONFIRMED' },
            { id: 3, topic: 'Outlet Capacities', current: 'Ember 141 seats | Salt Society 112 seats | Monsoon Bar & Bistro', status: 'CONFIRMED' },
            { id: 4, topic: 'Operating Hours', current: 'Salt: 12:00-22:30 | Ember: 18:00-22:30 | Monsoon: 13:00-24:00', status: 'CONFIRMED' }
        ];
    });

    // 3. Recipe & Costing Master State
    const [recipes, setRecipes] = useState(() => {
        const saved = localStorage.getItem('chefbot_recipes');
        return saved ? JSON.parse(saved) : [
            { id: 1, name: 'Wood-Fire Grilled Australian Wagyu', outlet: 'Ember', sellingPrice: 1650, cost: 445, foodCostPercent: 26.9, category: 'Main Course' },
            { id: 2, name: 'Mediterranean Phuket Lobster', outlet: 'Salt Society', sellingPrice: 2200, cost: 638, foodCostPercent: 29.0, category: 'Seafood' },
            { id: 3, name: 'Truffle & Wild Mushroom Flatbread', outlet: 'Monsoon', sellingPrice: 580, cost: 145, foodCostPercent: 25.0, category: 'Small Bites' }
        ];
    });

    // 4. HACCP & Temperature Log State
    const [haccpLogs, setHaccpLogs] = useState(() => {
        const saved = localStorage.getItem('chefbot_haccp');
        return saved ? JSON.parse(saved) : [
            { id: 1, unit: 'Walk-in Chiller (Main Kitchen)', temp: '2.8°C', standard: '1.0°C - 4.5°C', checkedBy: 'Chef Chris', time: '08:30 AM', status: 'PASS' },
            { id: 2, unit: 'Meat Freezer (Ember)', temp: '-18.5°C', standard: '≤ -18°C', checkedBy: 'Sous Chef A', time: '08:45 AM', status: 'PASS' },
            { id: 3, unit: 'Seafood Display Chiller (Salt)', temp: '3.2°C', standard: '1.0°C - 4.5°C', checkedBy: 'Sous Chef B', time: '09:00 AM', status: 'PASS' }
        ];
    });

    // 5. CAPA / Action Tracker State
    const [capas, setCapas] = useState(() => {
        const saved = localStorage.getItem('chefbot_capas');
        return saved ? JSON.parse(saved) : [
            { id: 'CRK-2026-001', outlet: 'Ember', finding: 'ตรวจสอบอุณหภูมิตู้แช่ช่วง Peak Hour มีค่าสูงกว่าเกณฑ์เล็กน้อย', owner: 'Chef Chris', priority: 'CRITICAL', dueDate: '2026-12-02', status: 'VERIFIED' },
            { id: 'CRK-2026-002', outlet: 'Salt Society', finding: 'ปรับปรุงใบเทียบสูตร (Recipe Master) เมนู Mediterranean Seabass', owner: 'Sous Chef A', priority: 'HIGH', dueDate: '2026-12-05', status: 'IN PROGRESS' }
        ];
    });

    // Save to localStorage automatically
    useEffect(() => {
        localStorage.setItem('chefbot_kpis', JSON.stringify(kpis));
        localStorage.setItem('chefbot_factbase', JSON.stringify(factBase));
        localStorage.setItem('chefbot_recipes', JSON.stringify(recipes));
        localStorage.setItem('chefbot_haccp', JSON.stringify(haccpLogs));
        localStorage.setItem('chefbot_capas', JSON.stringify(capas));
    }, [kpis, factBase, recipes, haccpLogs, capas]);

    // JSON Export / Import
    const exportData = () => {
        const data = { kpis, factBase, recipes, haccpLogs, capas };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chefbot_master_backup_${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
    };

    const importData = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target.result);
                if (parsed.kpis) setKpis(parsed.kpis);
                if (parsed.factBase) setFactBase(parsed.factBase);
                if (parsed.recipes) setRecipes(parsed.recipes);
                if (parsed.haccpLogs) setHaccpLogs(parsed.haccpLogs);
                if (parsed.capas) setCapas(parsed.capas);
                alert('นำเข้าข้อมูลสำเร็จ!');
            } catch (err) {
                alert('ไฟล์ JSON ไม่ถูกต้อง');
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="min-h-screen bg-[#0B0F17] text-gray-100 flex flex-col font-sans">
            {/* TOP HEADER BAR */}
            <header className="bg-[#131926] border-b border-gray-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-500/30 tracking-wider">
                            CENTARA RESERVE KRABI
                        </span>
                        <span className="text-xs text-gray-400">Master Plan Pro v3.5 • 2026-2027</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mt-1 flex items-center gap-2">
                        CHEFBOT <span className="text-amber-400 font-light">Culinary Operations & CDC Command</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">Chef Chris Jirawat Boonsit</p>
                        <p className="text-xs text-amber-400">Chef De Cuisine (CDC)</p>
                    </div>
                    <button onClick={exportData} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-amber-400 text-xs rounded-lg border border-amber-500/30 transition flex items-center gap-1.5 font-medium">
                        📥 Export Backup
                    </button>
                    <label className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs rounded-lg border border-gray-700 cursor-pointer transition flex items-center gap-1.5 font-medium">
                        📂 Import
                        <input type="file" accept=".json" onChange={importData} className="hidden" />
                    </label>
                </div>
            </header>

            {/* NAVIGATION TABS */}
            <nav className="bg-[#131926]/60 border-b border-gray-800 px-6 flex overflow-x-auto gap-2 py-2">
                {[
                    { id: 'executive', label: '📊 Executive & Governance' },
                    { id: 'roadmap', label: '🗺️ 90-Day Roadmap' },
                    { id: 'recipes', label: '🍳 Recipe & Costing Master' },
                    { id: 'haccp', label: '🌡️ HACCP & Temp Logs' },
                    { id: 'capa', label: '⚡ CAPA & Action Tracker' },
                    { id: 'manpower', label: '👥 Manpower & Simulator' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                            activeTab === tab.id 
                                ? 'bg-amber-500 text-gray-950 font-semibold shadow-lg shadow-amber-500/20' 
                                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                
                {/* TAB 1: EXECUTIVE & GOVERNANCE */}
                {activeTab === 'executive' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#131926] p-5 rounded-xl border border-gray-800 relative overflow-hidden">
                                <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Project Owner</h3>
                                <p className="text-lg font-bold text-white mt-1">Chef Chris Jirawat Boonsit</p>
                                <p className="text-xs text-amber-400 mt-0.5">Start Date: 1 December 2026</p>
                            </div>
                            <div className="bg-[#131926] p-5 rounded-xl border border-gray-800 relative overflow-hidden">
                                <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Outlets Scope</h3>
                                <p className="text-lg font-bold text-white mt-1">Salt Society • Ember • Monsoon</p>
                                <p className="text-xs text-blue-400 mt-0.5">Total Capacity: 253+ Seats</p>
                            </div>
                            <div className="bg-[#131926] p-5 rounded-xl border border-gray-800 relative overflow-hidden">
                                <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Manpower Structure</h3>
                                <p className="text-lg font-bold text-white mt-1">13 Team Members (CDC + 12)</p>
                                <p className="text-xs text-emerald-400 mt-0.5">60 Production Man-days / Week</p>
                            </div>
                        </div>

                        {/* FACT BASE GOVERNANCE */}
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-4">📌 Fact Base Governance</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Topic</th>
                                            <th className="p-3">Current Position / Description</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {factBase.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-800/30">
                                                <td className="p-3 font-medium text-white">{item.topic}</td>
                                                <td className="p-3 text-gray-300">{item.current}</td>
                                                <td className="p-3">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                                        {item.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* KPI SCORECARD */}
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-4">🎯 Proposed KPI Scorecard</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Pillar</th>
                                            <th className="p-3">KPI Indicator</th>
                                            <th className="p-3">Target</th>
                                            <th className="p-3">Actual</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {kpis.map((k) => (
                                            <tr key={k.id} className="hover:bg-gray-800/30">
                                                <td className="p-3 text-amber-400 font-medium">{k.pillar}</td>
                                                <td className="p-3 text-white">{k.kpi}</td>
                                                <td className="p-3 text-gray-300">{k.target}</td>
                                                <td className="p-3 font-semibold text-emerald-400">{k.actual}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: 90-DAY ROADMAP */}
                {activeTab === 'roadmap' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { phase: 'Phase 1: DIAGNOSE', date: '1–7 Dec 2026', desc: 'ตรวจสภาพจริง ประเมินความเสี่ยง จัดทำ 7-Day Assessment Report' },
                                { phase: 'Phase 2: STABILIZE', date: '8–30 Dec 2026', desc: 'ควบคุมงานประจำวัน ควบคุมความเสี่ยงเร่งด่วน และ Daily Command Rhythm' },
                                { phase: 'Phase 3: STANDARDIZE', date: '31 Dec - 29 Jan 2027', desc: 'สร้างมาตรฐาน Recipe, Plating, Training Matrix และ Cost Review' },
                                { phase: 'Phase 4: OPTIMIZE', date: '30 Jan - 28 Feb 2027', desc: 'เพิ่มประสิทธิภาพ ประเมินผล 90 วัน และวางแผนกลยุทธ์ 12 เดือน' }
                            ].map((p, idx) => (
                                <div key={idx} className="bg-[#131926] p-5 rounded-xl border border-gray-800 flex flex-col justify-between">
                                    <div>
                                        <span className="text-xs font-bold text-amber-400">{p.date}</span>
                                        <h3 className="text-base font-bold text-white mt-1">{p.phase}</h3>
                                        <p className="text-xs text-gray-400 mt-2 leading-relaxed">{p.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3: RECIPE & COSTING MASTER */}
                {activeTab === 'recipes' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white">🍳 Recipe & Costing Master</h2>
                                    <p className="text-xs text-gray-400">ฐานข้อมูลสูตรอาหาร ต้นทุน และการคำนวณ Food Cost %</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        const name = prompt('ระบุชื่อเมนูอาหาร:');
                                        if (!name) return;
                                        const outlet = prompt('ระบุ Outlet (Ember / Salt Society / Monsoon):', 'Ember');
                                        const sellingPrice = Number(prompt('ระบุราคาขาย (THB):', '1000'));
                                        const cost = Number(prompt('ระบุต้นทุนวัตถุดิบ (THB):', '280'));
                                        const newRecipe = {
                                            id: recipes.length + 1,
                                            name,
                                            outlet,
                                            sellingPrice,
                                            cost,
                                            foodCostPercent: Number(((cost / sellingPrice) * 100).toFixed(1)),
                                            category: 'Main'
                                        };
                                        setRecipes([...recipes, newRecipe]);
                                    }}
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs rounded-lg transition">
                                    + เพิ่มสูตรอาหารใหม่
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Recipe Name</th>
                                            <th className="p-3">Outlet</th>
                                            <th className="p-3">Selling Price (THB)</th>
                                            <th className="p-3">Cost (THB)</th>
                                            <th className="p-3">Food Cost %</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {recipes.map((r) => (
                                            <tr key={r.id} className="hover:bg-gray-800/30">
                                                <td className="p-3 font-medium text-white">{r.name}</td>
                                                <td className="p-3 text-amber-400 text-xs">{r.outlet}</td>
                                                <td className="p-3 text-gray-300">฿{r.sellingPrice.toLocaleString()}</td>
                                                <td className="p-3 text-gray-300">฿{r.cost.toLocaleString()}</td>
                                                <td className="p-3 font-semibold text-emerald-400">{r.foodCostPercent}%</td>
                                                <td className="p-3">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${r.foodCostPercent <= 30 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'}`}>
                                                        {r.foodCostPercent <= 30 ? 'TARGET (≤30%)' : 'HIGH COST'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: HACCP & TEMP LOGS */}
                {activeTab === 'haccp' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white">🌡️ HACCP & Temperature Monitoring</h2>
                                    <p className="text-xs text-gray-400">บันทึกอุณหภูมิตู้แช่และจุดควบคุมวิกฤตประจำวัน</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        const unit = prompt('ระบุชื่อตู้แช่ / อุปกรณ์:');
                                        if (!unit) return;
                                        const temp = prompt('ระบุอุณหภูมิที่วัดได้:', '3.0°C');
                                        const newLog = {
                                            id: haccpLogs.length + 1,
                                            unit,
                                            temp,
                                            standard: '1.0°C - 4.5°C',
                                            checkedBy: 'Chef Chris',
                                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                            status: 'PASS'
                                        };
                                        setHaccpLogs([newLog, ...haccpLogs]);
                                    }}
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs rounded-lg transition">
                                    + บันทึกอุณหภูมิใหม่
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Equipment / Unit</th>
                                            <th className="p-3">Recorded Temp</th>
                                            <th className="p-3">Standard Range</th>
                                            <th className="p-3">Checked By</th>
                                            <th className="p-3">Time</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {haccpLogs.map((h) => (
                                            <tr key={h.id} className="hover:bg-gray-800/30">
                                                <td className="p-3 font-medium text-white">{h.unit}</td>
                                                <td className="p-3 font-semibold text-amber-400">{h.temp}</td>
                                                <td className="p-3 text-gray-400 text-xs">{h.standard}</td>
                                                <td className="p-3 text-gray-300 text-xs">{h.checkedBy}</td>
                                                <td className="p-3 text-gray-400 text-xs">{h.time}</td>
                                                <td className="p-3">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                                        {h.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: CAPA & ACTION TRACKER */}
                {activeTab === 'capa' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-4">⚡ Master Action & CAPA Tracker</h2>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Action ID</th>
                                            <th className="p-3">Outlet</th>
                                            <th className="p-3">Finding / Detail</th>
                                            <th className="p-3">Owner</th>
                                            <th className="p-3">Priority</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {capas.map((c) => (
                                            <tr key={c.id} className="hover:bg-gray-800/30">
                                                <td className="p-3 font-mono text-amber-400 text-xs">{c.id}</td>
                                                <td className="p-3 text-white font-medium">{c.outlet}</td>
                                                <td className="p-3 text-gray-300 max-w-xs">{c.finding}</td>
                                                <td className="p-3 text-gray-400 text-xs">{c.owner}</td>
                                                <td className="p-3">
                                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">{c.priority}</span>
                                                </td>
                                                <td className="p-3">
                                                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">{c.status}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 6: MANPOWER */}
                {activeTab === 'manpower' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-2">👥 Manpower Structure</h2>
                            <p className="text-xs text-gray-400 mb-6">โครงสร้างกำลังพล 13 คน คลอบคลุม Salt Society, Ember และ Monsoon</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
                                    <h3 className="text-sm font-semibold text-white">Total Team</h3>
                                    <p className="text-3xl font-bold text-amber-400 mt-2">13 <span className="text-xs text-gray-400">Persons</span></p>
                                </div>
                                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
                                    <h3 className="text-sm font-semibold text-white">Man-days</h3>
                                    <p className="text-3xl font-bold text-blue-400 mt-2">60 <span className="text-xs text-gray-400">Days/Week</span></p>
                                </div>
                                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
                                    <h3 className="text-sm font-semibold text-white">Avg Coverage</h3>
                                    <p className="text-3xl font-bold text-emerald-400 mt-2">8.57 <span className="text-xs text-gray-400">Staff/Day</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </main>

            {/* FOOTER */}
            <footer className="bg-[#131926] border-t border-gray-800 py-4 px-6 text-center text-xs text-gray-500">
                CHEFBOT Culinary Operations & CDC Onboarding Command • Centara Reserve Krabi • Project Owner: Chef Chris Jirawat Boonsit
            </footer>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));