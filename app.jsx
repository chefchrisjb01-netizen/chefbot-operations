const { useState, useEffect } = React;

function App() {
    // ----------------------------------------------------
    // STATE & LOCAL STORAGE INITIALIZATION
    // ----------------------------------------------------
    const [activeTab, setActiveTab] = useState('executive');

    // 1. KPI State
    const [kpis, setKpis] = useState(() => {
        const saved = localStorage.getItem('chefbot_kpis');
        return saved ? JSON.parse(saved) : [
            { id: 1, pillar: 'Financial', kpi: 'Food Cost', target: 'Approved Budget', actual: '28.5%', status: 'Normal' },
            { id: 2, pillar: 'Financial', kpi: 'Inventory Variance', target: 'Approved Tolerance', actual: '0.4%', status: 'Normal' },
            { id: 3, pillar: 'Food Safety', kpi: 'Critical Unresolved Findings', target: '0', actual: '0', status: 'Optimal' },
            { id: 4, pillar: 'Food Safety', kpi: 'Required Records Compliance', target: '100%', actual: '100%', status: 'Optimal' },
            { id: 5, pillar: 'Quality', kpi: 'Recipe Compliance', target: '≥95%', actual: '92%', status: 'Review' },
            { id: 6, pillar: 'Quality', kpi: 'Internal Quality Score', target: '≥90%', actual: '91%', status: 'Optimal' },
            { id: 7, pillar: 'Guest', kpi: 'Positive Food Feedback', target: '≥90%', actual: '94%', status: 'Optimal' },
            { id: 8, pillar: 'People', kpi: 'Training Completion', target: '≥95%', actual: '88%', status: 'Review' },
            { id: 9, pillar: 'CAPA', kpi: 'On-time Closure', target: '≥95%', actual: '96%', status: 'Optimal' }
        ];
    });

    // 2. Fact Base Governance State
    const [factBase, setFactBase] = useState(() => {
        const saved = localStorage.getItem('chefbot_factbase');
        return saved ? JSON.parse(saved) : [
            { id: 1, topic: 'CDC Scope', current: 'ดูแล Culinary Operations ทั้ง Salt Society, Ember และ Monsoon', status: 'CONFIRMED' },
            { id: 2, topic: 'Total Team', current: '13 คน รวม CDC; Production team 12 คน', status: 'CONFIRMED' },
            { id: 3, topic: 'Team Split', current: 'Ember 6 / Salt 6 โดย Monsoon ผลิตจาก Ember', status: 'PROVISIONAL' },
            { id: 4, topic: 'Stewarding', current: 'ยังไม่ยืนยันว่ารวมอยู่ใน 13 คนหรือไม่', status: 'TO VERIFY' },
            { id: 5, topic: 'Outlet Capacities', current: 'Ember 141 seats; Salt Society 112 seats', status: 'CONFIRMED' },
            { id: 6, topic: 'Operating Hours', current: 'Salt: 12:00-22:30 | Ember: 18:00-22:30 | Monsoon: 13:00-24:00', status: 'CONFIRMED' }
        ];
    });

    // 3. Master Workstream Checklist State
    const [workstreams, setWorkstreams] = useState(() => {
        const saved = localStorage.getItem('chefbot_workstreams');
        return saved ? JSON.parse(saved) : [
            { id: '01', title: '01. Management & Onboarding', completed: 5, total: 6 },
            { id: '02', title: '02. Manpower & Kitchen Organization', completed: 4, total: 7 },
            { id: '03', title: '03. Kitchen Layout & Operations', completed: 3, total: 6 },
            { id: '04', title: '04. Menu & Plating — All Outlets', completed: 4, total: 9 },
            { id: '05', title: '05. Hygiene & HACCP', completed: 4, total: 6 },
            { id: '06', title: '06. Financial Management', completed: 3, total: 7 },
            { id: '07', title: '07. Guest Experience & Quality', completed: 3, total: 6 },
            { id: '08', title: '08. Leadership & Development', completed: 2, total: 6 },
            { id: '09', title: '09. Culinary Recognition', completed: 2, total: 6 }
        ];
    });

    // 4. CAPA / Action Tracker State
    const [capas, setCapas] = useState(() => {
        const saved = localStorage.getItem('chefbot_capas');
        return saved ? JSON.parse(saved) : [
            { id: 'CRK-2026-001', outlet: 'Ember', finding: 'ตรวจสอบอุณหภูมิตู้แช่เนื้อช่วง Peak Hour มีค่าสูงกว่าเกณฑ์เล็กน้อย', owner: 'Chef Chris', priority: 'CRITICAL', dueDate: '2026-12-02', status: 'VERIFIED' },
            { id: 'CRK-2026-002', outlet: 'Salt Society', finding: 'ปรับปรุงใบเทียบสูตร (Recipe Master) เมนู Mediterranean Seabass', owner: 'Sous Chef A', priority: 'HIGH', dueDate: '2026-12-05', status: 'IN PROGRESS' },
            { id: 'CRK-2026-003', outlet: 'Monsoon', finding: 'ซิงค์ระบบจดออเดอร์ Small Bites ระหว่างบาร์และครัว Ember', owner: 'FOH Lead', priority: 'MEDIUM', dueDate: '2026-12-10', status: 'OPEN' }
        ];
    });

    // 5. Plating Scorecard State
    const [platingScores, setPlatingScores] = useState(() => {
        const saved = localStorage.getItem('chefbot_plating');
        return saved ? JSON.parse(saved) : {
            visual: 20,
            portion: 20,
            ingredient: 15,
            texture: 15,
            flavour: 20,
            temperature: 10,
            dishName: 'Wood-Fire Grilled Australian Wagyu (Ember)'
        };
    });

    // Save to localStorage automatically
    useEffect(() => {
        localStorage.setItem('chefbot_kpis', JSON.stringify(kpis));
        localStorage.setItem('chefbot_factbase', JSON.stringify(factBase));
        localStorage.setItem('chefbot_workstreams', JSON.stringify(workstreams));
        localStorage.setItem('chefbot_capas', JSON.stringify(capas));
        localStorage.setItem('chefbot_plating', JSON.stringify(platingScores));
    }, [kpis, factBase, workstreams, capas, platingScores]);

    // JSON Export / Import Handlers
    const exportData = () => {
        const data = { kpis, factBase, workstreams, capas, platingScores };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chefbot_backup_${new Date().toISOString().slice(0, 10)}.json`;
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
                if (parsed.workstreams) setWorkstreams(parsed.workstreams);
                if (parsed.capas) setCapas(parsed.capas);
                if (parsed.platingScores) setPlatingScores(parsed.platingScores);
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
                        <span className="text-xs text-gray-400">Master Plan v3.0 • 2026-2027</span>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white mt-1 flex items-center gap-2">
                        CHEFBOT <span className="text-amber-400 font-light">Culinary Operations & Command</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-white">Chef Chris Jirawat Boonsit</p>
                        <p className="text-xs text-amber-400">Chef De Cuisine (CDC)</p>
                    </div>
                    <button 
                        onClick={exportData}
                        className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-amber-400 text-xs rounded-lg border border-amber-500/30 transition flex items-center gap-1.5 font-medium">
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
                    { id: 'executive', label: '📊 Executive & KPI' },
                    { id: 'roadmap', label: '🗺️ 90-Day Roadmap' },
                    { id: 'workstreams', label: '📋 Master Workstreams' },
                    { id: 'routine', label: '⏰ Daily Command & Plating' },
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
                
                {/* TAB 1: EXECUTIVE & KPI */}
                {activeTab === 'executive' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-[#131926] p-5 rounded-xl border border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl"></div>
                                <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Project Owner</h3>
                                <p className="text-lg font-bold text-white mt-1">Chef Chris Jirawat Boonsit</p>
                                <p className="text-xs text-amber-400 mt-0.5">Start Date: 1 December 2026</p>
                            </div>
                            <div className="bg-[#131926] p-5 rounded-xl border border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
                                <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Outlets Scope</h3>
                                <p className="text-lg font-bold text-white mt-1">Salt Society • Ember • Monsoon</p>
                                <p className="text-xs text-blue-400 mt-0.5">Total Capacity: 253+ Seats</p>
                            </div>
                            <div className="bg-[#131926] p-5 rounded-xl border border-gray-800 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
                                <h3 className="text-gray-400 text-xs uppercase font-semibold tracking-wider">Manpower Structure</h3>
                                <p className="text-lg font-bold text-white mt-1">13 Team Members (CDC + 12)</p>
                                <p className="text-xs text-emerald-400 mt-0.5">60 Production Man-days / Week</p>
                            </div>
                        </div>

                        {/* FACT BASE GOVERNANCE */}
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span>📌 Fact Base Governance</span>
                                <span className="text-xs font-normal text-gray-400">(Confirmed / Provisional / To Verify)</span>
                            </h2>
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
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        item.status === 'CONFIRMED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                                        item.status === 'PROVISIONAL' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                                        'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                                    }`}>
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
                                            <th className="p-3">Initial Target</th>
                                            <th className="p-3">Actual / Status</th>
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
                                    <div className="mt-4 pt-3 border-t border-gray-800/60 text-xs text-gray-500">
                                        Roadmap Stage #{idx + 1}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FIRST 7 DAYS CHECKLIST */}
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-4">📅 First 7 Days Operational Focus</h2>
                            <div className="space-y-3">
                                {[
                                    { day: 'Day 1 (1 Dec)', focus: 'Alignment & Introduction', act: 'พบ GM/Executive Chef/HR/Finance; ยืนยัน scope และเดินตรวจทั้ง 3 Outlets' },
                                    { day: 'Day 2 (2 Dec)', focus: 'People & Organization', act: 'พบหัวหน้าทีม พนักงาน ตรวจสอบ Roster, Skills และระบุ Acting Leads' },
                                    { day: 'Day 3 (3 Dec)', focus: 'Food Safety & Hygiene', act: 'ตรวจตู้แช่ อุณหภูมิ การติดฉลาก แยกประเภทวัตถุดิบ และ HACCP Logs' },
                                    { day: 'Day 4 (4 Dec)', focus: 'Menu & Quality', act: 'ชิมเมนูหลักทั้ง 3 Outlets ตรวจสอบ Recipe, Portion และ Plating Reference' },
                                    { day: 'Day 5 (5 Dec)', focus: 'Financial & Productivity', act: 'วิเคราะห์ Food Cost, Labour, Inventory, Waste และราคาซื้อวัตถุดิบ' },
                                    { day: 'Day 6 (6 Dec)', focus: 'Service & Guest Journey', act: 'สังเกตการทำงานช่วง Peak, การสื่อสาร FOH-BOH และ Ticket Times' },
                                    { day: 'Day 7 (7 Dec)', focus: 'Synthesis & Alignment', act: 'สรุป 7-Day Assessment Report และนำเสนอ 30-Day Action Plan ต่อผู้บริหาร' }
                                ].map((d, i) => (
                                    <div key={i} className="bg-gray-900/40 p-3.5 rounded-lg border border-gray-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <div>
                                            <span className="text-xs font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">{d.day}</span>
                                            <h4 className="text-sm font-bold text-white mt-1">{d.focus}</h4>
                                        </div>
                                        <p className="text-xs text-gray-300 max-w-xl">{d.act}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 3: MASTER WORKSTREAMS */}
                {activeTab === 'workstreams' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-2">📋 Master Project Workstreams</h2>
                            <p className="text-xs text-gray-400 mb-6">ระบบติดตามงานทั้ง 9 หมวดหลักตามแผนแม่บท Centara Reserve Krabi</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {workstreams.map((ws) => {
                                    const percent = Math.round((ws.completed / ws.total) * 100);
                                    return (
                                        <div key={ws.id} className="bg-gray-900/50 p-4 rounded-xl border border-gray-800 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-white">{ws.title}</h3>
                                                <div className="flex justify-between items-center text-xs text-gray-400 mt-3">
                                                    <span>ความคืบหน้า</span>
                                                    <span className="font-semibold text-amber-400">{ws.completed} / {ws.total} ({percent}%)</span>
                                                </div>
                                                <div className="w-full bg-gray-800 h-2 rounded-full mt-1.5 overflow-hidden">
                                                    <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-3 border-t border-gray-800/60 flex justify-end gap-2">
                                                <button 
                                                    onClick={() => {
                                                        const updated = workstreams.map(w => w.id === ws.id && w.completed < w.total ? {...w, completed: w.completed + 1} : w);
                                                        setWorkstreams(updated);
                                                    }}
                                                    className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs rounded border border-amber-500/30 transition">
                                                    + ติ๊กงานเพิ่ม
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 4: DAILY ROUTINE & PLATING */}
                {activeTab === 'routine' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* DAILY COMMAND ROUTINE */}
                            <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                                <h2 className="text-lg font-bold text-white mb-4">⏰ Daily CDC Command Routine</h2>
                                <div className="space-y-3 text-sm">
                                    {[
                                        { time: 'Opening', desc: 'Physical walkthrough, hygiene, equipment & temperature checks' },
                                        { time: 'Preparation', desc: 'Covers forecast, prep list, par stock verification' },
                                        { time: 'Pre-service', desc: 'Briefing, VIP notes, allergy check & station assignments' },
                                        { time: 'Quality Control', desc: 'Taste key dishes and approve mise en place' },
                                        { time: 'Service', desc: 'Pass inspection, ticket time tracking & outlet visits' },
                                        { time: 'Post-service', desc: 'Debrief, waste recording & staff issues review' },
                                        { time: 'Closing & Handover', desc: 'Cooling checks, labelling, cleaning & handover log' }
                                    ].map((r, i) => (
                                        <div key={i} className="flex items-start gap-3 p-2.5 rounded-lg bg-gray-900/40 border border-gray-800">
                                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 font-bold text-xs rounded border border-amber-500/30 whitespace-nowrap">{r.time}</span>
                                            <p className="text-gray-300 text-xs mt-0.5">{r.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PLATING SCORECARD CALCULATOR */}
                            <div className="bg-[#131926] rounded-xl border border-gray-800 p-6 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-white mb-1">🍽️ Plating Scorecard Calculator</h2>
                                    <p className="text-xs text-gray-400 mb-4">เกณฑ์ประเมินภายใน (Pass Mark ≥90%)</p>
                                    
                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <label className="text-xs text-gray-300 block mb-1">ชื่อเมนูอาหาร:</label>
                                            <input 
                                                type="text" 
                                                value={platingScores.dishName}
                                                onChange={(e) => setPlatingScores({...platingScores, dishName: e.target.value})}
                                                className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-1.5 text-xs text-white"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-xs">
                                            <div className="bg-gray-900/50 p-2.5 rounded border border-gray-800">
                                                <span className="text-gray-400">Visual Presentation (20%):</span>
                                                <input type="number" value={platingScores.visual} onChange={e=>setPlatingScores({...platingScores, visual: Number(e.target.value)})} className="w-full mt-1 bg-gray-900 border border-gray-700 rounded p-1 text-white" />
                                            </div>
                                            <div className="bg-gray-900/50 p-2.5 rounded border border-gray-800">
                                                <span className="text-gray-400">Portion Accuracy (20%):</span>
                                                <input type="number" value={platingScores.portion} onChange={e=>setPlatingScores({...platingScores, portion: Number(e.target.value)})} className="w-full mt-1 bg-gray-900 border border-gray-700 rounded p-1 text-white" />
                                            </div>
                                            <div className="bg-gray-900/50 p-2.5 rounded border border-gray-800">
                                                <span className="text-gray-400">Flavour & Seasoning (20%):</span>
                                                <input type="number" value={platingScores.flavour} onChange={e=>setPlatingScores({...platingScores, flavour: Number(e.target.value)})} className="w-full mt-1 bg-gray-900 border border-gray-700 rounded p-1 text-white" />
                                            </div>
                                            <div className="bg-gray-900/50 p-2.5 rounded border border-gray-800">
                                                <span className="text-gray-400">Ingredient Quality (15%):</span>
                                                <input type="number" value={platingScores.ingredient} onChange={e=>setPlatingScores({...platingScores, ingredient: Number(e.target.value)})} className="w-full mt-1 bg-gray-900 border border-gray-700 rounded p-1 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400">คะแนนรวมสุทธิ:</p>
                                        <p className="text-2xl font-bold text-amber-400">
                                            {platingScores.visual + platingScores.portion + platingScores.flavour + platingScores.ingredient + platingScores.texture + platingScores.temperature} / 100
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                                        (platingScores.visual + platingScores.portion + platingScores.flavour + platingScores.ingredient + platingScores.texture + platingScores.temperature) >= 90 
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                    }`}>
                                        {(platingScores.visual + platingScores.portion + platingScores.flavour + platingScores.ingredient + platingScores.texture + platingScores.temperature) >= 90 ? '✅ PASSED (≥90%)' : '⚠️ NEEDS REVISION'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 5: CAPA & ACTION TRACKER */}
                {activeTab === 'capa' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-white">⚡ Master Action & CAPA Tracker</h2>
                                    <p className="text-xs text-gray-400">ติดตามปัญหา ข้อค้นพบ และแนวทางแก้ไขเร่งด่วน</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        const finding = prompt('ระบุข้อค้นพบ / Action:');
                                        if (!finding) return;
                                        const newCapa = {
                                            id: `CRK-2026-00${capas.length + 1}`,
                                            outlet: 'Ember',
                                            finding: finding,
                                            owner: 'Chef Chris',
                                            priority: 'HIGH',
                                            dueDate: new Date().toISOString().slice(0, 10),
                                            status: 'OPEN'
                                        };
                                        setCapas([newCapa, ...capas]);
                                    }}
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold text-xs rounded-lg transition shadow-lg shadow-amber-500/20">
                                    + เพิ่มรายการ CAPA
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-gray-900/60 text-gray-400 uppercase text-xs">
                                        <tr>
                                            <th className="p-3">Action ID</th>
                                            <th className="p-3">Outlet</th>
                                            <th className="p-3">Finding / Detail</th>
                                            <th className="p-3">Owner</th>
                                            <th className="p-3">Priority</th>
                                            <th className="p-3">Due Date</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {capas.map((c) => (
                                            <tr key={c.id} className="hover:bg-gray-800/30">
                                                <td className="p-3 font-mono text-amber-400 text-xs">{c.id}</td>
                                                <td className="p-3 text-white font-medium">{c.outlet}</td>
                                                <td className="p-3 text-gray-300 max-w-xs truncate">{c.finding}</td>
                                                <td className="p-3 text-gray-400 text-xs">{c.owner}</td>
                                                <td className="p-3">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                                        c.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                                                        c.priority === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                                        'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                                    }`}>
                                                        {c.priority}
                                                    </span>
                                                </td>
                                                <td className="p-3 text-gray-400 text-xs">{c.dueDate}</td>
                                                <td className="p-3">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                        c.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                                        c.status === 'IN PROGRESS' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                                                        'bg-gray-800 text-gray-400'
                                                    }`}>
                                                        {c.status}
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

                {/* TAB 6: MANPOWER & SIMULATOR */}
                {activeTab === 'manpower' && (
                    <div className="space-y-6">
                        <div className="bg-[#131926] rounded-xl border border-gray-800 p-6">
                            <h2 className="text-lg font-bold text-white mb-2">👥 Manpower & Productivity Calculator</h2>
                            <p className="text-xs text-gray-400 mb-6">วิเคราะห์กำลังคนตามโครงสร้าง 13 คน (CDC 1 + Production 12 คน)</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
                                    <h3 className="text-sm font-semibold text-white">Total Team Structure</h3>
                                    <p className="text-3xl font-bold text-amber-400 mt-2">13 <span className="text-xs text-gray-400 font-normal">Persons</span></p>
                                    <p className="text-xs text-gray-400 mt-2">ประกอบด้วย Chef De Cuisine (1) และ Production Team (12)</p>
                                </div>
                                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
                                    <h3 className="text-sm font-semibold text-white">Production Man-days</h3>
                                    <p className="text-3xl font-bold text-blue-400 mt-2">60 <span className="text-xs text-gray-400 font-normal">Man-days/Week</span></p>
                                    <p className="text-xs text-gray-400 mt-2">คำนวณจากพนักงานทำงาน 5 วัน / หยุด 2 วันต่อสัปดาห์</p>
                                </div>
                                <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-800">
                                    <h3 className="text-sm font-semibold text-white">Average Daily Coverage</h3>
                                    <p className="text-3xl font-bold text-emerald-400 mt-2">8.57 <span className="text-xs text-gray-400 font-normal">Staff/Day</span></p>
                                    <p className="text-xs text-gray-400 mt-2">ค่าเฉลี่ยกำลังพลประจำกะครอบคลุมทั้ง 3 Outlets</p>
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