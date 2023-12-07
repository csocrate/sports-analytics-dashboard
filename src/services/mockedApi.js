import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../mocks/userData';

const fetchData = async (ID, DATAS) => {
  const datas = DATAS.find((data) => data.id === ID || data.userId === ID);

  try {
    const response = {
      json: async () => ({
        data: [datas],
      }),
    };

    const userData = await response.json();
    const data = userData.data[0];
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserMainData = async (USER_ID) => {
  return fetchData(USER_ID, USER_MAIN_DATA);
};

export const fetchUserActivity = async (USER_ID) => {
  return fetchData(USER_ID, USER_ACTIVITY);
};

export const fetchUserAverageSessions = async (USER_ID) => {
  return fetchData(USER_ID, USER_AVERAGE_SESSIONS);
};

export const fetchUserPerformance = async (USER_ID) => {
  return fetchData(USER_ID, USER_PERFORMANCE);
};
