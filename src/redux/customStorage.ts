'use client';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

// I am creating a dummy store since its impossible to create local storage in the server side.
// By checking existence of the window object i can choose when to create the storage.

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
