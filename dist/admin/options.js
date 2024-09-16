import componentLoader, { Components } from './component-loader.js';
import Task, { TaskProperties } from '../models/Task.js';
import User, { UserProperties } from '../models/User.js';
import { completedTasksResource, ongoingTasksResource } from '../resources/tasks.js';
const dashboardHandler = async () => {
    const tasks = await Task.find();
    const ongoingTasks = await Task.countDocuments({ status: 'ongoing' });
    const completedTasks = await Task.countDocuments({ status: 'completed' });
    const activeUsers = await User.countDocuments({ isBlocked: false });
    return { tasks, ongoingTasks, completedTasks, activeUsers };
};
const options = {
    dashboard: {
        component: Components.Dashboard,
        handler: dashboardHandler,
    },
    componentLoader,
    rootPath: '/admin',
    branding: {
        logo: 'https://startbizuae.com/wp-content/uploads/2023/09/agence-web-marseille.svg',
    },
    databases: [],
    resources: [
        {
            resource: User,
            options: {
                navigation: {
                    name: 'User Management',
                    icon: 'User',
                },
                ...UserProperties,
            },
        },
        {
            resource: Task,
            options: {
                id: 'tasks',
                navigation: {
                    name: 'Task Management',
                    icon: 'List',
                },
                ...TaskProperties,
                properties: {
                    description: { type: 'richtext' },
                },
            },
        },
        {
            resource: Task,
            options: ongoingTasksResource.options,
        },
        {
            resource: Task,
            options: completedTasksResource.options,
        },
    ],
};
export default options;
