import axios from "axios";
import { API } from "../index";

const signUp = async ({ payload }) => {
  const response = await axios.post(`${API.users.login}`, payload);
  return response.data;
};

export { signUp };
