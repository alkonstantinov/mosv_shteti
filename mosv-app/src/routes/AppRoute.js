import React from "react";
import Application from "../components/Application";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../components/Home";
import DBList from "../components/DBList";
import GenerateDoc from "../components/GenerateDoc";

export const AppRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/application/:isDamaged" element={<Application />} />
            <Route path="/list" element={<DBList />} >
                <Route path=":id" element={<DBList />} />
            </Route>
            <Route path="/generate/:id" element={<GenerateDoc />} />
        </Routes>
    );
};
