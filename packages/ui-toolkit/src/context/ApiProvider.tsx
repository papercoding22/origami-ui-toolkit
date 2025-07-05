import React, { createContext, useContext } from 'react';
import type { ItemAdapter } from '../adapter';

export interface APIContextValue {
  itemAdapter: ItemAdapter;
}

const APIContext = createContext<APIContextValue | undefined>(undefined);

export const APIProvider: React.FC<{ children: React.ReactNode; value: APIContextValue }> = ({
  children,
  value,
}) => {
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
};

export const useAdapter = (): APIContextValue => {
  const context = useContext(APIContext);
  if (!context) throw new Error('useAPI must be used within an APIProvider');
  return context;
};
