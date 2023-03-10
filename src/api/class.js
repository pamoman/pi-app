/*
 * Class
 */

import axiosInstance from '../config';
import qs from 'qs';

const classRequests = {
    getAll: async () => {
        const query = {
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
        const query = {};

        const queryStr = qs.stringify(query, {
            encodeValuesOnly: true,
        });

        const res = await axiosInstance.get(`/api/classes/${id}?${queryStr}`);

        return res?.data;
    },
    getPrograms: (classes) => {
        const programs = [];

        classes.forEach(c => {
            const { name: classname } = c?.attributes;
            
            const name = classRequests.getProgramName(classname);

            if (!programs.includes(name)) {
                programs.push(name);
            }
        });

        return programs.sort();
    },
    getProgramName: (classname) => {
        let name;
    
        switch (classname) {
            case 'EEVUX':
                name = 'EE';
                break;
            case 'HVSVUX':
                name = 'HV';
                break;
            case 'INY':
                name = 'IN';
                break;
            case 'RLVUX':
                name = 'RL';
                break;
            case 'T4':
                name = 'TE';
                break;
            case 'ÅR4':
                name = classname;
                break;
            case 'VKTM':
                name = classname;
                break;
            default:
                name = classname.substring(0, 2);
                break;
        }
    
        return name;
    },
};

export default classRequests;