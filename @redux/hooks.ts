import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * FRE - probably the next 2 lines will never be modified :D
 * if you have something to add in this file, then place it above
 */
export const useRootDispatch = () => useDispatch<AppDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;