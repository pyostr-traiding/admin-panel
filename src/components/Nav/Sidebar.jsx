import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, Typography, Avatar, Button } from "@mui/material";
import {
    DiamondOutlined,
    CurrencyBitcoinOutlined,
    AttachMoneyOutlined,
    PersonOutlineOutlined,
} from "@mui/icons-material";
import { AuthContext, UserContext } from "../../context";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const { setIsAuth } = useContext(AuthContext);

    const handleDrawer = () => setOpen((prev) => !prev);

    const logout = () => {
        localStorage.removeItem("auth");
        setIsAuth(false);
    };

    // Универсальный стиль для ссылок
    const styleLink = {
        color: "inherit",
        textDecoration: "none",
        display: "block",
        width: "100%",
        padding: "8px 0"
    };

    // Боковое меню
    const DrawerList = (
        <Box
            sx={{ width: 250, height: "100%" }}
            role="presentation"
            onClick={handleDrawer}
        >
            <Typography variant="h6" sx={{ mt: 2, ml: 2, mb: 2 }}>
                Меню
            </Typography>
            <Box sx={{ ml: 2 }}>
                <Link style={styleLink} to="/market">Главная</Link>
                <Link style={styleLink} to="/deal">Монитор</Link>
                <Link style={styleLink} to="/wallets">Кошельки</Link>
                <Link style={styleLink} to="/account">Личный кабинет</Link>
            </Box>
            <Box sx={{ mt: "auto", p: 2, borderTop: "1px solid #eee" }}>
                <Grid container direction="column" alignItems="center" spacing={1}>
                    <Grid item>
                        <Avatar sx={{ bgcolor: "grey.300", width: 56, height: 56 }}>
                            <PersonOutlineOutlined fontSize="large" />
                        </Avatar>
                    </Grid>
                    <Grid item>
                        <Typography align="center" sx={{ fontWeight: 500 }}>
                            {user?.username || "Гость"}
                        </Typography>
                        {user?.statistic && (
                            <Typography align="center" variant="caption" color="text.secondary">
                                {user.statistic}
                            </Typography>
                        )}
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={logout}
                            sx={{ mt: 1 }}
                            fullWidth
                        >
                            Выйти
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: 1,
                borderColor: "divider",
                px: 2,
                py: 1.5,
                background: "background.paper",
                minHeight: 60
            }}
        >
            <IconButton onClick={handleDrawer} size="large">
                <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={handleDrawer}>
                {DrawerList}
            </Drawer>
            <Grid container spacing={2} justifyContent="flex-end" alignItems="center" sx={{ width: "auto" }}>
                <Grid item>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1">6560317,73</Typography>
                        <CurrencyBitcoinOutlined />
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1">289,40</Typography>
                        <DiamondOutlined />
                    </Box>
                </Grid>
                <Grid item>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body1">90,64</Typography>
                        <AttachMoneyOutlined />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
