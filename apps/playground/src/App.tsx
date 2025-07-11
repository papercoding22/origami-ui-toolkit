import { Picklist } from '@paper/ui-toolkit';

const App = () => {
  return (
    <div style={{ padding: '20px', alignItems: 'center' }}>
      <Picklist label="Select pokemon" name="pokemon" />
      <div style={{ marginTop: '20px' }}>
        <Picklist label="Select country" name="countries" />
      </div>
    </div>
  );
};

export default App;
