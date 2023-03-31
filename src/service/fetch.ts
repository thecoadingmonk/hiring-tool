// Library
import axios from "axios";

// Types
import type { Job } from "../types/Common";

// Constants
import { DEFAULT_ERROR_MESSAGE } from "../constants";

/**
 * This is the centerlized method for making network callback
 *
 * @param {url} API endpoint
 * @param {method} axios method type
 * @param {data} value to be attached in the request body
 *
 * @return always returns the Generic type on success, error message on failure
 */
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
        console.error(response);

        const message =
          (response?.data &&
            typeof response?.data === "string" &&
            response.data) ||
          DEFAULT_ERROR_MESSAGE;

        reject(message);
      });
  });
};
