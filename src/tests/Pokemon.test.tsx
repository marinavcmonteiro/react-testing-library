import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Testa se é renderizado um card com as informações de determinado Pokémon:', () => {
  renderWithRouter(<App />, { route: '/' });
  const namePokemon = screen.getByTestId('pokemon-name');
  expect(namePokemon).toHaveTextContent('Pikachu');

  const typePokemon = screen.getByTestId('pokemon-type');
  expect(typePokemon).toHaveTextContent('Electric');

  const weightPokemon = screen.getByTestId('pokemon-weight');
  expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');

  const imagePokemon = screen.getByRole('img', { name: /pikachu sprite/i });
  expect(imagePokemon).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  expect(imagePokemon).toHaveAttribute('alt', 'Pikachu sprite');
});

test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes desse Pokémon. O link deve ter a URL /pokemon/<id>, em que <id> é o id do Pokémon exibido.', () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  expect(moreDetailsElement).toHaveAttribute('href', '/pokemon/25');
});

test('Teste se, ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(moreDetailsElement);
  expect(screen.getByText(/Pikachu Details/i)).toBeInTheDocument();
});

test('Testa se existe um ícone de estrela nos Pokémon favoritados:', async () => {
  renderWithRouter(<App />, { route: '/' });
  const moreDetailsElement = screen.getByRole('link', { name: /more details/i });
  await userEvent.click(moreDetailsElement);

  const checkedInput = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
  await userEvent.click(checkedInput);

  const favoriteLink = screen.getByRole('link', { name: /favorite pokémon/i });
  await userEvent.click(favoriteLink);

  const favoriteIcon = screen.getByRole('img', { name: /Pikachu is marked as favorite/i });
  expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  expect(favoriteIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
