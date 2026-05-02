import { useContext } from "react";

import { JobsContext } from "../context/JobsProvider";

export default function useJobs() {
  return useContext(JobsContext);
}
