/*
  🧠 MoveInsights

  Shows how a Pokémon learns moves.
*/

function MoveInsights({ pokemon }) {

  if (!pokemon) {
    return null;
  }

  /*
    🎮 Get moves learned by leveling up.
  */
  const levelUpMoves =
    pokemon.moves.filter((move) =>

      move.version_group_details.some(
        (detail) =>
          detail.move_learn_method.name ===
          "level-up"
      )
    );

  /*
    ⚡ Keep only first 6 moves
    so the UI stays clean.
  */
  const featuredMoves =
    levelUpMoves.slice(0, 6);

  return (

    <div className="detail-card">

      <h3>Move Learning Insights</h3>

      {featuredMoves.map((move) => {

        /*
          📈 Find level-up detail
        */
        const levelData =
          move.version_group_details.find(
            (detail) =>
              detail.move_learn_method.name ===
              "level-up"
          );

        return (

          <div
            className="move-insight-row"
            key={move.move.name}
          >

            <span className="move-name">
              {move.move.name}
            </span>

            <span className="move-level">
              Lv.
              {levelData?.level_learned_at}
            </span>

          </div>

        );
      })}

    </div>
  );
}

export default MoveInsights;