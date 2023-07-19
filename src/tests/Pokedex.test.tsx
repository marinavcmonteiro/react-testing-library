import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />, { route: '/' });
  const h2Element = screen.getByRole('heading', { name: /Encountered Pokémon/i });
  expect(h2Element).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  renderWithRouter(<App />, { route: '/' });
  const btnNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
  for (let index = 0; index < pokemonList; index += 1) {
    const dataPokemon = pokemonList[index].name;
    expect(screen.getByText(dataPokemon)).toBeInTheDocument();
    userEvent.click(btnNext);
    if (index === pokemonList - 1) {
      expect(screen.getByText(pokemonList[0].name)).toBeInTheDocument();
    } else {
      expect(screen.getByText(pokemonList[index + 1].name)).toBeInTheDocument();
    }
  }
});

test('Testa se a Pokédex tem os botões de filtro:', () => {
  renderWithRouter(<App />, { route: '/' });
  const btnAll = screen.getByRole('button', { name: 'All' });
  const buttonFilters = screen.getAllByTestId('pokemon-type-button');
  const types = ['All', 'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
  console.log(buttonFilters[0].innerHTML);
  buttonFilters.forEach((btn) => {
    expect(btn).toBeInTheDocument();
    expect(types).toContain(btn.innerHTML);
    expect(btnAll).toBeInTheDocument();
  });
});

test('Testa se após a seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
  renderWithRouter(<App />, { route: '/' });
  const btnNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
  const btnTypePsychic = screen.getByRole('button', { name: 'Psychic' });
  const btnAll = screen.getByRole('button', { name: 'All' });
  const pokemonsPsychic = pokemonList.filter((pokemon) => pokemon.type === 'Psychic');

  await userEvent.click(btnTypePsychic);
  expect(screen.getByText(pokemonsPsychic[0].name)).toBeInTheDocument();
  await userEvent.click(btnNext);
  expect(screen.getByText(pokemonsPsychic[1].name)).toBeInTheDocument();
  await userEvent.click(btnNext);
  expect(screen.getByText(pokemonsPsychic[0].name)).toBeInTheDocument();
  expect(btnAll).toBeInTheDocument();
});

test('Testa se a Pokédex contém um botão para resetar o filtro:', async () => {
  renderWithRouter(<App />, { route: '/' });
  const btnAll = screen.getByRole('button', { name: 'All' });
  const btnFire = screen.getByRole('button', { name: 'Fire' });
  expect(btnAll).toBeInTheDocument();

  await userEvent.click(btnFire);
  expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
  await userEvent.click(btnAll);
  expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
});
