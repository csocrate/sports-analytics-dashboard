export const userMainDataUri = (id) => {
  const uri = `user/${id}`;
  return uri;
};

export const userActivityUri = (id) => {
  const uri = `user/${id}/activity`;
  return uri;
};
      
export const userAverageSessionsUri = (id) => {
  const uri = `user/${id}/average-sessions`;
  return uri;
};
      
export const userPerformanceUri = (id) => {
  const uri = `user/${id}/performance`;
  return uri;
};