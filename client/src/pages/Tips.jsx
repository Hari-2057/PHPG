import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Moon, Droplets, Utensils, Brain } from 'lucide-react';

const Tips = () => {
    const tips = [
        {
            category: "Nutrition",
            icon: <Utensils className="text-green-600" size={24} />,
            color: "bg-green-50 border-green-100",
            title: "Balance Your Plate",
            content: "Aim to fill half your plate with vegetables AND fruits, one-quarter with lean protein, and one-quarter with whole grains."
        },
        {
            category: "Hydration",
            icon: <Droplets className="text-cyan-600" size={24} />,
            color: "bg-cyan-50 border-cyan-100",
            title: "Drink Before You Eat",
            content: "Sometimes thirst is confused with hunger. Drinking a glass of water 30 minutes before a meal can aid digestion and portion control."
        },
        {
            category: "Sleep",
            icon: <Moon className="text-indigo-600" size={24} />,
            color: "bg-indigo-50 border-indigo-100",
            title: "Stick to a Schedule",
            content: "Going to bed and waking up at the same time every day, even on weekends, helps regulate your body's internal clock."
        },
        {
            category: "Heart Health",
            icon: <Heart className="text-red-600" size={24} />,
            color: "bg-red-50 border-red-100",
            title: "Move More",
            content: "Aim for at least 150 minutes of moderate-intensity aerobic activity every week, such as brisk walking or swimming."
        },
        {
            category: "Mental Wellness",
            icon: <Brain className="text-purple-600" size={24} />,
            color: "bg-purple-50 border-purple-100",
            title: "Practice Mindfulness",
            content: "Taking just 5-10 minutes a day to meditate or practice deep breathing can significantly reduce stress levels."
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-gray-50/50">
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
                        <BookOpen className="text-indigo-600" size={32} />
                        Health Hub
                    </h1>
                    <p className="text-gray-500">Expert-backed tips for a healthier lifestyle.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tips.map((tip, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 rounded-2xl border hover:shadow-lg transition-shadow duration-300 ${tip.color} bg-white`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    {tip.icon}
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{tip.category}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {tip.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tips;
