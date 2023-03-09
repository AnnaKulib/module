// import _ from "lodash";
// import { getGameNameById } from "../../helpers/getGameNameById";
// import { useTranslation } from "react-i18next";
// import s from "./Results.module.css"

// const Results = ({history}) => {
//     const { t } = useTranslation();

//     const getChangedResults = _.map(history.games, (game) => {
//         const gameName = getGameNameById(game.id);
//         return(
//             <div key={game.id}>
//                 {gameName && <h3 className={s.text}>{gameName}</h3>}
//                 <p className={s.text}>{t("results.balance")}: {game.balanceChange}$</p>
//             </div>
//         )
//     });

//     return (
//         <div>
//             <h2 className={s.title}>{t("results.results")}:</h2>
//             {getChangedResults}
//         </div>
//     );
// };

// export default Results;

// =========== with DB
import _ from "lodash";
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getGamesFromApi } from "../../gamesApi/gamesApi";
import s from "./Results.module.css";

const Results = ({ history }) => {
  const { t } = useTranslation();
  const [gamesData, setGamesData] = useState([]);

  useEffect(() => {
    if (!gamesData.length) {
      const fetchGame = async() => {
        const data = await getGamesFromApi();
        setGamesData(data)
      };
      fetchGame();
    }
  }, [gamesData])

  const getChangedResults = useMemo(() => {
    return _.map(history.games, (game) => {
      const gameData = _.find(gamesData, { id: game.id });
      const gameName = gameData ? gameData.name : "";
    
      return (
        <div key={game.id}>
          {gameName && <h3 className={s.text}>{gameName}</h3>}
          <p className={s.text}>
            {t("results.balance")}: {game.balanceChange}$
          </p>
        </div>
      );
    });
  }, [gamesData, history.games, t]);

  return (
    <div>
      <h2 className={s.title}>{t("results.results")}:</h2>
      {getChangedResults}
    </div>
  );
};

export default Results;
// import _ from "lodash";
// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { getGamesFromApi } from "../../gamesApi/gamesApi";
// import s from "./Results.module.css";

// const Results = ({ history }) => {
//   const { t } = useTranslation();
//   const [gamesData, setGamesData] = useState([]);

//   useEffect(() => {
//     const fetchGame = async() => {
//       const data = await getGamesFromApi();
//       setGamesData(data)
//     };
//     fetchGame();
//   }, [])
 
//   const getChangedResults = _.map(history.games, (game) => {
//     const gameData = _.find(gamesData, { id: game.id });
//     const gameName = gameData ? gameData.name : "";
  
//     return (
//       <div key={game.id}>
//         {gameName && <h3 className={s.text}>{gameName}</h3>}
//         <p className={s.text}>
//         {t("results.balance")}: {game.balanceChange}$
//         </p>
//       </div>
//     );
//   });

//       return (
//         <div>
//             <h2 className={s.title}>{t("results.results")}:</h2>
//             {getChangedResults}
//         </div>
//     );
// };

// export default Results;