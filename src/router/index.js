import {IndexPage} from "../pages/Index/IndexPage";

export const privateRoutes = [
    { path: "*", component: IndexPage, exact: true },
];

export const publicRoutes = [
    { path: "/asasas", component: IndexPage, exact: true },
];