import { render, screen } from '@testing-library/react';
import About from '../pages/About';

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  render(<About />);
  const aboutHeader = screen.getByRole('heading', { name: /about/i });
  expect(aboutHeader).toBeInTheDocument();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(<About />);
  const paragraphElement1 = screen.getByText(
    /This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i,
  );
  const paragraphElement2 = screen.getByText(
    /One can filter Pokémon by type, and see more details for each one of them/i,
  );
  expect(paragraphElement1).toBeInTheDocument();
  expect(paragraphElement2).toBeInTheDocument();
});

test('Testa se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
  render(<About />);
  const image = screen.getByRole('img');
  expect(image).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
