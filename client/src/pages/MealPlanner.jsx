import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Leaf, Coffee, Sun, Moon, Check } from 'lucide-react';

const MealPlanner = () => {
    const [preferences, setPreferences] = useState({
        diet: 'omnivore', // omnivore, veg, vegan
        calories: 2000
    });
    const [plan, setPlan] = useState(null);

    const mealDatabase = {
        breakfast: {
            omnivore: ["Scrambled eggs with spinach and whole wheat toast", "Greek yogurt parfait with berries and nuts", "Oatmeal with protein powder and sliced banana"],
            veg: ["Vegetable omelet with cheese and fruit side", "Greek yogurt bowl with chia seeds and honey", "Oatmeal with almond butter and apple"],
            vegan: ["Tofu scramble with peppers and onions", "Overnight oats with chia seeds and berries", "Avocado toast with hemp seeds and tomato"]
        },
        lunch: {
            omnivore: ["Grilled chicken salad with quinoa and vinaigrette", "Turkey wrap with hummus and veggies", "Tuna salad lettuce wraps"],
            veg: ["Caprese salad with chickpeas and balsamic glaze", "Quinoa bowl with roasted sweet potatoes and feta", "Lentil soup with whole grain roll"],
            vegan: ["Quinoa bowl with roasted veggies and tahini dressing", "Black bean burrito bowl with guacamole", "Lentil and vegetable soup"]
        },
        dinner: {
            omnivore: ["Baked salmon with asparagus and brown rice", "Stir-fried beef with broccoli and peppers", "Roasted chicken with root vegetables"],
            veg: ["Vegetable stir-fry with tofu and cashews", "Spinach and ricotta stuffed pasta shells", "Eggplant parmesan with side salad"],
            vegan: ["Vegetable stir-fry with tofu and brown rice", "Chickpea curry with coconut milk", "Stuffed bell peppers with rice and beans"]
        },
        snack: {
            omnivore: ["String cheese and an apple", "Hard-boiled egg and almonds", "Turkey jerky"],
            veg: ["Carrot sticks with hummus", "Apple slices with peanut butter", "Cottage cheese with pineapple"],
            vegan: ["Carrot sticks with hummus", "Apple slices with almond butter", "Handful of mixed nuts"]
        }
    };

    const generatePlan = () => {
        const diet = preferences.diet;
        // Simple random selection for variety
        const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

        setPlan({
            breakfast: getRandom(mealDatabase.breakfast[diet]),
            lunch: getRandom(mealDatabase.lunch[diet]),
            dinner: getRandom(mealDatabase.dinner[diet]),
            snack: getRandom(mealDatabase.snack[diet]),
            calories: preferences.calories
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 md:px-8 bg-gray-50/50">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-2">
                        <Utensils className="text-emerald-600" size={32} />
                        Smart Meal Planner
                    </h1>
                    <p className="text-gray-500">Generate a healthy daily meal plan based on your preferences.</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                >
                    <div className="p-6 md:p-8 border-b border-gray-100 bg-emerald-50/30">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Customize Your Diet</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Dietary Preference</label>
                                <div className="flex flex-wrap gap-2">
                                    {['omnivore', 'veg', 'vegan'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setPreferences({ ...preferences, diet: type })}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${preferences.diet === type
                                                    ? 'bg-emerald-600 text-white shadow-md'
                                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {type === 'omnivore' ? 'Everything' : type === 'veg' ? 'Vegetarian' : 'Vegan'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Calories Target: <span className="text-emerald-600">{preferences.calories}</span>
                                </label>
                                <input
                                    type="range"
                                    min="1200"
                                    max="3500"
                                    step="50"
                                    value={preferences.calories}
                                    onChange={(e) => setPreferences({ ...preferences, calories: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>1200</span>
                                    <span>3500</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <button
                                onClick={generatePlan}
                                className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:bg-emerald-700 hover:shadow-emerald-500/30 transition-all transform active:scale-95"
                            >
                                Generate Plan
                            </button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {plan && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="p-6 md:p-8"
                            >
                                <div className="grid gap-4">
                                    {[
                                        { label: 'Breakfast', icon: <Coffee size={20} />, color: 'bg-orange-50 text-orange-600', item: plan.breakfast },
                                        { label: 'Lunch', icon: <Sun size={20} />, color: 'bg-yellow-50 text-yellow-600', item: plan.lunch },
                                        { label: 'Dinner', icon: <Moon size={20} />, color: 'bg-indigo-50 text-indigo-600', item: plan.dinner },
                                        { label: 'Snack', icon: <Leaf size={20} />, color: 'bg-green-50 text-green-600', item: plan.snack },
                                    ].map((meal, idx) => (
                                        <motion.div
                                            key={meal.label}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                                        >
                                            <div className={`p-3 rounded-full ${meal.color}`}>
                                                {meal.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">{meal.label}</h3>
                                                <p className="text-gray-900 font-medium">{meal.item}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default MealPlanner;
