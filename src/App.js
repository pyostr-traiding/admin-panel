import React, { useEffect, useMemo, useState, useCallback } from "react";
import { BrowserRouter } from "react-router-dom";
import {
    AuthContext,
    ColorModeContext,
    NotificationContext,
    UserContext
} from "./context";
import AppRouter from "./AppRouter";
import "./App.css";
import Navbar from "./components/Nav/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AuthPage } from "./pages/Auth/AuthPage";
import { AlertNotification } from "./components/AlertNotification/AlertNotification";

// Получение темы из localStorage с запасным вариантом
const getInitialMode = () => localStorage.getItem("themeMode") || "light";

// Получение токена авторизации из localStorage
const getToken = () => localStorage.getItem("auth");

function App() {
    const [notification, setNotification] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState(getInitialMode);
    const [user, setUser] = useState(null);

    // Смена темы и сохранение её в localStorage
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const nextMode = prevMode === "light" ? "dark" : "light";
                    localStorage.setItem("themeMode", nextMode);
                    return nextMode;
                });
            },
        }),
        []
    );

    // Создание темы для Material UI
    const theme = useMemo(() =>
            createTheme({
                palette: { mode },
            }),
        [mode]
    );

    // Проверка авторизации при запуске
    useEffect(() => {
        const token = getToken();
        if (token) {
            setIsAuth(true);
            // Здесь можно добавить проверку токена на валидность
        } else {
            setIsAuth(false);
        }
        setIsLoading(false);
    }, []);

    // Если у тебя есть страница авторизации, можно показать её, пока не загрузились данные
    if (isLoading) {
        // Можно сделать свой лоадер
        return <div>Загрузка...</div>;
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
            <BrowserRouter>
                <ColorModeContext.Provider value={colorMode}>
                    <ThemeProvider theme={theme}>
                        <NotificationContext.Provider value={{ notification, setNotification }}>
                            <UserContext.Provider value={{ user, setUser }}>
                                {notification && (
                                    <AlertNotification
                                        data={notification}
                                        setNotification={setNotification}
                                    />
                                )}
                                {isAuth ? (
                                    <>
                                        <Navbar />
                                        <AppRouter />
                                    </>
                                ) : (
                                    <AuthPage />
                                )}
                            </UserContext.Provider>
                        </NotificationContext.Provider>
                    </ThemeProvider>
                </ColorModeContext.Provider>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
