import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Button } from './Button';

// Mock Chakra UI Button
vi.mock('@chakra-ui/react', () => ({
  Button: ({
    children,
    ...props
  }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{children}</button>
  ),
}));

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies the correct padding style', () => {
    render(<Button>Test</Button>);
    const button = screen.getByText('Test');
    expect(button).toHaveStyle({ padding: '8px 12px' });
  });
});
