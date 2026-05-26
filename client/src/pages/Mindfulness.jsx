import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind, Pause, Play, RotateCcw } from 'lucide-react';

const Mindfulness = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('Idle'); // Inhale, Hold, Exhale, Idle
    const [text, setText] = useState('Ready?');

    useEffect(() => {
        let interval;
        if (isActive) {
            const runCycle = async () => {
                // 4-7-8 Breathing Technique (simplified to 4-4-4 for UI flow)
                // Inhale (4s)
                setPhase('Inhale');
                setText('Breathe In...');
                await new Promise(r => setTimeout(r, 4000));

                if (!isActive) return;

                // Hold (4s)
                setPhase('Hold');
                setText('Hold...');
                await new Promise(r => setTimeout(r, 4000));

                if (!isActive) return;

                // Exhale (4s)
                setPhase('Exhale');
                setText('Breathe Out...');
                await new Promise(r => setTimeout(r, 4000));

                if (!isActive) return;

                // Small pause
                runCycle();
            };
            runCycle();
        } else {
            setPhase('Idle');
            setText('Ready?');
        }
        return () => clearTimeout(interval);
    }, [isActive]);

    const getScale = () => {
        if (phase === 'Inhale') return 1.5;
        if (phase === 'Hold') return 1.5;
        if (phase === 'Exhale') return 1;
        return 1;
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-sky-50/30 flex flex-col items-center">
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
                        <Wind className="text-sky-500" size={32} />
                        Mindfulness
                    </h1>
                    <p className="text-gray-500">Take a moment to center yourself with guided breathing.</p>
                </div>

                <div className="relative flex items-center justify-center h-80">
                    {/* Breathing Circles */}
                    <motion.div
                        animate={{
                            scale: isActive ? getScale() : 1,
                            opacity: 0.3
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="absolute w-48 h-48 bg-sky-400 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{
                            scale: isActive ? getScale() : 1,
                        }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="relative z-10 w-48 h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-sky-100"
                    >
                        <span className="text-2xl font-bold text-sky-600">{text}</span>
                    </motion.div>
                </div>

                <div className="flex justify-center gap-4">
                    {!isActive ? (
                        <button
                            onClick={() => setIsActive(true)}
                            className="flex items-center gap-2 bg-sky-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-sky-700 transition transform hover:scale-105"
                        >
                            <Play size={20} /> Start
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsActive(false)}
                            className="flex items-center gap-2 bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full shadow hover:bg-gray-300 transition"
                        >
                            <Pause size={20} /> Stop
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Mindfulness;
