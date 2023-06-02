import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=>w._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const WorkoutContextProvider = ({ children }) => {
    // using useReducer instead useState
    const [state, dispatch] = useReducer(workoutsReducer, { workouts: null })  // useReducer(function name, initial value)

    // dispatch({'description', payload})
    // dispatch({ type: 'SET_WORKOUTS', payload: [{}] })

    return (
        // ContextProvider wraps a component tree that it wants to provide that context value to
        // 'in our case, its the root/app component (to use state throughout whole application). 
        // otherwise it may be home or some sub-tree of components
        <WorkoutsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
}