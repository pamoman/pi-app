/*
 * Context - Socket
 */

import { createContext, useContext } from 'react';

export const SocketContext = createContext();

export const SocketProvider = SocketContext.Provider;

export const useSocket = () => {
    return useContext(SocketContext);
};