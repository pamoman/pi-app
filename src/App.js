/*
 * PI App
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Game, Leaderboard } from './pages';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;