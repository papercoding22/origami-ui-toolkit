import { Select, type Item } from '../../components';
import { useGetPicklist } from '../../hooks';

interface PicklistProps {
  name: string;
  label?: string;
  params?: Record<string, unknown>;
}

const Picklist: React.FC<PicklistProps> = ({ name, label, params = {} }) => {
  const state = useGetPicklist(name, params);

  const items: Item[] = state.data
    ? state.data.map((item) => ({
        name: item.name,
        value: item.id.toString(),
        disabled: !item.isActive, // Assuming isActive is a boolean field in the picklist entity
      }))
    : [];

  return <Select label={label} items={items} loading={state.isLoading} />;
};

export default Picklist;
