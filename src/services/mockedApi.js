import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE }
from "../mocks/userData";

export const fetchUserMainData = async (USER_ID) => {
  const datas = USER_MAIN_DATA.filter(data => data.id === USER_ID)
  const userMainData = datas[0];
  return userMainData;
}

export const fetchUserActivity = async (USER_ID) => {
  const datas = USER_ACTIVITY.filter(data => data.userId === USER_ID)
  const userActivity = datas[0];
  return userActivity;
}

export const fetchUserAverageSessions = async (USER_ID) => {
  const datas = USER_AVERAGE_SESSIONS.filter(data => data.userId === USER_ID)
  const userActivity = datas[0];
  return userActivity;
}

export const fetchUserPerformance = async (USER_ID) => {
  const datas = USER_PERFORMANCE.filter(data => data.userId === USER_ID)
  const userActivity = datas[0];
  return userActivity;
}


