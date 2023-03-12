/*
 * PI App
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import io from 'socket.io-client';
import { SocketProvider, SettingProvider } from './contexts';
import { settingRequests } from './api';
import { Game, Leaderboard } from './pages';
import { Layout } from './components';

const App = () => {
    const [settings, setSettings] = useState(null);
    const socket = io(process.env.REACT_APP_STRAPI_URL);

    useEffect(() => {
        settingRequests.getAll().then(res => {
            const { data } = res || {};
            const { attributes = {} } = data || {};

            setSettings(attributes);
        });
    }, []);

    return (
        <SettingProvider value={settings} >
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
        </SettingProvider>
    );
};

export default App;