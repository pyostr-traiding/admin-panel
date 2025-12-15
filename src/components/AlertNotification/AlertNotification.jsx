import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

export const AlertNotification = ({ data, setNotification }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress > 0) {
                    return prevProgress - (100 / 5000) * 100;
                } else {
                    clearInterval(timer);
                    return 0;
                }
            });
        }, 100);

        // Когда прогресс достигает 0, скрываем уведомление
        if (progress === 0) {
            setIsVisible(false);
            setNotification(() => null);
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    }, [progress, setNotification]);

    const handleClose = () => {
        setIsVisible(false);
        setNotification(() => null);
    };
    const getColor = () => {
        switch (data.level) {
            case "notif":
                return "#ffffff";
            case "info":
                return "#ffffff";
            case "warning":
                return "#ffffff";
            case "error":
                return "#ffffff";
            default:
                return "#000000";
        }
    };
    const getBackgroundColor = () => {
        switch (data.level) {
            case "notif":
                return "#2765ff";
            case "info":
                return "#2964ff";
            case "warning":
                return "#ed6c02";
            case "error":
                return "rgb(253, 45, 45)";
            default:
                return "#fff";
        }
    };
    return (
        <MuiAlert
            elevation={6}
            variant="standard"
            style={{
                position: "absolute",
                zIndex: 99999,
                width: "100%",
                maxWidth: "400px",
                right: 0,
            }}
            severity={
                data.level === "info"
                    ? "info"
                    : data.level === "warning"
                        ? "warning"
                        : "error"
            }
            onClose={handleClose}
        >
            <strong>{data.title}</strong>
            <br />
            {data.text}
        </MuiAlert>
    );
};

AlertNotification.propTypes = {
    data: PropTypes.shape({
        text: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        level: PropTypes.string.isRequired,
        title: PropTypes.string,
    }),
    setNotification: PropTypes.func.isRequired,
};