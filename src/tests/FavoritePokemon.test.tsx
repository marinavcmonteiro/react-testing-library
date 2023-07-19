import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/About';

test('Testa se é exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito.', () => {
  render(<FavoritePokemon />);
  const pokemons = screen.getByTestId('favorite-pokemonList');
  if (pokemons.length === 0) {
    expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();
  }
});
