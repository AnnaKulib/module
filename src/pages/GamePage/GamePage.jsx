import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPlayer } from "../../features/player/playerSlice";
import { checkBalance, handleChoice, handlePlayAgain } from "../../helpers/gameHelpers";
import gamesData from "../../gameData.json";
import Header from "../../Components/Header";
import CoinFlipGame from "../../Components/CoinFlipGame";
import GuessDoorGame from "../../Components/GuessDoorGame";
import GuessNumberGame from "../../Components/GuessNumberGame";
import _ from "lodash";
import s from "./GamePage.module.css"

const GamePage = () => {
  const player = useSelector(getPlayer);
  const { id } = useParams();  
  const game = _.find(gamesData.games, { id: id });
  const bet = player.deposit * (game.betPercent / 100)
  
  const visibleGame = () => {
    switch (id) {
      case "1":
        return (
          <>
            {checkBalance(player.balance, bet)}
            <CoinFlipGame 
              player={player} 
              bet={bet}
              handleChoice={handleChoice}
              handlePlayAgain={handlePlayAgain}
            />
          </>
        ) 
      case "2":
        return (
          <>
            {checkBalance(player.balance, bet)}
            <GuessDoorGame
              player={player} 
              bet={bet}
              handleChoice={handleChoice} 
              handlePlayAgain={handlePlayAgain}
            />
          </>
        );
      case "3":
        return (
          <>
            {checkBalance(player.balance, bet)}
            <GuessNumberGame
              player={player}   
              bet={bet}
              handleChoice={handleChoice} 
              handlePlayAgain={handlePlayAgain} 
            />
          </>
        );
      default:
        break;
    }
  }

  return (
    <div className={s.section}>
      <Header />
      <div className={s.textWrapper}>
        <h1 className={s.text}>{game.name}</h1>
        <p className={s.text}>{game.description}</p>
      </div>
      {/* <img className={s.img} src={game.logo} alt="game-logo" /> */}
      {visibleGame()}
    </div>
  );
};

export default GamePage;



// ============ with DB
 
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { getPlayer } from "../../features/player/playerSlice";
// import { getGameByIdFromApi } from "../../gamesApi/gamesApi";
// import { checkBalance, handleChoice, handlePlayAgain } from "../../helpers/gameHelpers";
// import { ThreeDots } from "react-loader-spinner";
// import Header from "../../Components/Header";
// import CoinFlipGame from "../../Components/CoinFlipGame";
// import GuessDoorGame from "../../Components/GuessDoorGame";
// import GuessNumberGame from "../../Components/GuessNumberGame";
// import s from "./GamePage.module.css"

// const GamePage = () => {
//   const player = useSelector(getPlayer);
//   const { id } = useParams();
//   const [game, setGame] = useState(null);
//   const [loading, setLoading] = useState(true); 
//   const bet = player.deposit * (game?.betPercent / 100);
  
//   useEffect(() => {
//     const fetchGame = async() => {
//       const data = await getGameByIdFromApi(id);
//       setGame(data);
//       setLoading(false);
//     };
//     fetchGame();
//   }, [id])

//   const visibleGame = () => {
//     switch (id) {
//       case "1":
//         return (
//           <>
//             {checkBalance(player.balance, bet)}
//             <CoinFlipGame
//               player={player}
//               bet={bet}
//               handleChoice={handleChoice}
//               handlePlayAgain={handlePlayAgain}
//             />
//           </>
//         );
//       case "2":
//         return (
//           <>
//             {checkBalance(player.balance, bet)}
//             <GuessDoorGame
//               player={player}
//               bet={bet}
//               handleChoice={handleChoice}
//               handlePlayAgain={handlePlayAgain}
//             />
//           </>
//         );
//       case "3":
//         return (
//           <>
//             {checkBalance(player.balance, bet)}
//             <GuessNumberGame
//               player={player}
//               bet={bet}
//               handleChoice={handleChoice}
//               handlePlayAgain={handlePlayAgain}
//             />
//           </>
//         );
//       default:
//         break;
//     }
//   };

//   if (loading || !game) {
//     return (
//       <div className="loader">
//         <ThreeDots color="#420404" height={100} width={100} />
//       </div>
//     );
//   }

//   return (
//     <div className={s.section}>
//       <Header />
//       <div className={s.textWrapper}>
//         <h1 className={s.text}>{game.name}</h1>
//         <p className={s.text}>{game.description}</p>
//       </div>
//       {visibleGame()}
//     </div>
//   );
// };

// export default GamePage;