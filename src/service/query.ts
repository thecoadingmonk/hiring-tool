import { fetch } from "./fetch";
import { API_ENDPOINTS } from "../constants/index";

import type { Job } from "../types/Common";

export const getJobs = async () => {
  return fetch<Job[]>({
    url: API_ENDPOINTS,
    method: "GET",
  })
    .then((res: Job[]) => {
      return res;
    })
    .catch(() => {
      return [] as Job[];
    });
};
