//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//data
import { wordsList } from './data/words';

//componentes
import StartScreen from './Components/StartScreen';
import Game from './Components/Game';
import GameOver from './Components/GameOver';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {
    //selecionando uma categoria aleatoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    //selecionando uma palava aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]


    return {word, category}
  }, [words]);

  

  //Iniciar o jogo
  const startGame = useCallback(() => {
    //apagar todas a letras
    clearLetterStages();

    //selecionar palavra e categoria
    const { word, category } = pickWordAndCategory();

    // criar array de letras
    let wordLetters = word.split("");

    //letras minusculas
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    
    console.log(wordLetters);
    console.log(word, category);

    //states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //iniciar o jogo
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);


  //processar letra input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    // Checar se a letra ja foi utilizada
    if(
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)
      ){
      return; 
    }

    // push guessed letter or remove a chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
    ]);

    setGuesses((actualGuesses) => actualGuesses - 1)
    }
  };

  // clear letters state
  const clearLetterStages = () => {
    setGuessedLetters([])
    setWrongLetters([])
  };


  // check if guesses ended
  useEffect(() => {
      if(guesses === 0){
        clearLetterStages();

        setGameStage(stages[2].name);
      }
   }, [guesses]);
   

  // check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    console.log(uniqueLetters);
    console.log(guessedLetters);

    // win condition
    if (guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
      // add score
      setScore((actualScore) => (actualScore += 100));

      // restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);


  // restart the game
  const retry = () => {
    setScore(0);
    setGuesses (guessesQty);

    setGameStage(stages[0].name)
  };


  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/>}
      {gameStage === 'game' && (
        <Game 
          verifyLetter={verifyLetter} 
          pickWord={pickedWord} 
          pickedCategory={pickedCategory}  
          letters={letters} 
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
          />
        )}
      {gameStage === 'end' && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
