import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Activity, Clock, PlayCircle } from 'lucide-react';

const Workouts = () => {
    const [preferences, setPreferences] = useState({
        level: 'beginner',
        type: 'fullbody'
    });
    const [workout, setWorkout] = useState(null);

    const workoutDatabase = {
        beginner: {
            fullbody: [
                { name: "Jumping Jacks", reps: "30 sec", sets: 3 },
                { name: "Bodyweight Squats", reps: "12", sets: 3 },
                { name: "Push-ups (Knees if needed)", reps: "10", sets: 3 },
                { name: "Lunges", reps: "10 per leg", sets: 3 },
                { name: "Plank", reps: "20 sec", sets: 3 }
            ],
            upper: [
                { name: "Arm Circles", reps: "30 sec", sets: 2 },
                { name: "Wall Push-ups", reps: "12", sets: 3 },
                { name: "Tricep Dips (Chair)", reps: "10", sets: 3 },
                { name: "Plank Shoulder Taps", reps: "10 total", sets: 3 }
            ],
            lower: [
                { name: "High Knees", reps: "30 sec", sets: 3 },
                { name: "Squats", reps: "15", sets: 3 },
                { name: "Glute Bridges", reps: "15", sets: 3 },
                { name: "Side Leg Raises", reps: "12 per side", sets: 3 }
            ],
            yoga: [
                { name: "Child's Pose", reps: "1 min", sets: 1 },
                { name: "Cat-Cow Stretch", reps: "1 min", sets: 1 },
                { name: "Downward Dog", reps: "30 sec", sets: 3 },
                { name: "Baby Cobra", reps: "30 sec", sets: 3 },
                { name: "Warrior I", reps: "30 sec per side", sets: 2 }
            ]
        },
        intermediate: {
            fullbody: [
                { name: "Burpees", reps: "10", sets: 3 },
                { name: "Jump Squats", reps: "15", sets: 3 },
                { name: "Push-ups", reps: "15", sets: 3 },
                { name: "Mountain Climbers", reps: "30 sec", sets: 3 },
                { name: "Plank", reps: "45 sec", sets: 3 }
            ],
            upper: [
                { name: "Diamond Push-ups", reps: "10", sets: 3 },
                { name: "Pike Push-ups", reps: "10", sets: 3 },
                { name: "Tricep Dips", reps: "15", sets: 3 },
                { name: "Superman Hold", reps: "30 sec", sets: 3 }
            ],
            lower: [
                { name: "Walking Lunges", reps: "20 total", sets: 3 },
                { name: "Sumo Squats", reps: "20", sets: 3 },
                { name: "Calf Raises", reps: "20", sets: 4 },
                { name: "Single Leg Glute Bridge", reps: "12 per leg", sets: 3 }
            ],
            yoga: [
                { name: "Sun Salutation A", reps: "5 rounds", sets: 1 },
                { name: "Warrior II", reps: "45 sec per side", sets: 2 },
                { name: "Triangle Pose", reps: "45 sec per side", sets: 2 },
                { name: "Tree Pose", reps: "45 sec per side", sets: 2 },
                { name: "Pigeon Pose", reps: "1 min per side", sets: 1 }
            ]
        },
        advanced: {
            fullbody: [
                { name: "Burpees with Push-up", reps: "15", sets: 4 },
                { name: "Pistol Squats (assisted if needed)", reps: "8 per leg", sets: 3 },
                { name: "Spiderman Push-ups", reps: "12", sets: 3 },
                { name: "Plank to Push-up", reps: "10", sets: 3 },
                { name: "Hollow Body Hold", reps: "45 sec", sets: 4 }
            ],
            upper: [
                { name: "Decline Push-ups", reps: "15", sets: 4 },
                { name: "Handstand Hold (Wall)", reps: "30 sec", sets: 3 },
                { name: "Bodyweight Rows (Under Table/Bar)", reps: "12", sets: 4 },
                { name: "Pseudo Planche Push-ups", reps: "8", sets: 3 }
            ],
            lower: [
                { name: "Jump Lunges", reps: "20 total", sets: 4 },
                { name: "Bulgarian Split Squats", reps: "12 per leg", sets: 3 },
                { name: "Single Leg Deadlift (Bodyweight)", reps: "10 per leg", sets: 3 },
                { name: "Box Jumps (or Step ups)", reps: "15", sets: 3 }
            ],
            yoga: [
                { name: "Sun Salutation B", reps: "5 rounds", sets: 1 },
                { name: "Crow Pose", reps: "30 sec hold", sets: 3 },
                { name: "Wheel Pose", reps: "30 sec", sets: 3 },
                { name: "Headstand (assisted)", reps: "30 sec", sets: 2 },
                { name: "Boat Pose", reps: "1 min", sets: 3 }
            ]
        }
    };

    const generateWorkout = () => {
        const selected = workoutDatabase[preferences.level][preferences.type];
        setWorkout(selected);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2 drop-shadow-md">
                        <Dumbbell className="text-pink-400" size={32} />
                        Personal Trainer
                    </h1>
                    <p className="text-gray-200">Custom home workouts designed for your fitness level.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden"
                >
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-rose-50">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Configure Your Session</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Fitness Level</label>
                                <div className="flex gap-2">
                                    {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                                        <button
                                            key={lvl}
                                            onClick={() => setPreferences({ ...preferences, level: lvl })}
                                            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${preferences.level === lvl
                                                    ? 'bg-rose-600 text-white shadow-md'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Focus Area</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['fullbody', 'upper', 'lower', 'yoga'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setPreferences({ ...preferences, type: t })}
                                            className={`py-2 px-3 rounded-lg text-sm font-medium capitalize transition-all ${preferences.type === t
                                                    ? 'bg-rose-600 text-white shadow-md'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {t === 'fullbody' ? 'Full Body' : t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={generateWorkout}
                                className="bg-gray-900 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:bg-black hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-2 mx-auto"
                            >
                                <PlayCircle size={20} /> Generate Circuit
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {workout && (
                            <motion.div
                                key={preferences.type + preferences.level}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-6 md:p-8 bg-white"
                            >
                                <div className="space-y-4">
                                    {workout.map((exercise, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-rose-200 hover:bg-rose-50/30 transition-colors group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800">{exercise.name}</h3>
                                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Activity size={12} /> Sets: {exercise.sets}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-bold">
                                                    <Clock size={12} className="mr-1" /> {exercise.reps}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-sm text-yellow-800 text-center">
                                    ⚠️ Always warm up before starting and cool down afterwards. Stay hydrated!
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Workouts;
