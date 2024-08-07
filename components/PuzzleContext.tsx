import React, { createContext, useState, useContext } from "react";

const PuzzleContext = createContext();

export const PuzzleProvider = ({ children }) => {
  const [pieces, setPieces] = useState([]);
  const [hidden, setHidden] = useState(0);
  const [stepCount, setStepCount] = useState(0);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const resetPuzzle = (piecesArray) => {
    setPieces(shuffleArray([...piecesArray]));
    setHidden(0);
    setStepCount(0);
  };

  return (
    <PuzzleContext.Provider
      value={{
        pieces,
        setPieces,
        hidden,
        setHidden,
        stepCount,
        setStepCount,
        resetPuzzle,
      }}
    >
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => useContext(PuzzleContext);
