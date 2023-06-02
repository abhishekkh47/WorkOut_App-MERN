import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
    // We don't need this 'useState as we will now use our custom hook 'useWorkoutContext'
    // const [workouts, setWorkouts] = useState(null);
    const {workouts, dispatch} = useWorkoutContext();   // workouts is the initial value and dispath is the function which we will use to fetch data after its changed

    // useEffect hook fire a function when the component is rendered
    // we only want to fire this function once when the component is rendered
    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts');
            const json = await response.json();

            if (response.ok) {
                // setWorkouts(json)   ---> no need of this as this will be done using hooks
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts();
    }, [dispatch]); //this is a dependency array which means that the function is fired once
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    // <p key={workout._id}>{workout.title}</p>
                    <WorkoutDetails key={workout._id} workout={workout}></WorkoutDetails>
                ))}
            </div>
            <WorkoutForm></WorkoutForm>
        </div>
    )
}

export default Home