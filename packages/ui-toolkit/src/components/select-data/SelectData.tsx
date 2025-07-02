import { createListCollection, type ListCollection } from '@chakra-ui/react';

import { useAsync } from 'react-use';
import { AsyncSelect, type NamedItem } from './AsyncSelect';

interface SelectDataProps {
  fetchFn: () => Promise<NamedItem[]>;
}

export const SelectData: React.FC<SelectDataProps> = ({ fetchFn }) => {
  const state = useAsync(fetchFn, []);

  const collection: ListCollection<NamedItem> = createListCollection({
    items: state.value ?? [],
    itemToValue: (item) => item.name,
    itemToString: (item) => item.name,
  });

  return <AsyncSelect collection={collection} loading={state.loading} />;
};
