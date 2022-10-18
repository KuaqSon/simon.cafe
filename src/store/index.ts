/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import create, { StoreApi } from 'zustand';

export type StoreSlice<T extends object> = (set: StoreApi<T>, get: StoreApi<T>) => T;

export type Store = {
  lightOn: boolean;
  toggleLight: (on: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const store = (set: Function, get: Function) => ({
  lightOn: false,
  toggleLight: (on: boolean) =>
    set(
      produce((state: Store) => {
        state.lightOn = on;
      })
    ),
});

export const useStore = create<Store>(store);
