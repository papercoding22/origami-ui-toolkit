import { Picklist } from '@paper/ui-toolkit';
import './App.css';

function App() {
  return (
    <>
      <Picklist label="-- Select Country --" name="countries" params={{ isActive: true }} />
      <Picklist label="-- Select Pokemon --" name="pokemon" params={{ isActive: true }} />
    </>
  );
}

export default App;
