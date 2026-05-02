import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import api from "../services/api";

const initialFilters = {
  search: "",
  status: "",
  sortBy: "newest",
};

const initialState = {
  jobs: [],
  filters: initialFilters,
  loading: false,
  error: "",
};

function jobsReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: "" };
    case "SET_JOBS":
      return { ...state, jobs: action.payload, loading: false, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_FILTERS":
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case "RESET_FILTERS":
      return { ...state, filters: initialFilters };
    default:
      return state;
  }
}

export const JobsContext = createContext(null);

export default function JobsProvider({ children }) {
  const [state, dispatch] = useReducer(jobsReducer, initialState);
  const filtersRef = useRef(initialFilters);

  useEffect(() => {
    filtersRef.current = state.filters;
  }, [state.filters]);

  const fetchJobs = useCallback(async (overrideFilters = {}) => {
    const nextFilters = { ...filtersRef.current, ...overrideFilters };

    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await api.get("/jobs", {
        params: {
          ...(nextFilters.search && { search: nextFilters.search }),
          ...(nextFilters.status && { status: nextFilters.status }),
          sortBy: nextFilters.sortBy,
        },
      });

      dispatch({ type: "SET_FILTERS", payload: overrideFilters });
      dispatch({ type: "SET_JOBS", payload: response.data });

      return response.data;
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload:
          error.response?.data?.message ||
          "Unable to load your applications right now.",
      });
      return [];
    }
  }, []);

  const createJob = useCallback(async (payload) => {
    const response = await api.post("/jobs", payload);
    await fetchJobs();
    return response.data;
  }, [fetchJobs]);

  const updateJob = useCallback(async (id, payload) => {
    const response = await api.put(`/jobs/${id}`, payload);
    await fetchJobs();
    return response.data;
  }, [fetchJobs]);

  const deleteJob = useCallback(async (id) => {
    await api.delete(`/jobs/${id}`);
    await fetchJobs();
  }, [fetchJobs]);

  const setFilters = useCallback((payload) => {
    dispatch({ type: "SET_FILTERS", payload });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      createJob,
      deleteJob,
      fetchJobs,
      resetFilters,
      setFilters,
      updateJob,
    }),
    [state, createJob, deleteJob, fetchJobs, resetFilters, setFilters, updateJob]
  );

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
}
