function BattleEventMessage({
  attacker,
  defender,
  damage,
  winner,
}) {
  if (winner) {
    return (
      <div className="battle-event-message winner-message">
        <img
          src={winner.sprites.front_default}
          alt={winner.name}
          className="battle-event-sprite"
        />

        <strong>
          🏆 {winner.name} wins!
        </strong>
      </div>
    );
  }

  if (!attacker || !defender || !damage) {
    return null;
  }

  return (
    <div className="battle-event-message">
      <img
        src={attacker.sprites.front_default}
        alt={attacker.name}
        className="battle-event-sprite"
      />

      <div className="battle-event-text">
        <strong>{attacker.name}</strong>
        <span> attacks!</span>
        <p>💥 {damage} damage</p>
      </div>
    </div>
  );
}

export default BattleEventMessage;