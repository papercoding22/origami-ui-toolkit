import { createListCollection, type ListCollection } from '@chakra-ui/react';

import React from 'react';
import { useAsync } from 'react-use';

import type { Item } from '../../models';
import { Select, type SelectProps } from './Select';

interface SelectDataProps extends Omit<SelectProps<Item>, 'collection'> {
  fetchFn: () => Promise<Item[]>;
  mapper?: (data: Item[]) => ListCollection<Item>;
}

export const AsyncSelect: React.FC<SelectDataProps> = ({ fetchFn, mapper, ...rest }) => {
  const state = useAsync(fetchFn, []);

  const collection = mapper
    ? mapper(state.value || [])
    : createListCollection<Item>({
        items: state.value || [],
        itemToString: (item) => item.name,
        itemToValue: (item) => item.id,
      });

  return <Select {...rest} collection={collection} loading={state.loading} />;
};
