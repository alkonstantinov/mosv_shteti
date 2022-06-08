import React from "react";
import Application from "../components/Application";
import { Route, Routes, Navigate } from "react-router-dom";

export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Application />} />
        </Routes>
    );
};
