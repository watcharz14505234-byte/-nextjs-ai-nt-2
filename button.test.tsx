import { render, screen } from '@testing-library/react';
import { Button } from './src/components/ui/button';
import { describe, it, expect } from 'vitest';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('applies the correct variant class', () => {
    render(<Button variant="destructive">Danger</Button>);
    const button = screen.getByText('Danger');
    expect(button).toHaveAttribute('data-variant', 'destructive');
  });
});
