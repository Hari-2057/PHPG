import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

function predictRisk(data) {
    let score = 0;
    // Age
    if (data.age > 50) score += 2; else if (data.age > 40) score += 1;

    // BMI
    const bmi = data.weight / ((data.height / 100) ** 2);
    if (bmi >= 30) score += 2; else if (bmi >= 25) score += 1;

    // Blood Pressure
    if (data.blood_pressure >= 140) score += 2; else if (data.blood_pressure >= 130) score += 1;

    // Glucose
    if (data.glucose >= 125) score += 2; else if (data.glucose >= 100) score += 1;

    // Smoker
    if (data.smoker == 1) score += 3;

    // Alcohol
    if (data.alcoholic == 1) {
        score += 2;
        if (data.drink_period === 'day' && data.drink_frequency > 1) score += 2;
        if (data.drink_period === 'week' && data.drink_frequency > 7) score += 2;
    }

    // Exercise
    if (data.exercise < 1) score += 2; else if (data.exercise < 3) score += 1;

    // Sleep
    if (data.sleep_hours < 5) score += 2; else if (data.sleep_hours < 7) score += 1;

    // Water Intake
    if (data.water_intake < 1.5) score += 1;

    if (score >= 8) return { level: 'High', score: Math.max(0, 100 - (score * 8)) };
    if (score >= 4) return { level: 'Medium', score: Math.max(0, 100 - (score * 6)) };
    return { level: 'Low', score: Math.max(0, 100 - (score * 3)) };
}

function getRecommendations(data, riskLevel) {
    let recommendations = [];
    switch (riskLevel) {
        case 'High':
            recommendations.push("<strong>Priority:</strong> Consult a healthcare professional for a comprehensive check-up.");
            recommendations.push("<strong>Diet:</strong> Focus on a low-sodium, low-sugar diet. Increase vegetables and lean proteins.");
            recommendations.push("<strong>Exercise:</strong> Start with low-impact activities like walking for 15-20 minutes daily.");
            break;
        case 'Medium':
            recommendations.push("<strong>Preventative Care:</strong> Schedule a routine annual check-up.");
            recommendations.push("<strong>Diet:</strong> Aim for a balanced diet. Reduce processed foods and sugary drinks.");
            recommendations.push("<strong>Exercise:</strong> Target 150 minutes of moderate-intensity exercise per week.");
            break;
        case 'Low':
            recommendations.push("<strong>Maintenance:</strong> Continue your healthy habits to maintain your low-risk status.");
            recommendations.push("<strong>Diet:</strong> Maintain a balanced diet rich in whole foods.");
            recommendations.push("<strong>Exercise:</strong> Stay active with 150-300 minutes of exercise per week.");
            break;
    }

    if (data.height > 0) {
        const bmi = data.weight / ((data.height / 100) ** 2);
        if (bmi >= 25) recommendations.push("<strong>Nutrition:</strong> Consider portion control and focus on nutrient-dense foods to manage your BMI.");
    }

    if (data.smoker == 1) recommendations.push("<strong>Lifestyle:</strong> Quitting smoking is the single most effective action you can take to improve your health. Seek support programs.");

    if (data.alcoholic == 1) {
        const freqText = data.drink_frequency ? `(${data.drink_frequency} times a ${data.drink_period})` : '';
        recommendations.push(`<strong>Lifestyle:</strong> Your alcohol consumption ${freqText} is a health risk. Reducing or quitting can significantly improve your well-being. Please speak with a healthcare provider or a support group.`);
    }

    if (data.exercise < 2) recommendations.push("<strong>Lifestyle:</strong> Gradually increase your physical activity. Even short, consistent walks make a big difference.");

    // Sleep Recommendations
    if (data.sleep_hours < 7) recommendations.push("<strong>Sleep:</strong> Aim for 7-9 hours of quality sleep. Establish a regular bedtime routine to improve recovery and focus.");

    // Water Recommendations
    if (data.water_intake < 2) recommendations.push("<strong>Hydration:</strong> Increase your water intake to at least 2-3 liters daily to support metabolism and energy levels.");

    if (data.gender === 'female' && data.age >= 40) recommendations.push("<strong>Screening:</strong> Women over 40 should discuss scheduling regular mammograms with their doctor.");

    if (data.gender === 'male' && data.age >= 50) recommendations.push("<strong>Screening:</strong> Men over 50 should discuss prostate health screenings with their doctor.");

    return recommendations;
}

app.post('/api/health-plan', (req, res) => {
    try {
        const data = req.body;
        const riskResult = predictRisk(data);
        const risk = riskResult.level;
        const healthScore = riskResult.score;
        const recommendations = getRecommendations(data, risk);

        const bmi = (data.weight / ((data.height / 100) ** 2)).toFixed(1);
        let bmiCategory = 'Normal';
        if (bmi < 18.5) bmiCategory = 'Underweight';
        else if (bmi >= 25 && bmi < 30) bmiCategory = 'Overweight';
        else if (bmi >= 30) bmiCategory = 'Obese';

        res.json({
            success: true,
            risk,
            healthScore,
            recommendations,
            stats: {
                bmi,
                bmiCategory,
                sleep_hours: data.sleep_hours,
                water_intake: data.water_intake,
                blood_pressure: data.blood_pressure,
                glucose: data.glucose,
                weight: data.weight
            }
        });
    } catch (error) {
        console.error('Error generating plan:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

export default app;
