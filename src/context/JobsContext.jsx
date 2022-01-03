import { createContext, useMemo, useState } from "react";

export const JobsContext = createContext();

export const JobsContextProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({});

  const value = useMemo(() => ({ jobs, setJobs, selectedJob, setSelectedJob }), [jobs, selectedJob]);

  return <JobsContext.Provider value={value}>{children}</JobsContext.Provider>;
};
