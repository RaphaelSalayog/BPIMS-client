"use client";

import { useState, createContext, ReactNode } from "react";

interface UserState {
    value: any;
    setValue: any;
}

interface AuthenticationContextType {
    user: UserState;
}

const initialState = {
    user: {
        value: false,
        setValue: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
};

export const AuthenticationContext = createContext<AuthenticationContextType>(initialState);

const AuthenticationContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState();

    return (
        <AuthenticationContext.Provider
            value={{
                user: {
                    value: user,
                    setValue: setUser,
                },
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContextProvider;
