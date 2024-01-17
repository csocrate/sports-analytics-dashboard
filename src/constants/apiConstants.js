/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - constants/apiConstants.js
 * ------------------------------------------------------------
 */

import { USER_ID } from "./userConstants";

export const DATAS_API = true;
if (DATAS_API !== true) console.log('You are using mocked data');

export const USER_MAIN_URI = userMainDataUri(USER_ID);
export const USER_ACTIVITY_URI = userActivityUri(USER_ID);
export const USER_AVERAGE_SESSIONS_URI = userAverageSessionsUri(USER_ID);
export const USER_PERFORMANCE_URI = userPerformanceUri(USER_ID);

/**
 * 
 * @param {number} id 
 * @returns {string} uri - URI of user's main data.
 */
function userMainDataUri(id) {
  const uri = `user/${id}`;
  return uri;
};

/**
 * 
 * @param {number} id 
 * @returns {string} uri - URI of user's activity.
 */
function userActivityUri(id) {
  const uri = `user/${id}/activity`;
  return uri;
};
      
/**
 * 
 * @param {number} id 
 * @returns {string} uri - URI of user's average sessions.
 */
function userAverageSessionsUri(id) {
  const uri = `user/${id}/average-sessions`;
  return uri;
};
      
/**
 * 
 * @param {number} id 
 * @returns {string} uri - URI of user's performance.
 */
function userPerformanceUri(id) {
  const uri = `user/${id}/performance`;
  return uri;
};