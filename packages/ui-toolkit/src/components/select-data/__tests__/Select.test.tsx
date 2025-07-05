/* eslint-disable @typescript-eslint/no-explicit-any */
import { createListCollection } from '@chakra-ui/react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { Item } from '../../../models';
import { Select } from '../Select';

// Mock Chakra UI Select components
vi.mock('@chakra-ui/react', async () => {
  const actual = await vi.importActual<any>('@chakra-ui/react');
  return {
    ...actual,
    Portal: ({ children }: any) => <div data-testid="portal">{children}</div>,
    Spinner: (props: any) => <div data-testid="spinner" {...props} />,
    Select: {
      Root: ({ children, ...props }: any) => (
        <div data-testid="select-root" {...props}>
          {children}
        </div>
      ),
      HiddenSelect: () => <input data-testid="hidden-select" />,
      Label: ({ children }: any) => <label>{children}</label>,
      Control: ({ children }: any) => <div data-testid="control">{children}</div>,
      Trigger: ({ children }: any) => <button data-testid="trigger">{children}</button>,
      ValueText: ({ placeholder }: any) => <span data-testid="value-text">{placeholder}</span>,
      IndicatorGroup: ({ children }: any) => <div data-testid="indicator-group">{children}</div>,
      Indicator: () => <span data-testid="indicator" />,
      Positioner: ({ children }: any) => <div data-testid="positioner">{children}</div>,
      Content: ({ children }: any) => <div data-testid="content">{children}</div>,
      Item: ({ children, item, ...props }: any) => (
        <div data-testid={`item-${item.name}`} {...props}>
          {children}
        </div>
      ),
      ItemIndicator: () => <span data-testid="item-indicator" />,
    },
  };
});

const items: Item[] = [
  { name: 'Option 1', id: '1' },
  { name: 'Option 2', id: '2' },
];

const collection = createListCollection({
  items,
});

describe('AsyncSelect', () => {
  it('renders with default label', () => {
    render(<Select collection={collection} />);
    // There are two elements with 'Select item': the label and the value text
    const selectItems = screen.getAllByText('Select item');
    expect(selectItems.length).toBe(2);
    expect(screen.getByTestId('value-text')).toHaveTextContent('Select item');
  });

  it('renders with custom label', () => {
    render(<Select collection={collection} label="Choose option" />);
    const chooseOptionElements = screen.getAllByText('Choose option');
    expect(chooseOptionElements.length).toBeGreaterThan(0);
    expect(screen.getByTestId('value-text')).toHaveTextContent('Choose option');
  });

  it('renders all items in the collection', () => {
    render(<Select collection={collection} />);
    items.forEach((item) => {
      expect(screen.getByTestId(`item-${item.name}`)).toHaveTextContent(item.name);
    });
  });

  it('renders Spinner when loading is true', () => {
    render(<Select collection={collection} loading />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('does not render Spinner when loading is false', () => {
    render(<Select collection={collection} loading={false} />);
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('renders ItemIndicator for each item', () => {
    render(<Select collection={collection} />);
    const indicators = screen.getAllByTestId('item-indicator');
    expect(indicators.length).toBe(items.length);
  });
});
