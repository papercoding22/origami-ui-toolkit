import { Button, SelectData, SelectObject } from '@paper/ui-toolkit';
import './App.css';
import { createListCollection } from '@chakra-ui/react';

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
        <SelectObject<User>
          objectName="users"
          mapper={(data: User[]) => data.map((user) => ({ id: user.id, name: user.name }))}
          onSelect={(item) => {
            console.log('Selected user:', item);
          }}
        />
        <SelectObject<Product>
          objectName="products"
          mapper={(data: Product[]) =>
            data.map((user) => ({ id: user.id, name: user.productName }))
          }
          onSelect={(item) => {
            console.log('Selected product:', item);
          }}
        />
      </div>
    </>
  );
}

export default App;
