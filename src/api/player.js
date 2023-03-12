/*
 * Player
 */

import axiosInstance from '../config';
import qs from 'qs';

const playerRequests = {
    getAll: async () => {
        const query = {
            populate: {
                class: true
            },
            sort: ['score'] 
        };

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/players?${queryStr}`);

        return res?.data;
    },
    getMany: async ({ limit = 20 }) => {
        const query = {
            populate: {
                class: {
                    fields: ['name']
                }
            },
            pagination: {
                limit
            },
            sort: ['score:desc', 'name'] 
        };

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/players?${queryStr}`);

        return res?.data;
    },
    getLeaderboard: async ({ limit = 20 }) => {
        const query = {
            populate: {
                class: {
                    fields: ['name']
                }
            },
            sort: ['score:desc', 'name'],
            limit
        };

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/players/leaderboard?${queryStr}`);

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
        try {
            const res = await axiosInstance.post(`/api/players`, { data });

            return res;
        } catch(e) {
            console.log(e.message);
        }
    }
};

export default playerRequests;