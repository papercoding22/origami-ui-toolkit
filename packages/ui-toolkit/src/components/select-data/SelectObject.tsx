import { createListCollection } from '@chakra-ui/react';
import React from 'react';
import { useObject } from '../../hooks';
import { AsyncSelect, type AsyncSelectProps } from './AsyncSelect';
import type { ObjectData } from '../../services';

export interface SelectObjectProps<T> {
  objectName: string;
  filter?: string;
  mapper: (data: T[]) => ObjectData[];
}

export const SelectObject = <T,>({
  objectName,
  filter,
  mapper,
  ...rest
}: SelectObjectProps<T> & Omit<AsyncSelectProps<ObjectData>, 'collection'>) => {
  const state = useObject({ objectName, filter }, mapper);

  const collection = React.useMemo(() => {
    return createListCollection({
      items: state.data ?? [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id ?? item.name,
    });
  }, [state.data]);

  return <AsyncSelect {...rest} collection={collection} loading={state.isLoading} />;
};
