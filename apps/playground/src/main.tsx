import { StrictMode } from 'react';
import { Provider } from '@/components/ui/provider';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { APIProvider, type APIContextValue } from '@paper/ui-toolkit';

const mockDB: { [key: string]: Array<unknown> } = {
  users: [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
  ],
  products: [
    { id: '1', productName: 'Laptop' },
    { id: '2', productName: 'Smartphone' },
    { id: '3', productName: 'Tablet' },
  ],
};

const apiService: APIContextValue = {
  itemAdapter: {
    fetchItems: async <T,>(itemName: string, filter?: string): Promise<T[]> => {
      console.log(`Fetching items for item: ${itemName} with filter: ${filter}`);
      if (!mockDB[itemName]) {
        throw new Error(`Item ${itemName} not found`);
      }
      // fake network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = mockDB[itemName] as T[];
      return data;
    },
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIProvider value={apiService}>
      <Provider>
        <App />
      </Provider>
    </APIProvider>
  </StrictMode>,
);
