import { USER_ID } from "./userConstants";

export const DATAS_API = true;

export const USER_MAIN_URI = userMainDataUri(USER_ID);
export const USER_ACTIVITY_URI = userActivityUri(USER_ID);
export const USER_AVERAGE_SESSIONS_URI = userAverageSessionsUri(USER_ID);
export const USER_PERFORMANCE_URI = userPerformanceUri(USER_ID);

function userMainDataUri(id) {
  const uri = `user/${id}`;
  return uri;
};

function userActivityUri(id) {
  const uri = `user/${id}/activity`;
  return uri;
};
      
function userAverageSessionsUri(id) {
  const uri = `user/${id}/average-sessions`;
  return uri;
};
      
function userPerformanceUri(id) {
  const uri = `user/${id}/performance`;
  return uri;
};