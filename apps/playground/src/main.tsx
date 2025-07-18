import {
  APIProvider,
  PicklistEntity,
  PicklistService,
  type APIContextValue,
  type PicklistProvider,
} from '@paper/ui-toolkit';
import { Provider } from '../src/components/ui/provider.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

class PokemonPicklistAdapter implements PicklistProvider {
  async getPicklist(
    picklistName: string,
    params?: Record<string, unknown>,
  ): Promise<PicklistEntity[]> {
    // log
    console.log(`Fetching picklist: ${picklistName} with params:`, params);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    switch (picklistName) {
      case 'countries':
        return Promise.resolve([
          { id: 1, name: 'United States', isActive: true },
          { id: 2, name: 'Canada', isActive: true },
          { id: 3, name: 'Mexico', isActive: false },
        ]);
      case 'pokemon':
        return Promise.resolve([
          { id: 1, name: 'Bulbasaur', isActive: true },
          { id: 2, name: 'Charmander', isActive: true },
          { id: 3, name: 'Squirtle', isActive: false },
        ]);
      default:
        return Promise.reject(new Error(`Picklist ${picklistName} not found`));
    }
  }
}

const apiService: APIContextValue = {
  picklistService: new PicklistService(new PokemonPicklistAdapter()),
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
