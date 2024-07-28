import { configureStore } from "@reduxjs/toolkit";
import employee from "./store/reducer/employee";

export default configureStore (
    {
        reducer: {employee} // all reducer entries goes in here
    }
)