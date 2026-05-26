import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const Form = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        blood_pressure: '',
        glucose: '',
        exercise: '',
        smoker: '0',
        alcoholic: '0',
        drink_frequency: '',
        drink_period: 'day',
        sleep_hours: '',
        water_intake: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSend = {
                ...formData,
                age: parseInt(formData.age),
                weight: parseFloat(formData.weight),
                height: parseInt(formData.height),
                blood_pressure: parseInt(formData.blood_pressure),
                glucose: parseInt(formData.glucose),
                exercise: parseFloat(formData.exercise),
                smoker: parseInt(formData.smoker),
                alcoholic: parseInt(formData.alcoholic),
                drink_frequency: parseInt(formData.drink_frequency) || 0,
                sleep_hours: parseFloat(formData.sleep_hours),
                water_intake: parseFloat(formData.water_intake)
            };

            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await axios.post(`${apiUrl}/api/health-plan`, dataToSend);
            navigate('/results', { state: response.data });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate plan. Ensure the backend server is running and accessible.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "mt-1 block w-full p-4 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-gray-50 focus:bg-white";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-1";

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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-gray-100"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">AI Health Plan Generator</h1>
                    <p className="text-lg text-gray-500">Enter your health metrics to receive a personalized wellness plan.</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="age" className={labelClasses}>Age</label>
                        <input type="number" id="age" name="age" placeholder="e.g., 45" required value={formData.age} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="gender" className={labelClasses}>Gender</label>
                        <select id="gender" name="gender" required value={formData.gender} onChange={handleChange} className={inputClasses}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="weight" className={labelClasses}>Weight (kg)</label>
                        <input type="number" id="weight" name="weight" step="0.1" placeholder="e.g., 70.5" required value={formData.weight} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="height" className={labelClasses}>Height (cm)</label>
                        <input type="number" id="height" name="height" placeholder="e.g., 175" required value={formData.height} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="blood_pressure" className={labelClasses}>Blood Pressure (Systolic)</label>
                        <input type="number" id="blood_pressure" name="blood_pressure" placeholder="e.g., 130" required value={formData.blood_pressure} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="glucose" className={labelClasses}>Glucose Level (mg/dL)</label>
                        <input type="number" id="glucose" name="glucose" placeholder="e.g., 110" required value={formData.glucose} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="exercise" className={labelClasses}>Weekly Exercise (hours)</label>
                        <input type="number" id="exercise" name="exercise" step="0.5" placeholder="e.g., 2.5" required value={formData.exercise} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="sleep_hours" className={labelClasses}>Daily Sleep (hours)</label>
                        <input type="number" id="sleep_hours" name="sleep_hours" step="0.5" placeholder="e.g., 7.5" required value={formData.sleep_hours} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="water_intake" className={labelClasses}>Daily Water Intake (liters)</label>
                        <input type="number" id="water_intake" name="water_intake" step="0.1" placeholder="e.g., 2.5" required value={formData.water_intake} onChange={handleChange} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="smoker" className={labelClasses}>Are you a smoker?</label>
                        <select id="smoker" name="smoker" required value={formData.smoker} onChange={handleChange} className={inputClasses}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="alcoholic" className={labelClasses}>Do you consume alcohol?</label>
                        <select id="alcoholic" name="alcoholic" required value={formData.alcoholic} onChange={handleChange} className={inputClasses}>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>

                    {formData.alcoholic === '1' && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-200"
                        >
                            <div>
                                <label htmlFor="drink-frequency" className={labelClasses}>How many times?</label>
                                <input type="number" id="drink-frequency" name="drink_frequency" placeholder="e.g., 3" value={formData.drink_frequency} onChange={handleChange} className={inputClasses} />
                            </div>
                            <div>
                                <label htmlFor="drink-period" className={labelClasses}>Frequency Period</label>
                                <select id="drink-period" name="drink_period" value={formData.drink_period} onChange={handleChange} className={inputClasses}>
                                    <option value="day">Per Day</option>
                                    <option value="week">Per Week</option>
                                    <option value="month">Per Month</option>
                                </select>
                            </div>
                        </motion.div>
                    )}

                    <div className="md:col-span-2 pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-5 px-4 rounded-xl shadow-lg hover:shadow-xl hover:translate-y-[-2px] focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Plan...
                                </span>
                            ) : 'Generate My Plan'}
                        </button>
                    </div>
                </form>
            </motion.main>
        </div>
    );
};

export default Form;
