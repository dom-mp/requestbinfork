import axios from "axios";

export const handleAPIError = (e: unknown) => {
  let msg = "An unknown error occurred.";
  if (axios.isAxiosError(e) && e.response?.data) {
    msg = e.response.data;
  } else if (e instanceof Error) {
    msg = e.message;
  }
  alert(msg);
};
