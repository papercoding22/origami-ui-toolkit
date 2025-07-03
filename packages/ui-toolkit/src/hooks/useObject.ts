import { useAsync } from 'react-use';
import { useAPI } from '../context';

export function useObject<T, P>(
  query: {
    objectName: string;
    filter?: string;
  },
  mapper: (data: T[]) => P,
) {
  const { objectName, filter } = query;
  const { objectAPI } = useAPI();

  const state = useAsync(async () => {
    if (!objectName) {
      throw new Error('Object name is required');
    }
    const data = await objectAPI.fetchObjectData<T>(objectName, filter);
    const objectData = mapper(data);
    return objectData;
  });

  return {
    ...state,
    data: state.value,
    isLoading: state.loading,
    isError: state.error,
  };
}
