import _ from "lodash";
import gamesData from "../gameData.json";

export const getGameNameById = (gameId) => {
  const game = _.find(gamesData.games, { id: gameId });
  return game ? game.name : "";
};

// ===================== with DB
//
// export const getGameNameById = async (gameId) => {
//   const apiUrl = "api/games";
//   const response = await fetch(`${apiUrl}/${gameId}`);
//   const game = await response.json();
//   return game ? game.name : "";
// };

//  ======= або так:

// import _ from "lodash";
// import { getGamesFromApi } from "../gamesApi/gamesApi";

// export const getGameNameById = async (gameId) => {
//   try {
//     const games = await getGamesFromApi();
//     const game = _.find(games, { id: gameId });
//     return game ? game.name : "";
//   } catch (error) {
//     console.error(error);
//   }
// };
