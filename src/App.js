/*
 * PI App
 */

import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import { Game, Leaderboard } from './pages';
import { Layout } from './components';

const App = () => {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="leaderboard" element={<Leaderboard />} />
                </Routes>
            </BrowserRouter>
        </Layout>
    );
};

export default App;