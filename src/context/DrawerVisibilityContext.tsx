"use client";

import { useState, createContext, ReactNode } from "react";

interface DrawerState {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IdState {
    value: any;
    setValue: any;
}

interface DrawerContextType {
    add: DrawerState;
    edit: DrawerState;
    remove: DrawerState;
    view: DrawerState;
    id: IdState;
}

const initialState = {
    add: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    edit: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    remove: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    view: {
        visible: false,
        setVisible: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
    },
    id: {
        value: undefined,
        setValue: undefined,
    },
};

export const DrawerContext = createContext<DrawerContextType>(initialState);

const DrawerVisibilityContext = ({ children }: { children: ReactNode }) => {
    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isRemoveVisible, setIsRemoveVisible] = useState(false);
    const [isViewVisible, setIsViewVisible] = useState(false);
    const [id, setId] = useState<any>();

    return (
        <DrawerContext.Provider
            value={{
                add: {
                    visible: isAddVisible,
                    setVisible: setIsAddVisible,
                },
                edit: {
                    visible: isEditVisible,
                    setVisible: setIsEditVisible,
                },
                remove: { visible: isRemoveVisible, setVisible: setIsRemoveVisible },
                view: { visible: isViewVisible, setVisible: setIsViewVisible },
                id: {
                    value: id,
                    setValue: setId,
                },
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};

export default DrawerVisibilityContext;
