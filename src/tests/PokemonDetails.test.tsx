import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(moreDetailsElement);

  expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Summary' })).toBeInTheDocument();
  expect(screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' })).toBeInTheDocument();
});

test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon:', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(moreDetailsElement);

  expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu' })).toBeInTheDocument();
  expect(screen.getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
  expect(screen.getByText(/anto Power Plant/i)).toBeInTheDocument();
  const maps = screen.getAllByRole('img', { name: /Pikachu location/i });
  const firstMap = maps[0];
  const secondMap = maps[1];
  expect(firstMap).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(firstMap).toHaveAttribute('alt', 'Pikachu location');
  expect(secondMap).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  expect(secondMap).toHaveAttribute('alt', 'Pikachu location');
});

test('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(moreDetailsElement);

  const checkedInput = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  await userEvent.click(checkedInput);

  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(favoriteLink);

  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
});
