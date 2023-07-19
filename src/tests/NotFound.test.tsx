import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
  render(<NotFound />);
  const h2Element = screen.getByText(/Page requested not found/i);
  expect(h2Element).toBeInTheDocument();
});

test('Testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  render(<NotFound />);
  const image = screen.getByRole('img');
  expect(image).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
