/*
 * Setting
 */

import axiosInstance from '../config';

const settingRequests = {
    getAll: async () => {
        const res = await axiosInstance.get('/api/setting');

        return res?.data;
    }
};

export default settingRequests;