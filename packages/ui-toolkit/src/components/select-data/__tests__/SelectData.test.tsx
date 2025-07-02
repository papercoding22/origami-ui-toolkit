/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, expect, beforeEach, it } from 'vitest';
import { SelectData } from '../SelectData';
import type { SelectItem } from '../AsyncSelect';
import { createListCollection } from '@chakra-ui/react';
import '@testing-library/jest-dom';

// Mock AsyncSelect to inspect props
vi.mock('../AsyncSelect', () => ({
  AsyncSelect: (props: any) => (
    <div data-testid="async-select" data-loading={props.loading}>
      {JSON.stringify(props.collection)}
    </div>
  ),
}));

describe('SelectData', () => {
  const items: SelectItem[] = [
    {
      name: 'A',
      id: '1',
    },
    {
      name: 'B',
      id: '2',
    },
  ];

  const fetchFn = vi.fn().mockResolvedValue(items);
  const mapper = vi.fn((data: SelectItem[]) => createListCollection({ items: data }));

  beforeEach(() => {
    fetchFn.mockClear();
    mapper.mockClear();
  });

  it('calls fetchFn and mapper, passes mapped collection to AsyncSelect', async () => {
    render(<SelectData fetchFn={fetchFn} mapper={mapper} />);
    expect(fetchFn).toHaveBeenCalledTimes(1);

    // Initially loading
    expect(screen.getByTestId('async-select').getAttribute('data-loading')).toBe('true');

    await waitFor(() => {
      expect(mapper).toHaveBeenCalledWith(items);
      expect(screen.getByTestId('async-select').getAttribute('data-loading')).toBe('false');
      expect(screen.getByTestId('async-select').textContent).toContain('"size":2');
      expect(screen.getByTestId('async-select').textContent).toContain('"first":""');
      expect(screen.getByTestId('async-select').textContent).toContain('"last":""');
    });
  });

  it('passes additional props to AsyncSelect', async () => {
    render(<SelectData fetchFn={fetchFn} mapper={mapper} />);
    await waitFor(() => {
      expect(screen.getByTestId('async-select').textContent).toContain('"size":2');
    });
  });

  it('handles fetchFn rejection gracefully', async () => {
    const errorFetch = vi.fn().mockRejectedValue(new Error('fail'));
    render(<SelectData fetchFn={errorFetch} mapper={mapper} />);
    await waitFor(() => {
      // Should call mapper with empty array if fetch fails
      expect(mapper).toHaveBeenCalledWith([]);
    });
  });
});
