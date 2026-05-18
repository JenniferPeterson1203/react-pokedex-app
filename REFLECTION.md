# Reflection

## 1. Where did you struggle the most?

I struggled the most with managing the different pieces of state as the app grew. At first, the project felt simple because I was only fetching and displaying Pokémon. Once I added search, pagination, favorites, selected Pokémon details, evolution chains, light/dark mode, and scan animations, I had to think more carefully about where logic should live. I also struggled with understanding how API data connects across multiple endpoints, especially for evolution chains, lore, and type effectiveness.

## 2. Step-by-step, how did you debug or research the solution?

I debugged one feature at a time. First, I checked the browser console whenever something broke. Then I used `console.log()` to inspect API responses and understand what data was available. I tested small changes before moving forward, especially after adding new components or hooks. When the app became cluttered, I refactored logic into reusable components and custom hooks like `usePokemon` and `useFavorites`. I also used the PokéAPI documentation to understand how Pokémon details, species data, evolution chains, and type effectiveness were connected.

## 3. Did you peek at the “last-resort” sample repo? If yes, what exactly did you learn and re-implement?

I did not copy code from the last-resort sample repo. I built my version step by step using React concepts from class, the PokéAPI documentation, debugging, and component refactoring. The final design, features, styling, and file structure were implemented in my own way.

## 4. One improvement you’d tackle with more time.

With more time, I would add a Pokémon comparison feature where users can select two Pokémon and compare their stats, weaknesses, resistances, and evolution chains side by side. I would also consider adding a radar chart for stat visualization and more accessibility polish.