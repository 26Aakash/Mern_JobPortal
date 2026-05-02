const SAVED_JOBS_KEY = "career_tracker_saved_jobs";

export function getSavedJobIds() {
  try {
    return JSON.parse(localStorage.getItem(SAVED_JOBS_KEY) || "[]");
  } catch (_error) {
    return [];
  }
}

export function toggleSavedJob(jobId) {
  const current = getSavedJobIds();
  const next = current.includes(jobId)
    ? current.filter((id) => id !== jobId)
    : [...current, jobId];

  localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(next));
  return next;
}
