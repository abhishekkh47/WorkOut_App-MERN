import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

// we could have used 'useState' hook simply, but we just have created a new custom hook
// now we will use this to consume our workouts context
export const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) {
        throw Error('useWorkoutContext must be used inside a WorkoutContextProvider')
    }

    return context
}