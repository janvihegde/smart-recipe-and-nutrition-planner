import React, { useState, useEffect, useCallback } from 'react';
import { FaCalendarAlt, FaSpinner, FaCalendarCheck, FaPlus, FaPencilAlt, FaEye, FaUtensils, FaCheckSquare } from 'react-icons/fa';
import axios from 'axios';

const API_BASE_URL = "/api/recipe";
const MEALPLAN_API_URL = "/api/mealplan";

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner"];

const MealPlannerPage = () => {
    const [availableRecipes, setAvailableRecipes] = useState([]);
    const [isRecipesLoading, setIsRecipesLoading] = useState(true);

    // State to hold the plan currently being edited/viewed
    const [plannerState, setPlannerState] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [latestPlanId, setLatestPlanId] = useState(null);
    const [message, setMessage] = useState('');

    // --- Data Fetching and Initialization ---

    const fetchAllData = useCallback(async () => {
        setIsRecipesLoading(true);
        try {
            // 1. Fetch available recipes
            const recipeResponse = await axios.get(API_BASE_URL);
            const validRecipes = recipeResponse.data.filter(r => r.name);
            setAvailableRecipes(validRecipes);

            // 2. Fetch latest saved plan
            const planResponse = await axios.get(`${MEALPLAN_API_URL}/latest`);
            const fetchedPlan = planResponse.data;

            let initialPlanner = {};
            if (fetchedPlan && fetchedPlan.weeklyPlan) {
                initialPlanner = fetchedPlan.weeklyPlan;
                setLatestPlanId(fetchedPlan.id);
            } else {
                // Default empty structure
                DAYS_OF_WEEK.forEach(day => {
                    initialPlanner[day] = MEAL_TYPES.reduce((acc, meal) => ({ ...acc, [meal]: [] }), {});
                });
            }
            setPlannerState(initialPlanner);
            setIsEditing(false); // Default to view mode
            setMessage(fetchedPlan ? "Latest plan loaded successfully." : "No plan found. Start by adding one!");

        } catch (error) {
            console.error("Failed to fetch planner data:", error);
            setMessage("Error: Could not load meal plan data.");
        } finally {
            setIsRecipesLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // --- Interaction Logic ---

    // Handles checking/unchecking a recipe for a single meal slot (enforcing one recipe per slot)
    const handleToggleRecipe = (recipeId, day, mealType) => {
        if (!isEditing) return;

        setPlannerState(prevPlanner => {
            const currentRecipes = prevPlanner[day][mealType];
            const isTicked = currentRecipes.includes(recipeId);

            return {
                ...prevPlanner,
                [day]: {
                    ...prevPlanner[day],
                    // If ticked, untick ([]). If not ticked, tick the new recipe ([recipeId]).
                    [mealType]: isTicked ? [] : [recipeId],
                },
            };
        });
    };

    const handleSavePlan = async () => {
        const planToSave = {
            id: latestPlanId,
            weeklyPlan: plannerState,
        };

        try {
            const res = await axios.post(MEALPLAN_API_URL, planToSave);
            setLatestPlanId(res.data.id);
            setIsEditing(false); // Exit edit mode
            setMessage("Plan saved successfully! Now in View mode.");
        } catch (error) {
            console.error("Failed to save plan:", error);
            setMessage("Error: Failed to save plan. Check console.");
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setMessage("📝 EDIT MODE: Select the one recipe you want for each meal slot.");
    };

    // --- Render Component ---

    if (isRecipesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <FaSpinner className="animate-spin text-4xl text-primary-600" />
                <p className="ml-4 text-primary-600">Loading recipes and latest plan...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 pt-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-extrabold text-primary-800 flex items-center">
                        <FaCalendarAlt className="mr-3 text-secondary-600" /> Weekly Meal Planner
                    </h1>

                    {/* Save/Edit/View Buttons */}
                    <div className='space-x-3'>
                        {latestPlanId && !isEditing && (
                            <button
                                onClick={handleEditClick}
                                className="py-2 px-6 bg-secondary-500 text-primary-50 rounded-xl font-semibold hover:bg-secondary-600 transition-colors shadow-md shadow-secondary-500/30"
                            >
                                <FaPencilAlt className="inline mr-2"/> Edit Plan
                            </button>
                        )}
                        {isEditing && (
                            <button
                                onClick={handleSavePlan}
                                className="py-2 px-6 bg-primary-600 text-primary-50 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-md shadow-primary-500/30"
                            >
                                <FaCalendarCheck className="inline mr-2"/> Save Plan
                            </button>
                        )}
                    </div>
                </div>

                {/* Status/Mode Banner */}
                <div className={`p-4 mb-8 rounded-xl shadow-md font-bold text-center border-2
                    ${isEditing ? 'bg-secondary-100 text-secondary-800 border-secondary-400' : 'bg-primary-100 text-primary-700 border-primary-400'}`}>
                    {message}
                </div>

                {availableRecipes.length === 0 ? (
                    <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-primary-200">
                        <p className="text-xl text-gray-600">You need to add some recipes first to start planning your meals!</p>
                        <a href="/recipes" className="mt-4 inline-block bg-primary-600 text-primary-50 py-2 px-6 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                            <FaPlus className='inline mr-2'/> Add Recipe Now
                        </a>
                    </div>
                ) : (
                    <div className="bg-white shadow-2xl rounded-xl border border-primary-300">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-primary-200">
                                <thead className="bg-primary-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-primary-800 uppercase tracking-wider sticky left-0 bg-primary-50 z-10">Recipe / Meal</th>
                                        {DAYS_OF_WEEK.map(day => (
                                            <th key={day} className="px-4 py-3 text-center text-sm font-bold text-primary-800 uppercase tracking-wider">
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-primary-100 bg-white text-gray-800">
                                    {availableRecipes.map(recipe => (
                                        <tr key={recipe.id} className="hover:bg-primary-50 transition-colors">
                                            <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-primary-700 sticky left-0 bg-white hover:bg-primary-50 flex items-center z-10">
                                                <FaUtensils className='mr-2 text-secondary-500'/> {recipe.name}
                                            </td>
                                            {DAYS_OF_WEEK.map(day => (
                                                <td key={day} className="px-4 py-2 text-center">
                                                    <div className='flex flex-col space-y-1'>
                                                        {MEAL_TYPES.map(meal => {
                                                            const isTicked = plannerState[day] && plannerState[day][meal] && plannerState[day][meal].includes(recipe.id);

                                                            if (isEditing) {
                                                                return (
                                                                    <div key={meal} className='flex items-center justify-center space-x-1'>
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isTicked}
                                                                            onChange={() => handleToggleRecipe(recipe.id, day, meal)}
                                                                            className="h-4 w-4 text-secondary-600 border-gray-300 rounded focus:ring-secondary-500 cursor-pointer"
                                                                        />
                                                                        <label className="text-xs text-gray-600">{meal}</label>
                                                                    </div>
                                                                );
                                                            } else {
                                                                // View Mode
                                                                return (
                                                                    <div key={meal} className='text-xs font-semibold'>
                                                                        {isTicked ? (
                                                                            <span className='bg-primary-500 text-primary-50 px-2 py-0.5 rounded-full'>
                                                                                {meal}
                                                                            </span>
                                                                        ) : (
                                                                            <span className='text-gray-400'>{meal}</span>
                                                                        )}
                                                                    </div>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {isEditing && (
                            <div className="p-5 border-t bg-secondary-50 flex justify-end">
                                <button
                                    onClick={handleSavePlan}
                                    className="bg-primary-600 text-primary-50 py-3 px-8 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-md shadow-primary-500/30"
                                >
                                    <FaCalendarCheck className="inline mr-2"/> Save Weekly Plan
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MealPlannerPage;