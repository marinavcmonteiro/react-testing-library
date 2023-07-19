import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

test('Testa se é exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', async () => {
  renderWithRouter(<FavoritePokemon />);
  expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();
});

test('Caso a pessoa não tenha Pokémon favorito, testa se são exibidos apenas os Pokémon favoritados', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(moreDetailsElement);

  const checkedInput = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  await userEvent.click(checkedInput);

  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(favoriteLink);

  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
});
