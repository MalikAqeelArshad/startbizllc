import { TaskProperties } from '../models/Task.js';
export const ongoingTasksResource = {
    options: {
        id: 'ongoing',
        parent: {
            name: 'Task Management',
        },
        ...TaskProperties,
        properties: {
            description: { type: 'richtext' },
            status: {
                isVisible: {
                    list: true,
                    filter: false,
                    show: true,
                    edit: false,
                },
            },
        },
        actions: {
            new: { isVisible: false },
            edit: { isVisible: true },
            delete: { isVisible: true },
            show: { isVisible: true },
            list: {
                before: async (request, context) => {
                    request.query = {
                        ...request.query,
                        'filters.status': 'ongoing',
                    };
                    return request;
                },
            },
        },
    },
};
export const completedTasksResource = {
    options: {
        id: 'completed',
        parent: {
            name: 'Task Management',
        },
        ...TaskProperties,
        properties: {
            description: { type: 'richtext' },
            status: {
                isVisible: {
                    list: false,
                    filter: false,
                    show: true,
                    edit: false,
                },
            },
        },
        actions: {
            new: { isVisible: false },
            edit: { isVisible: true },
            delete: { isVisible: true },
            show: { isVisible: true },
            list: {
                before: async (request, context) => {
                    request.query = {
                        ...request.query,
                        'filters.status': 'completed',
                    };
                    return request;
                },
            },
        },
    },
};
