import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCompareBalance } from "../../hooks/useCompareBalance";
import { updateBalance } from "../../features/player/playerSlice";
import { addGame, updateBalanceChange } from "../../features/player/historyGameSlice";
import { times } from "lodash";
import CustomButton from "../CustomButton";

import s from "./GuessNumberGame.module.css";

const GuessNumberGame = ({ player, bet, handleChoice, handlePlayAgain }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [choice, setChoice] = useState(null);
  const [result, setResult] = useState(null);
  const previousBalance = player.deposit;
  let currentBalance = player.balance;
  let winningNumber;

  useCompareBalance(currentBalance, previousBalance);

  const handleGuessNumber = () => {
    let result;
    let win;

    if (choice != null) {
      winningNumber = Math.floor(Math.random() * 10) + 1;
      win = choice === winningNumber;
      result = win ? "win" : "lose";
      let change = win ? bet * 10 : -bet;
      
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
          <p className={s.text}>Оберіть номер:</p>
          {times(10, (i) => (
            <CustomButton key={i} onClick={() => handleChoice(i + 1, setChoice)} buttonText={i + 1} />
          ))}
        </div>
      ) : (
        <div className={s.textWrapper}>
          <p className={s.text}>Обраний вами номер: {choice}</p>
          <CustomButton onClick={handleGuessNumber} buttonText={"Вгадав?"} />
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

export default GuessNumberGame;
