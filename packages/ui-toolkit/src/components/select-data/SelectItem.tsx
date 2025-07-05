import { createListCollection, type ListCollection } from '@chakra-ui/react';

import { useItem } from '../../hooks';
import type { Item } from '../../models';
import { Select, type SelectProps } from './Select';

export interface SelectObjectProps<T> {
  itemName: string;
  filter?: string;
  fetchItems?: (itemName: string, filter?: string) => Promise<T[]>;
  mapper: (data: T[]) => ListCollection<Item>;
}

export const SelectItem = <T,>({
  itemName,
  filter,
  mapper,
  fetchItems,
  ...rest
}: SelectObjectProps<T> & Omit<SelectProps<Item>, 'collection'>) => {
  const state = useItem<T, ListCollection<Item>>({ itemName, filter, fetchItems }, mapper);

  const collection = state.data ? state.data : createListCollection<Item>({ items: [] });

  return <Select {...rest} collection={collection} loading={state.isLoading} />;
};
