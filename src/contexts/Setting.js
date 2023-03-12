/*
 * Context - Setting
 */

import { createContext, useContext } from 'react';

export const SettingContext = createContext();

export const SettingProvider = SettingContext.Provider;

export const useSetting = () => {
    return useContext(SettingContext);
};