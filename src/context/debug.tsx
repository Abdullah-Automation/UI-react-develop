import { createContext, useContext } from 'react';

export const DebugContext = createContext(false); // default value is false

export const useDebug = () => useContext(DebugContext);
