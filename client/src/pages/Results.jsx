import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    useEffect(() => {
        if (!data) {
            navigate('/form');
        }
    }, [data, navigate]);

    if (!data) return null;

    const { risk, recommendations, stats } = data;

    const [generatingPdf, setGeneratingPdf] = React.useState(false);

    const downloadPDF = async () => {
        setGeneratingPdf(true);
        try {
            const element = document.getElementById('results-content');

            // Wait for charts to animate/render
            await new Promise(resolve => setTimeout(resolve, 800));

            const dataUrl = await toPng(element, {
                cacheBust: true,
                backgroundColor: '#ffffff'
            });

            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (pdf.internal.pageSize.getHeight());

            const imgProps = pdf.getImageProperties(dataUrl);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);
            pdf.save('health-plan-report.pdf');
        } catch (error) {
            console.error("PDF Generation failed", error);
            alert("Failed to download PDF. Please try again.");
        } finally {
            setGeneratingPdf(false);
        }
    };

    let riskColorClass = 'bg-green-200 text-green-900 border-green-300';
    let riskGradient = 'from-green-500 to-emerald-600';
    let riskIcon = '🛡️';

    if (risk === 'Medium') {
        riskColorClass = 'bg-yellow-200 text-yellow-900 border-yellow-300';
        riskGradient = 'from-yellow-500 to-amber-600';
        riskIcon = '⚠️';
    } else if (risk === 'High') {
        riskColorClass = 'bg-red-200 text-red-900 border-red-300';
        riskGradient = 'from-red-500 to-rose-600';
        riskIcon = '🚨';
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 relative">
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=2100&auto=format&fit=crop')"
                }}
            >
                <div className="absolute inset-0 bg-gray-50/90 backdrop-blur-[2px]"></div>
            </div>

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                id="results-content"
                className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-gray-100"
            >
                <div className="text-center">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Your Personalized Plan</h1>
                    <p className="text-gray-500">Based on your provided health metrics</p>
                </div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className={`p-6 rounded-2xl border-2 text-center shadow-inner ${riskColorClass}`}
                >
                    <div className="text-sm font-semibold uppercase tracking-wider mb-1 opacity-80">AI-Assessed Health Risk</div>
                    <div className="text-4xl font-extrabold flex items-center justify-center gap-3">
                        <span>{riskIcon}</span>
                        <span>{risk.toUpperCase()}</span>
                    </div>
                </motion.div>



                {/* Health Score Gauge */}
                {data.healthScore !== undefined && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 }}
                        className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-100"
                    >
                        <h3 className="text-lg font-bold text-gray-600 mb-2">Overall Health Score</h3>
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    innerRadius="80%"
                                    outerRadius="100%"
                                    barSize={20}
                                    data={[{ name: 'Score', value: data.healthScore, fill: data.healthScore > 70 ? '#10b981' : data.healthScore > 40 ? '#f59e0b' : '#ef4444' }]}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar background clockWise dataKey="value" cornerRadius={10} />
                                </RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-4">
                                <span className="text-5xl font-extrabold text-gray-800">{data.healthScore}</span>
                                <span className="text-sm text-gray-400 block">/100</span>
                            </div>
                        </div>
                        <p className="text-sm text-center text-gray-500 max-w-xs mt-[-20px]">
                            {data.healthScore > 80 ? 'Excellent! Keep it up.' : data.healthScore > 50 ? 'Good, but room for improvement.' : 'Needs attention. Follow the plan below.'}
                        </p>
                    </motion.div>
                )}

                {/* Detailed Stats Cards */}
                {stats && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {/* BMI Card */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">BMI</span>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                    ${stats.bmiCategory === 'Normal' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {stats.bmiCategory}
                                </span>
                            </div>
                            <div className="text-3xl font-bold text-gray-800">{stats.bmi}</div>
                        </div>

                        {/* Sleep Card */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sleep</span>
                                <span className="text-indigo-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                                </span>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-gray-800">{stats.sleep_hours}</span>
                                <span className="ml-1 text-sm text-gray-500">hrs/day</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${Math.min((stats.sleep_hours / 9) * 100, 100)}%` }}></div>
                            </div>
                        </div>

                        {/* Water Card */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hydration</span>
                                <span className="text-cyan-400">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                                </span>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-gray-800">{stats.water_intake}</span>
                                <span className="ml-1 text-sm text-gray-500">L/day</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
                                <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${Math.min((stats.water_intake / 3) * 100, 100)}%` }}></div>
                            </div>
                        </div>

                        {/* Blood Pressure Analysis */}
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Blood Pressure</span>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase
                                    ${stats.blood_pressure < 120 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {stats.blood_pressure < 120 ? 'Normal' : 'Elevated'}
                                </span>
                            </div>
                            <div className="flex items-baseline">
                                <span className="text-3xl font-bold text-gray-800">{stats.blood_pressure}</span>
                                <span className="ml-1 text-sm text-gray-500">mmHg</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Normal: &lt;120</p>
                        </div>
                    </motion.div>
                )}

                {/* Charts Section */}
                {stats && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
                    >
                        <h4 className="text-base font-bold text-gray-700 mb-6">Comparative Analysis</h4>
                        <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { name: 'BMI', User: parseFloat(stats.bmi), Recommended: 22 },
                                        { name: 'Sleep', User: stats.sleep_hours, Recommended: 8 },
                                        { name: 'Water (L)', User: stats.water_intake, Recommended: 2.5 },
                                    ]}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis hide />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="User" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                                    <Bar dataKey="Recommended" fill="#e5e7eb" radius={[4, 4, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}

                <div className="mt-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <span className="bg-indigo-100 text-indigo-600 p-2 rounded-lg mr-3 text-xl">📋</span>
                        Recommended Actions
                    </h3>
                    <ul className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1), duration: 0.4 }}
                                className="flex items-start bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors"
                            >
                                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5 mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </span>
                                <span className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: rec }}></span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="pt-8 border-t border-gray-100">
                    <button
                        onClick={() => navigate('/form')}
                        className="w-full md:w-auto mx-auto block bg-gray-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-gray-900 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all duration-300 transform hover:scale-105"
                    >
                        Start Over
                    </button>
                    <button
                        onClick={downloadPDF}
                        disabled={generatingPdf}
                        className="w-full md:w-auto mx-auto mt-4 md:mt-0 md:ml-4 block md:inline-block bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-wait"
                    >
                        {generatingPdf ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : 'Download Report'}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-6 max-w-lg mx-auto">
                        Disclaimer: This prediction and plan are generated by an AI model for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment.
                    </p>
                </div>
            </motion.main>
        </div >
    );
};

export default Results;
