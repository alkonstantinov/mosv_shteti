import React from "react";
import Application from "../components/Application";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Home";
import DBList from "../components/DBList";

export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/application" element={<Application />} />
            <Route path="/list" element={<DBList />} >
                <Route path=":id" element={<DBList />} />
            </Route>
        </Routes>
    );
};
