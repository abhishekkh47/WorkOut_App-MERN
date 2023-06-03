import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });

    console.log('AuthContext state:', state);

    return (
        // this will wrap our entire applicaiton and therefore, we can output the children
        // it means it will wrap our root component i.e. 'children' over here and it will 
        // provide our state value to the entire application because the root app component 
        // surrounds every other component
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}