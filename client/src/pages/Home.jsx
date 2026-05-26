import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen pt-20 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden font-sans">
            {/* Background with overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=2070&auto=format&fit=crop')"
                }}
            >
                <div className="absolute inset-0 bg-gray-50/90 backdrop-blur-sm"></div>
            </div>

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 text-center space-y-12 border border-white/40 ring-1 ring-black/5"
            >
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight mb-6">
                        Chart Your Path to Wellness
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our advanced AI analyzes your key health metrics to create a customized wellness plan just for you. Take the first step towards a healthier, more vibrant lifestyle today.
                    </p>
                </motion.div>

                {/* How It Works Section */}
                <div className="text-left grid md:grid-cols-3 gap-8 pt-8">
                    {[
                        {
                            title: "1. Provide Your Data",
                            text: "Securely enter your anonymous health metrics like age, blood pressure, and lifestyle habits.",
                            path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        },
                        {
                            title: "2. AI Analysis",
                            text: "Our intelligent algorithm assesses your data against established health indicators to determine your risk profile.",
                            path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 8h.01M15 8h.01"></path>
                        },
                        {
                            title: "3. Get Your Plan",
                            text: "Receive a set of unique, actionable recommendations tailored specifically to your needs.",
                            path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + (index * 0.2), duration: 0.8 }}
                            className="group bg-white/60 p-6 rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100"
                        >
                            <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-300 text-indigo-600 group-hover:text-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    {item.path}
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                    className="pt-6"
                >
                    <button
                        onClick={() => navigate('/form')}
                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg"
                    >
                        Create My Free Plan
                    </button>
                    <p className="mt-6 text-sm text-gray-500 font-medium">
                        🔒 Privacy First: We analyzes your data locally in memory.
                    </p>
                </motion.div>
            </motion.main>
        </div>
    );
};

export default Home;
