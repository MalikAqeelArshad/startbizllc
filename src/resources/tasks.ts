import { TaskProperties } from '../models/Task.js';

// Resource for Ongoing Tasks
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
          list: true, // Hide the status in the list view as it's implicitly "ongoing"
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
          // Ensure only ongoing tasks are shown in this resource
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

// Resource for Completed Tasks
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
          list: false, // Hide the status in the list view as it's implicitly "completed"
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
          // Ensure only completed tasks are shown in this resource
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
