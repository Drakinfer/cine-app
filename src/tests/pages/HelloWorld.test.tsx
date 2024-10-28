import { render, screen } from '@testing-library/react';
import HelloWorld from '../../pages/HelloWorld';

test('renders Hello World text', () => {
    render(<HelloWorld />);
    const headingElement = screen.getByText(/Hello World/i);
    expect(headingElement).toBeInTheDocument();
});