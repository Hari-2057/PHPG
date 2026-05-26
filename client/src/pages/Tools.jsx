import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Flame, Ruler, Droplets, Heart, PieChart, Activity } from 'lucide-react';

const Tools = () => {
    // BMR/TDEE State
    const [bmrData, setBmrData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        activity: '1.2'
    });
    const [bmrResult, setBmrResult] = useState(null);

    // Water Intake State
    const [waterData, setWaterData] = useState({ weight: '', activityMinutes: '' });
    const [waterResult, setWaterResult] = useState(null);

    // Heart Rate State
    const [hrAge, setHrAge] = useState('');
    const [hrResult, setHrResult] = useState(null);

    const inputClasses = "mt-1 block w-full p-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all text-sm";

    // 1. Calculate BMR & TDEE
    const calculateBMR = (e) => {
        e.preventDefault();
        const { age, gender, weight, height, activity } = bmrData;
        let bmr = 0;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        const tdee = Math.round(bmr * parseFloat(activity));
        setBmrResult({ bmr: Math.round(bmr), tdee });
    };

    // 2. Calculate Water Intake
    const calculateWater = (e) => {
        e.preventDefault();
        // Base: 35ml per kg
        let water = parseFloat(waterData.weight) * 0.033;
        // Add for exercise: ~0.35L per 30 mins
        const extra = (parseFloat(waterData.activityMinutes) / 30) * 0.35;
        setWaterResult((water + (extra || 0)).toFixed(1));
    };

    // 3. Calculate Heart Rate Zones
    const calculateHR = (e) => {
        e.preventDefault();
        const maxHr = 220 - parseInt(hrAge);
        setHrResult({
            max: maxHr,
            zone2: [Math.round(maxHr * 0.6), Math.round(maxHr * 0.7)], // Fat Burn
            zone4: [Math.round(maxHr * 0.8), Math.round(maxHr * 0.9)]  // Cardio/Anaerobic
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-gray-50/50">
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
                        <Calculator className="text-indigo-600" size={32} />
                        Health Tools Suite
                    </h1>
                    <p className="text-gray-500">Track and optimize your vital metrics.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* Tool 1: BMR Calculator */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                                <Flame size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">BMR & Calories</h2>
                                <p className="text-xs text-gray-500">Daily Energy Expenditure</p>
                            </div>
                        </div>
                        <form onSubmit={calculateBMR} className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <input type="number" required className={inputClasses} placeholder="Age" value={bmrData.age} onChange={(e) => setBmrData({ ...bmrData, age: e.target.value })} />
                                <select className={inputClasses} value={bmrData.gender} onChange={(e) => setBmrData({ ...bmrData, gender: e.target.value })}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <input type="number" required className={inputClasses} placeholder="Wgt (kg)" value={bmrData.weight} onChange={(e) => setBmrData({ ...bmrData, weight: e.target.value })} />
                                <input type="number" required className={inputClasses} placeholder="Hgt (cm)" value={bmrData.height} onChange={(e) => setBmrData({ ...bmrData, height: e.target.value })} />
                            </div>
                            <select className={inputClasses} value={bmrData.activity} onChange={(e) => setBmrData({ ...bmrData, activity: e.target.value })}>
                                <option value="1.2">Sedentary</option>
                                <option value="1.375">Light Exercise (1-2 days)</option>
                                <option value="1.55">Moderate (3-5 days)</option>
                                <option value="1.725">Heavy (6-7 days)</option>
                            </select>
                            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-orange-500/20">Calculate</button>
                        </form>
                        {bmrResult && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-center">
                                <div className="bg-orange-50 p-2 rounded-lg">
                                    <div className="text-[10px] font-bold text-orange-600 uppercase">BMR</div>
                                    <div className="text-xl font-black text-gray-800">{bmrResult.bmr}</div>
                                </div>
                                <div className="bg-orange-50 p-2 rounded-lg">
                                    <div className="text-[10px] font-bold text-orange-600 uppercase">TDEE / Maintain</div>
                                    <div className="text-xl font-black text-gray-800">{bmrResult.tdee}</div>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Tool 2: Water Calculator */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-cyan-100 p-3 rounded-xl text-cyan-600">
                                <Droplets size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Hydration Needs</h2>
                                <p className="text-xs text-gray-500">Based on Activity</p>
                            </div>
                        </div>
                        <form onSubmit={calculateWater} className="space-y-4 flex-grow">
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 ml-1">Current Weight</label>
                                    <input type="number" required className={inputClasses} placeholder="Weight in kg" value={waterData.weight} onChange={(e) => setWaterData({ ...waterData, weight: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 ml-1">Daily Exercise</label>
                                    <input type="number" required className={inputClasses} placeholder="Minutes per day (e.g. 30)" value={waterData.activityMinutes} onChange={(e) => setWaterData({ ...waterData, activityMinutes: e.target.value })} />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-cyan-500/20">Calculate</button>
                        </form>
                        {waterResult && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-gray-100 text-center bg-cyan-50 rounded-xl p-4">
                                <div className="text-xs font-bold text-cyan-600 uppercase mb-1">Recommended Daily Intake</div>
                                <div className="text-3xl font-black text-gray-800">{waterResult} <span className="text-base text-gray-500 font-normal">Liters</span></div>
                            </motion.div>
                        )}
                    </div>

                    {/* Tool 3: Heart Rate Zones */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-rose-100 p-3 rounded-xl text-rose-600">
                                <Heart size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Heart Rate Zones</h2>
                                <p className="text-xs text-gray-500">Training Intensity Zones</p>
                            </div>
                        </div>
                        <form onSubmit={calculateHR} className="space-y-4">
                            <div>
                                <input type="number" required className={inputClasses} placeholder="Enter your Age" value={hrAge} onChange={(e) => setHrAge(e.target.value)} />
                            </div>
                            <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg hover:shadow-rose-500/20">Find Zones</button>
                        </form>
                        {hrResult && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg text-sm">
                                    <span className="font-semibold text-green-700">Zone 2 (Fat Burn)</span>
                                    <span className="font-bold text-green-900">{hrResult.zone2[0]} - {hrResult.zone2[1]} bpm</span>
                                </div>
                                <div className="flex justify-between items-center bg-red-50 p-3 rounded-lg text-sm">
                                    <span className="font-semibold text-red-700">Zone 4 (Cardio)</span>
                                    <span className="font-bold text-red-900">{hrResult.zone4[0]} - {hrResult.zone4[1]} bpm</span>
                                </div>
                                <div className="text-center text-xs text-gray-400 mt-2">Max HR: {hrResult.max} bpm</div>
                            </motion.div>
                        )}
                    </div>

                    {/* Tool 4: Macro Split */}
                    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-violet-100 p-3 rounded-xl text-violet-600">
                                <PieChart size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Macro Split</h2>
                                <p className="text-xs text-gray-500">Standard 40/30/30 Balance</p>
                            </div>
                        </div>
                        <div className="p-4 bg-violet-50 rounded-xl mb-4 text-center">
                            <p className="text-sm text-gray-600 mb-1">Based on TDEE (Calculate alongside)</p>
                            {bmrResult ? (
                                <div className="space-y-3 mt-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-violet-700 font-semibold">Carbs (40%)</span>
                                        <span className="font-bold">{Math.round((bmrResult.tdee * 0.4) / 4)}g</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-violet-700 font-semibold">Protein (30%)</span>
                                        <span className="font-bold">{Math.round((bmrResult.tdee * 0.3) / 4)}g</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-violet-700 font-semibold">Fat (30%)</span>
                                        <span className="font-bold">{Math.round((bmrResult.tdee * 0.3) / 9)}g</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 py-4 italic">Please calculate your TDEE in the first tool to see your macro split.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Tools;
