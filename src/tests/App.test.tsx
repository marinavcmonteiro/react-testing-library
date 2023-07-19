import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação (Home, About, Favorite Pokémon', () => {
  render(<App />, { wrapper: BrowserRouter });
  const home = screen.getByRole('link', { name: /home/i });
  const about = screen.getByRole('link', { name: /about/i });
  const favorite = screen.getByRole('link', { name: /favorite pokémon/i });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favorite).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home da barra de navegação.', async () => {
  render(<App />, { wrapper: BrowserRouter });

  const homeLink = screen.getByRole('link', { name: /home/i });
  await userEvent.click(homeLink);
  expect(screen.getByText(/Encountered Pokémon/i)).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', async () => {
  render(<App />, { wrapper: BrowserRouter });

  const aboutLink = screen.getByRole('link', { name: /about/i });
  await userEvent.click(aboutLink);
  const aboutHeader = screen.getByRole('heading', { name: /about/i });
  expect(aboutHeader).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação.', async () => {
  render(<App />, { wrapper: BrowserRouter });

  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(favoriteLink);
  const favoriteHeader = screen.getByRole('heading', { name: /favorite pokémon/i });
  expect(favoriteHeader).toBeInTheDocument();
});

test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', async () => {
  renderWithRouter(<App />, { route: '/deconhecida' });
  const notFoundHeader = screen.getByRole('heading', { name: 'Page requested not found' });
  expect(notFoundHeader).toBeInTheDocument();
});
