function BattleEventMessage({
  attacker,
  defender,
  damage,
  winner,
  message,
  isCriticalHit,
}) {
  /*
    🏆 Winner state
  */
  if (winner) {
    return (
      <div className="battle-event-message winner-message">
        <img
          src={winner.sprites.front_default}
          alt={winner.name}
          className="battle-event-sprite winner-sprite"
        />

        <strong className="winner-text">🏆 {winner.name} wins!</strong>
      </div>
    );
  }

  /*
    ⚡ Speed intro message
  */
  if (message && attacker) {
    return (
      <div className="battle-event-message">
        <img
          src={attacker.sprites.front_default}
          alt={attacker.name}
          className="battle-event-sprite"
        />

        <strong className="battle-event-text">⚡ {message}</strong>
      </div>
    );
  }

  /*
    💥 Normal attack message
  */
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
  <p className="attack-text">
    <strong>{attacker.name}</strong>
    {" "}attacks!
  </p>

  <p className="damage-text">
    💥 {damage} DAMAGE
  </p>

  {isCriticalHit && (
    <p className="critical-hit-text">
      🔥 CRITICAL HIT!
    </p>
  )}
</div>
    </div>
  );
}

export default BattleEventMessage;
