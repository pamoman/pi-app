/*
 * Program
 */

import axiosInstance from '../config';
import qs from 'qs';

const programRequests = {
    getAll: async () => {
        const query = {
            populate: {
                classes: {
                    fields: ['name']
                }
            },
            pagination: {
                limit: 200
            },
            sort: ['name:asc']
        };

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/programs?${queryStr}`);

        return res?.data;
    },
    findOne: async ({ id }) => {
        const query = {
            populate: {
                classes: {
                    fields: ['name']
                }
            },
        };

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/programs/${id}?${queryStr}`);

        return res?.data;
    }
};

export default programRequests;