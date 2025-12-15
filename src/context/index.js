import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(false);

export const UserContext = createContext({});


export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});

export const CurrencyContext = createContext("RUB");

export const NotificationContext = createContext(false);