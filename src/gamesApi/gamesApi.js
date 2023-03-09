import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getGamesFromApi = async () => {
  try {
    const response = await api.get("/games");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getGameByIdFromApi = async (id) => {
  try {
    const response = await api.get(`/games/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
