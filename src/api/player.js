/*
 * Player
 */

import axiosInstance from '../config';
import qs from 'qs';

const playerRequests = {
    getAll: async () => {
        const query = {};

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/players?${queryStr}`);

        return res?.data;
    },
    findOne: async ({ id }) => {
        const query = {};

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/players/${id}?${queryStr}`);

        return res?.data;
    },
    create: async ({ data }) => {
        const res = await axiosInstance.post(`/api/players`, { data });

        return res;
    }
};

export default playerRequests;