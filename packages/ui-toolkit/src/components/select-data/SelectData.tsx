import { type ListCollection, type SelectRootProps } from '@chakra-ui/react';

import { useAsync } from 'react-use';
import { AsyncSelect, type SelectItem } from './AsyncSelect';
import React from 'react';

interface SelectDataProps extends Omit<SelectRootProps, 'collection'> {
  fetchFn: () => Promise<SelectItem[]>;
  mapper: (data: SelectItem[]) => ListCollection<SelectItem>;
}

export const SelectData: React.FC<SelectDataProps> = ({ fetchFn, mapper, ...rest }) => {
  const state = useAsync(fetchFn, []);
  const collection = React.useMemo(() => mapper(state.value || []), [mapper, state.value]);
  return <AsyncSelect {...rest} collection={collection} loading={state.loading} />;
};
