/*
 * Class
 */

import axiosInstance from '../config';
import qs from 'qs';

const classRequests = {
    getAll: async () => {
        const query = {
            populate: {
                program: {
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

        const res = await axiosInstance.get(`/api/classes?${queryStr}`);

        return res?.data;
    },
    findOne: async ({ id }) => {
        const query = {
            populate: {
                program: {
                    fields: ['name']
                }
            }
        };

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/classes/${id}?${queryStr}`);

        return res?.data;
    }
};

export default classRequests;