import axios from "axios";

export const handleAPIError = (e: unknown, msg?: string) => {
  console.error(e);
  if (!msg) {
    if (axios.isAxiosError(e) && e.response?.data?.message) {
      msg = e.response.data.message;
    } else if (e instanceof Error) {
      msg = e.message;
    } else {
      msg = "An unknown error occurred.";
    }
  }
  alert(msg);
};

export const hasContentTypeJSON = (headers: string) => {
  const headerArray = headers.split("\n");
  return headerArray.some((header) => {
    const [key, value] = header.split(/:\s+/);
    if (
      key.toLowerCase() === "content-type" &&
      value.toLowerCase() === "application/json"
    ) {
      return true;
    }
  });
};
