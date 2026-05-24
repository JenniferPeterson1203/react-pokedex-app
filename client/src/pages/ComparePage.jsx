import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import AppLayout from "../components/AppLayout";
import BattleEventMessage from "../components/BattleEventMessage";
import PokemonCompareCard from "../components/PokemonCompareCard";
import PokemonSearchSelect from "../components/PokemonSearchSelect";
import PageState from "../components/PageState";
import simulateBattle from "../utils/battleSimulator";
import { getRandomMove } from "../utils/pokemonMoves";
import usePokemon from "../hooks/usePokemon";

/*
  ComparePage

  Powers the Pokémon Battle Arena.

  Current features:
  - choose two Pokémon
  - start a turn-based battle
  - update HP live
  - shake damaged Pokémon card
  - show one live battle message
  - reveal winner after battle ends
*/
function ComparePage() {
  const { darkMode, setDarkMode } = useTheme();

  const [pokemonOne, setPokemonOne] = useState("");
  const [pokemonTwo, setPokemonTwo] = useState("");

  const [battleStarted, setBattleStarted] = useState(false);
  const [battleFinished, setBattleFinished] = useState(false);

  const [displayedLog, setDisplayedLog] = useState([]);
  const [battleEvent, setBattleEvent] = useState(null);

  const [pokemonOneHP, setPokemonOneHP] = useState(100);
  const [pokemonTwoHP, setPokemonTwoHP] = useState(100);

  const [currentTurn, setCurrentTurn] = useState(null);
  const [damagedPokemon, setDamagedPokemon] = useState(null);

  const { pokemons, isLoading, errorMessage } = usePokemon();

  const selectedPokemonOne = pokemons.find(
    (pokemon) => pokemon.name === pokemonOne,
  );

  const selectedPokemonTwo = pokemons.find(
    (pokemon) => pokemon.name === pokemonTwo,
  );

  const battleResult = simulateBattle(selectedPokemonOne, selectedPokemonTwo);

  /*
    🔁 Reset battle state whenever
    selected Pokémon change.
  */
  useEffect(() => {
    setBattleStarted(false);
    setBattleFinished(false);

    setPokemonOneHP(100);
    setPokemonTwoHP(100);

    setDamagedPokemon(null);
    setBattleEvent(null);

    const arenaLog = [];

    if (selectedPokemonOne) {
      arenaLog.push(`⚔️ ${selectedPokemonOne.name} enters the arena.`);
    }

    if (selectedPokemonTwo) {
      arenaLog.push(`⚔️ ${selectedPokemonTwo.name} enters the arena.`);
    }

    setDisplayedLog(arenaLog);

    if (selectedPokemonOne) {
      setCurrentTurn("pokemonOne");
    }
  }, [selectedPokemonOne, selectedPokemonTwo]);

  /*
    ⚔️ Start turn-based battle

    Version 1:
    - Pokémon 1 attacks first
    - Pokémon 2 attacks second
    - battle continues until one reaches 0 HP
  */
  const startBattle = () => {
    if (!battleResult || battleStarted) {
      return;
    }

    setBattleStarted(true);
    setBattleFinished(false);

    setDisplayedLog([]);
    setBattleEvent(null);

    let localPokemonOneHP = 100;
    let localPokemonTwoHP = 100;
    const getSpeed = (pokemon) => {
      const speedStat = pokemon.stats.find(
        (stat) => stat.stat.name === "speed",
      );

      return speedStat ? speedStat.base_stat : 0;
    };

    let turn =
      getSpeed(selectedPokemonOne) >= getSpeed(selectedPokemonTwo)
        ? "pokemonOne"
        : "pokemonTwo";

    setCurrentTurn(turn);

    setBattleEvent({
      winner: null,
      attacker: turn === "pokemonOne" ? selectedPokemonOne : selectedPokemonTwo,
      defender: null,
      damage: null,
      message:
        turn === "pokemonOne"
          ? `${selectedPokemonOne.name} attacks first!`
          : `${selectedPokemonTwo.name} attacks first!`,
    });

    const battleInterval = setInterval(() => {
      /*
        🛑 Stop battle if someone fainted.
      */
      if (localPokemonOneHP <= 0 || localPokemonTwoHP <= 0) {
        clearInterval(battleInterval);

        const winnerName =
          localPokemonOneHP > 0
            ? selectedPokemonOne.name
            : selectedPokemonTwo.name;

        setBattleFinished(true);
        setDamagedPokemon(null);

        setBattleEvent({
          winner:
            localPokemonOneHP > 0 ? selectedPokemonOne : selectedPokemonTwo,
        });

        return;
      }

      /*
    ATTACK
      */

      const isCriticalHit = Math.random() < 0.2;

      const didMoveMiss = Math.random() < 0.12;

      const baseDamage = Math.floor(Math.random() * 16) + 10;

      const damage = didMoveMiss
        ? 0
        : isCriticalHit
          ? baseDamage * 2
          : baseDamage;

      const effectivenessMessage =
        damage >= 30
          ? "⚡ It's super effective!"
          : damage <= 12
            ? "😬 It's not very effective..."
            : "";

      const selectedMove =
        turn === "pokemonOne"
          ? getRandomMove(selectedPokemonOne)
          : getRandomMove(selectedPokemonTwo);

      if (turn === "pokemonOne") {
        localPokemonTwoHP = Math.max(0, localPokemonTwoHP - damage);

        setPokemonTwoHP(localPokemonTwoHP);

        if (!didMoveMiss) {
          setDamagedPokemon("pokemonTwo");

          setTimeout(() => {
            setDamagedPokemon(null);
          }, 450);
        }

        const missMessage =
          Math.random() < 0.5
            ? `😵 ${selectedPokemonOne.name}'s attack missed!`
            : `💨 ${selectedPokemonTwo.name} avoided the attack!`;

        setBattleEvent({
          attacker: selectedPokemonOne,
          defender: selectedPokemonTwo,
          damage,
          isCriticalHit,
          move: selectedMove,
          effectivenessMessage,
          didMoveMiss,
          missMessage,
        });



        turn = "pokemonTwo";
        setCurrentTurn("pokemonTwo");

        return;
      }

      localPokemonOneHP = Math.max(0, localPokemonOneHP - damage);

      setPokemonOneHP(localPokemonOneHP);

      if (!didMoveMiss) {
        setDamagedPokemon("pokemonOne");

        setTimeout(() => {
          setDamagedPokemon(null);
        }, 450);
      }

      const missMessage =
        Math.random() < 0.5
          ? `😵 ${selectedPokemonTwo.name}'s attack missed!`
          : `💨 ${selectedPokemonOne.name} avoided the attack!`;

      setBattleEvent({
        attacker: selectedPokemonTwo,
        defender: selectedPokemonOne,
        damage,
        isCriticalHit,
        move: selectedMove,
        effectivenessMessage,
        didMoveMiss,
        missMessage,
      });



      turn = "pokemonOne";
      setCurrentTurn("pokemonOne");
    }, 1000);
  };

  const liveWinnerName = battleFinished
    ? pokemonOneHP > 0
      ? selectedPokemonOne?.name
      : selectedPokemonTwo?.name
    : null;

  return (
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      rightSidebar={null}
    >
      <PageState
        isLoading={isLoading}
        errorMessage={errorMessage}
        loadingMessage="Loading battle arena..."
      >
        <div className="compare-page">
          <h1>Pokémon Battle Arena</h1>

          <div className="compare-selectors">
            <PokemonSearchSelect
              label="Choose Pokémon 1"
              pokemons={pokemons}
              selectedName={pokemonOne}
              setSelectedName={setPokemonOne}
            />

            <PokemonSearchSelect
              label="Choose Pokémon 2"
              pokemons={pokemons}
              selectedName={pokemonTwo}
              setSelectedName={setPokemonTwo}
            />
          </div>

          <div className="battle-readout">
            {!battleResult ? (
              <p>Choose two Pokémon to simulate a battle.</p>
            ) : (
              <>
                {battleStarted && battleEvent && (
                  <BattleEventMessage
                    attacker={battleEvent.attacker}
                    defender={battleEvent.defender}
                    damage={battleEvent.damage}
                    winner={battleEvent.winner}
                    message={battleEvent.message}
                    isCriticalHit={battleEvent.isCriticalHit}
                    move={battleEvent.move}
                    effectivenessMessage={battleEvent.effectivenessMessage}
                    didMoveMiss={battleEvent.didMoveMiss}
                    missMessage={battleEvent.missMessage}
                  />
                )}

                <div className="battle-score-row">
                  <span>
                    {selectedPokemonOne.name}: {battleResult.scoreOne}
                  </span>

                  <span>
                    {selectedPokemonTwo.name}: {battleResult.scoreTwo}
                  </span>
                </div>

                <div className="battle-bonus-row">
                  <span>Type Bonus: +{battleResult.typeBonusOne}</span>

                  <span>Type Bonus: +{battleResult.typeBonusTwo}</span>
                </div>

                <div className="battle-health-bars">
                  <div className="battle-health-card">
                    <span>{selectedPokemonOne.name} HP</span>

                    <div className="health-bar">
                      <div
                        className="health-fill"
                        style={{
                          width: `${pokemonOneHP}%`,
                        }}
                      ></div>
                    </div>

                    <strong>{pokemonOneHP}%</strong>
                  </div>

                  <div className="battle-health-card">
                    <span>{selectedPokemonTwo.name} HP</span>

                    <div className="health-bar">
                      <div
                        className="health-fill"
                        style={{
                          width: `${pokemonTwoHP}%`,
                        }}
                      ></div>
                    </div>

                    <strong>{pokemonTwoHP}%</strong>
                  </div>
                </div>

                <button
                  className="auth-btn start-battle-btn"
                  onClick={startBattle}
                  disabled={!battleResult || battleStarted}
                >
                  {battleFinished
                    ? "Battle Finished"
                    : battleStarted
                      ? "Battle Running..."
                      : "Start Battle"}
                </button>
              </>
            )}

            {!battleStarted && (
              <div className="battle-log">
                <h3>Battle Log</h3>

                {displayedLog.length === 0 ? (
                  <p>Select a Pokémon to enter the arena.</p>
                ) : (
                  displayedLog.map((logItem, index) => (
                    <p
                      key={index}
                      className={
                        index === 0
                          ? "battle-log-left"
                          : index === 1
                            ? "battle-log-right"
                            : "battle-log-center"
                      }
                    >
                      {logItem}
                    </p>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="compare-grid">
            <PokemonCompareCard
              pokemon={selectedPokemonOne}
              opponent={selectedPokemonTwo}
              isWinner={battleFinished && pokemonOneHP > 0}
              isLoser={battleFinished && pokemonOneHP <= 0}
              isHit={damagedPokemon === "pokemonOne"}
            />

            <div className="vs-badge">VS</div>

            <PokemonCompareCard
              pokemon={selectedPokemonTwo}
              opponent={selectedPokemonOne}
              isWinner={battleFinished && pokemonTwoHP > 0}
              isLoser={battleFinished && pokemonTwoHP <= 0}
              isHit={damagedPokemon === "pokemonTwo"}
            />
          </div>
        </div>
      </PageState>
    </AppLayout>
  );
}

export default ComparePage;
