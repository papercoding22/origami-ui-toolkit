import { createListCollection, type ListCollection } from '@chakra-ui/react';
import { useObject } from '../../hooks';
import { AsyncSelect, type AsyncSelectProps, type SelectItem } from './AsyncSelect';

export interface SelectObjectProps<T> {
  objectName: string;
  filter?: string;
  mapper: (data: T[]) => ListCollection<SelectItem>;
}

export const SelectObject = <T,>({
  objectName,
  filter,
  mapper,
  ...rest
}: SelectObjectProps<T> & Omit<AsyncSelectProps<SelectItem>, 'collection'>) => {
  const state = useObject<T, ListCollection<SelectItem>>({ objectName, filter }, mapper);

  const collection = state.data ? state.data : createListCollection<SelectItem>({ items: [] });

  return <AsyncSelect {...rest} collection={collection} loading={state.isLoading} />;
};
