import axios from "axios";
import { showErrorModal } from "../helpers/handlers";
const apiBase = "http://localhost:8083";

export const Login = async (username: string, password: string) => {
  try {
    const reponse = await axios.post<any>(`${apiBase}/Api/Auth/Login`, {
      userName: username,
      password: password,
    });
    return reponse.data;
  } catch (error: any) {
    throw new Error(error.response);
  }
};
export const Register = async (
  email: string,
  userName: string,
  password: string,
  role: string
) => {
  console.log(email,userName,password,role)
  try {
    const response = await axios.post<any>(`${apiBase}/Api/Auth/Register`, {
      userName: userName,
      email: email,
      password: password,
      role: role,
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response);
  }
};
