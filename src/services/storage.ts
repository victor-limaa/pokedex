import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const mmkvStorage = new MMKV();

export const storage = {
  setItem: (key: string, value: any) =>
    mmkvStorage.set(key, JSON.stringify(value)),
  getItem: (key: string) => {
    const value = mmkvStorage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  removeItem: (key: string) => mmkvStorage.delete(key),
};
