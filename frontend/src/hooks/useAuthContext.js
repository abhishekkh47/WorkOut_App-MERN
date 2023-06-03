import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// we could have used 'useState' hook simply, but we just have created a new custom hook
// now we will use this to consume our workouts context
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error('useAuthContext must be used inside a AuthContextProvider');
    }

    // if we want to use the authContext value, the user vlaue on the state in any component
    // we just invoke this hook and destructure the user from the context object 
    return context;
}