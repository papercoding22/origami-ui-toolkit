import { useAsync } from 'react-use';
import { useAPIContext } from '../context/ApiProvider';

export const useGetPicklist = (picklistName: string, params?: Record<string, unknown>) => {
  const { picklistService } = useAPIContext();

  const state = useAsync(async () => {
    if (!picklistName) {
      throw new Error('Picklist name is required');
    }

    const picklist = await picklistService.getPicklist(picklistName, params);
    return picklist;
  });

  return {
    ...state,
    data: state.value,
    isLoading: state.loading,
    isError: state.error,
  };
};
