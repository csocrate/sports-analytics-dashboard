import { useMockedDatas } from '../hooks/useMockedDatas';
import {
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_MAIN_DATA,
  USER_PERFORMANCE,
} from '../mocks/userData';
import { useDatasApi } from '../hooks/useDatasApi';
import {
  USER_MAIN_URI,
  USER_ACTIVITY_URI,
  USER_AVERAGE_SESSIONS_URI,
  USER_PERFORMANCE_URI,
  DATAS_API,
} from '../constants/apiConstants';
import { USER_ID } from '../constants/userConstants';

function DatasServices() {
  const mainDatasApi = useDatasApi(USER_MAIN_URI);
  const activityDatasApi = useDatasApi(USER_ACTIVITY_URI);
  const sessionsDatasApi = useDatasApi(USER_AVERAGE_SESSIONS_URI);
  const performanceDatasApi = useDatasApi(USER_PERFORMANCE_URI);
  const { data: mainDatasMocked } = useMockedDatas(USER_ID, USER_MAIN_DATA);
  const { data: activityDatasMocked } = useMockedDatas(USER_ID, USER_ACTIVITY);
  const { data: sessionsDatasMocked } = useMockedDatas(
    USER_ID,
    USER_AVERAGE_SESSIONS,
  );
  const { data: performanceDatasMocked } = useMockedDatas(
    USER_ID,
    USER_PERFORMANCE,
  );

  let userMainData = DATAS_API === true ? mainDatasApi : mainDatasMocked;
  let userActivity =
    DATAS_API === true ? activityDatasApi : activityDatasMocked;
  let userSessions =
    DATAS_API === true ? sessionsDatasApi : sessionsDatasMocked;
  let userPerformance =
    DATAS_API === true ? performanceDatasApi : performanceDatasMocked;

  return {
    userMainData,
    userActivity,
    userSessions,
    userPerformance,
  };
}

export default DatasServices;
