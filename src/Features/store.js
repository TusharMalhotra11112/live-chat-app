import { configureStore } from "@reduxjs/toolkit";
import refreshSidebar from "./refreshSideBar";
import themesliceReducer from "./themeslice";

export const store = configureStore({
    reducer:{
        themeKey: themesliceReducer,
        refreshKey: refreshSidebar,
    },
})