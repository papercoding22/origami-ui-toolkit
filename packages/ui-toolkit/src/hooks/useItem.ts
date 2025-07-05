import { useAsync } from 'react-use';
import { useAdapter } from '../context';

interface QueryItem {
  itemName: string;
  filter?: string;
}

export function useItem<T, P>(query: QueryItem, mapper: (data: T[]) => P) {
  const { itemName, filter } = query;
  const { itemAdapter } = useAdapter();

  const state = useAsync(async () => {
    if (!itemName) {
      throw new Error('Object name is required');
    }

    const items = await itemAdapter.fetchItems<T>(itemName, filter);

    return mapper(items);
  }, [itemName, filter, itemAdapter]);

  return {
    ...state,
    data: state.value,
    isLoading: state.loading,
    isError: state.error,
  };
}
