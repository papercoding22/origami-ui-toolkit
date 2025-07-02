import { Button, SelectData } from '@paper/ui-toolkit';
import './App.css';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function App() {
  return (
    <>
      <Button>
        <span>Click me!</span>
      </Button>
      <div style={{ marginTop: '20px' }}>
        <SelectData
          fetchFn={async () => {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
            await delay(4000); // Simulate network delay
            const data = await response.json();
            return data.results.map((item: { name: string }) => ({
              id: item.name,
              name: item.name,
            }));
          }}
        />
      </div>
    </>
  );
}

export default App;
