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

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {
    //selecionando uma categoria aleatoria
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];
    
    //selecionando uma palava aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]


    return {word, category}
  };

  

  //Iniciar o jogo
  const startGame = () => {
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
  };


  //processar letra input
  const verifyLetter = (letter) => {
    console.log(letter)
  };


  //Reiniciar o Jogo
  const retry = () => {
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
      {gameStage === 'end' && <GameOver retry={retry}/>}
    </div>
  );
}

export default App;
