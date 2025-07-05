import { useAsync } from 'react-use';
import { useAdapter } from '../context';

interface QueryItem<T> {
  itemName: string;
  filter?: string;
  fetchItems?: (itemName: string, filter?: string) => Promise<T[]>;
}

export function useItem<T, P>(query: QueryItem<T>, mapper: (data: T[]) => P) {
  const { itemName, filter } = query;
  const { itemAdapter } = useAdapter();

  const state = useAsync(async () => {
    if (!itemName) {
      throw new Error('Object name is required');
    }

    // use fetchItem  if provided, otherwise use itemAdapter
    if (query.fetchItems) {
      const items = await query.fetchItems(itemName, filter);
      return mapper(items);
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
