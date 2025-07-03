import React, { createContext, useContext } from 'react';
import type { ObjectAPI } from '../services/api/objectAPI';

export interface APIContextValue {
  objectAPI: ObjectAPI;
}

const APIContext = createContext<APIContextValue | undefined>(undefined);

export const APIProvider: React.FC<{ children: React.ReactNode; value: APIContextValue }> = ({
  children,
  value,
}) => {
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export const useAPI = (): APIContextValue => {
  const context = useContext(APIContext);
  if (!context) throw new Error('useAPI must be used within an APIProvider');
  return context;
};
