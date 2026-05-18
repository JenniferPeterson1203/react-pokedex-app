import { useEffect, useState } from "react";

/*
  ⌨️ TypingTitle component

  Creates a futuristic typing effect
  for the Pokédex title.
*/

function TypingTitle() {

  // Full text we want to type
  const fullText =
    "WELCOME TO JENNIFER'S POKÉDEX";

  // Stores currently typed letters
  const [displayedText, setDisplayedText] =
    useState("");

  useEffect(() => {

    let currentIndex = 0;

    /*
      ⌨️ Add one letter at a time
    */
    const typingInterval = setInterval(() => {

      setDisplayedText(
        fullText.slice(0, currentIndex + 1)
      );

      currentIndex++;

      /*
        stop typing once finished
      */
      if (currentIndex === fullText.length) {
        clearInterval(typingInterval);
      }

    }, 70);

    // cleanup
    return () =>
      clearInterval(typingInterval);

  }, []);

  return (

    <h2 className="typing-title">

      {displayedText}

      {/* blinking cursor */}
      <span className="cursor">
        _
      </span>

    </h2>
  );
}

export default TypingTitle;