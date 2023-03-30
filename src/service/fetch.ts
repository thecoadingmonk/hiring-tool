import type { AxiosError } from "axios";
import axios from "axios";

import type { Job } from "../types/Common";

export const fetch = <T>({
  url,
  method,
  data,
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: Job;
}): Promise<T> => {
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      data,
    })
      .then((response) => {
        const { data }: { data: T } = response;
        resolve(data);
      })
      .catch(({ response }) => {
        console.log(response);
        const message =
          (response?.data &&
            typeof response?.data === "string" &&
            response.data) ||
          "Something went wrong, please try again";

        reject(message);
      });
  });
};
