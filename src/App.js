/*
 * PI App
 */

import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import io from 'socket.io-client';
import { SocketProvider } from './contexts';
import { Game, Leaderboard } from './pages';
import { Layout } from './components';

const App = () => {
    const socket = io(process.env.REACT_APP_STRAPI_URL);

    return (
        <SocketProvider value={socket}>
            <Layout>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Game />} />
                        <Route path="leaderboard" element={<Leaderboard />} />
                    </Routes>
                </BrowserRouter>
            </Layout>
        </SocketProvider>
    );
};

export default App;