import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCompareBalance } from "../../hooks/useCompareBalance";
import { updateBalance } from "../../features/player/playerSlice";
import { addGame, updateBalanceChange } from "../../features/player/historyGameSlice";
import CustomButton from "../CustomButton";

import s from "./GuessDoorGame.module.css"

const GuessDoorGame = ({ player, bet, handleChoice, handlePlayAgain }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const previousBalance = player.deposit;
  let currentBalance = player.balance;
  let winningDoor;

  useCompareBalance(currentBalance, previousBalance);

  const handleGuessDoor = () => {
    let result;
    let win;

    if (choice != null) {
      winningDoor = Math.floor(Math.random() * 3) + 1;
      win = choice === winningDoor;
      result = win ? "win" : "lose";
      let change = win ? bet * 3 : -bet;
     
      dispatch(updateBalance(change));
      dispatch(addGame({id: id, balanceChange: change})) 
      dispatch(updateBalanceChange({ gameId: id, balanceChange: change }));
    }
    setResult(result); 
  };

  return (
    <>
      {!choice ? (
        <div className={s.textWrapper}>
          <p className={s.text}>Оберіть двері:</p>
          <button onClick={() => handleChoice(1, setChoice)}><img className={s.img} src="https://www.bannerworld.co.uk/wp-content/uploads/dementia-door-orange.jpg" alt="door1"/></button>
          <button onClick={() => handleChoice(2, setChoice)}><img className={s.img} src="https://www.bannerworld.co.uk/wp-content/uploads/dementia-door-red.jpg" alt="door2"/></button>
          <button onClick={() => handleChoice(3, setChoice)}><img className={s.img} src="https://www.bannerworld.co.uk/wp-content/uploads/dementia-door-yellow.jpg" alt="door3"/></button>
        </div>
      ) : (
        <div className={s.textWrapper}>
          <p className={s.text}>Ваш вибір: {choice}</p>
          <CustomButton onClick={handleGuessDoor} buttonText={"Вгадав?"} />  
        </div>
      )}
      {result && (
        <div className={s.textWrapper}>
          <p className={s.text}>{result === "win" ? "Ви виграли!" : "Ви програли :("}</p>
          <CustomButton onClick={() => handlePlayAgain(setChoice, setResult)} buttonText={"Обрати знову"} />  
        </div>
      )}
    </>
  );
};

export default GuessDoorGame;