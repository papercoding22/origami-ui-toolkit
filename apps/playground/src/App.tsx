import { createListCollection } from '@chakra-ui/react';

import { Button, SelectData, SelectItem, type Item } from '@paper/ui-toolkit';
import './App.css';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface User {
  id: string;
  name: string;
}

interface Product {
  id: string;
  productName: string;
}

function App() {
  return (
    <>
      <Button>
        <span>Click me!</span>
      </Button>
      <div style={{ marginTop: '20px' }}>
        <SelectData
          label="Select Pokémon"
          size={'sm'}
          width={'320px'}
          onSelect={(item) => {
            console.log('Selected item:', item);
          }}
          fetchFn={async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            await delay(4000); // Simulate network delay
            const data = await response.json();
            return data.results.map((item: { name: string; url: string }) => ({
              id: `${item.name}-${item.url}`,
              name: item.name,
            }));
          }}
          mapper={(data) => {
            const collection = createListCollection({
              items: data,
              itemToValue: (item) => item.id ?? item.name,
              itemToString: (item) => item.name,
              isItemDisabled: (item) => item.name === 'bulbasaur',
            });
            return collection;
          }}
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <SelectData
          label="Select Products"
          size={'sm'}
          width={'320px'}
          onSelect={(item) => {
            console.log('Selected item:', item);
          }}
          fetchFn={async () => {
            const response = await fetch('https://dummyjson.com/products/search?q=');
            await delay(4000); // Simulate network delay
            const data = await response.json();
            return data.products.map((item: { title: string; id: string }) => ({
              id: item.id,
              name: item.title,
            }));
          }}
          mapper={(data) => {
            const collection = createListCollection({
              items: data,
              itemToValue: (item) => item.id ?? item.name,
              itemToString: (item) => item.name,
              isItemDisabled: (item) => item.name === 'bulbasaur',
            });
            return collection;
          }}
        />
        <SelectItem<User>
          itemName="users"
          label="Select User"
          mapper={(data: User[]) => {
            return createListCollection<Item>({
              items: data.map((user) => ({ id: user.id, name: user.name })),
              itemToValue: (item) => item.id ?? item.name,
              itemToString: (item) => item.name,
              isItemDisabled: (item) => item.name === 'Alice',
            });
          }}
          onSelect={(item) => {
            console.log('Selected user:', item);
          }}
        />
        <SelectItem<Product>
          itemName="products"
          label="Select Product"
          mapper={(data: Product[]) => {
            return createListCollection<Item>({
              items: data.map((product) => ({ id: product.id, name: product.productName })),
              itemToValue: (item) => item.id ?? item.name,
              itemToString: (item) => item.name,
            });
          }}
          onSelect={(item) => {
            console.log('Selected product:', item);
          }}
        />
        <SelectItem<{ customId: string; customName: string }>
          itemName="customItems"
          label="Select Custom Item"
          fetchItems={async (itemName, filter) => {
            console.log(`Fetching custom items for item: ${itemName} with filter: ${filter}`);
            await delay(2000); // Simulate network delay
            return [
              { customId: '1', customName: 'Custom Item 1' },
              { customId: '2', customName: 'Custom Item 2' },
              { customId: '3', customName: 'Custom Item 3' },
            ];
          }}
          mapper={(data) => {
            return createListCollection<Item>({
              items: data.map((item) => ({ id: item.customId, name: item.customName })),
              itemToValue: (item) => item.id ?? item.name,
              itemToString: (item) => item.name,
            });
          }}
        />
      </div>
    </>
  );
}

export default App;
