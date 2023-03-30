import { fetch } from "./fetch";
import { API_ENDPOINT } from "../constants/index";

import type { Job } from "../types/Common";

export const getJobs = async () => {
  return fetch<Job[]>({
    url: API_ENDPOINT,
    method: "GET",
  });
};
