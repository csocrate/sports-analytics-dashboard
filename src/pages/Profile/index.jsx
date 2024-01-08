// import { useMockedDatas } from '../../hooks/useMockedDatas';
// import {
//   USER_ACTIVITY,
//   USER_AVERAGE_SESSIONS,
//   USER_MAIN_DATA,
//   USER_PERFORMANCE,
// } from '../../mocks/userData';
import { useDatasApi } from '../../hooks/useDatasApi';
import {
  userActivityUri,
  userAverageSessionsUri,
  userMainDataUri,
  userPerformanceUri,
} from '../../services/apiConstants';
import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';
import LineChart from '../../components/LineChart';
import GroupedBarChart from '../../components/GroupedBarChart';
import RadarChart from '../../components/RadarChart';

const USER_ID = 18; // Try 12 or 18
const USER_MAIN_URI = userMainDataUri(USER_ID);
const USER_ACTIVITY_URI = userActivityUri(USER_ID);
const USER_AVERAGE_SESSIONS_URI = userAverageSessionsUri(USER_ID);
const USER_PERFORMANCE_URI = userPerformanceUri(USER_ID);

function Profile() {
  // const { data: userMainData } = useMockedDatas(USER_ID, USER_MAIN_DATA);
  // const { data: userSessions } = useMockedDatas(USER_ID, USER_AVERAGE_SESSIONS);
  // const { data: userActivity } = useMockedDatas(USER_ID, USER_ACTIVITY);
  // const { data: userPerformance } = useMockedDatas(USER_ID, USER_PERFORMANCE);
  const userMainData = useDatasApi(USER_MAIN_URI);
  const userActivity = useDatasApi(USER_ACTIVITY_URI);
  const userSessions = useDatasApi(USER_AVERAGE_SESSIONS_URI);
  const userPerformance = useDatasApi(USER_PERFORMANCE_URI);

  const firstName = userMainData && userMainData.userInfos.firstName;
  const keyData = userMainData && userMainData.keyData;
  const score = userMainData?.score ?? userMainData?.todayScore;
  const sessionDatas = userSessions?.sessions;
  const activityDatas = userActivity?.sessions;
  const performanceDatas = userPerformance?.data;
  const performanceKinds = userPerformance?.kind;

  return (
    <div className="profile">
      <div>
        <div>
          <h1>
            <span>Bonjour</span>
            <span>{firstName}</span>
          </h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="graphics">
          <div>
            <GroupedBarChart datas={activityDatas} width={835} height={320} />
            <div className="blocks">
              <LineChart datas={sessionDatas} />
              <RadarChart
                datas={performanceDatas}
                kinds={performanceKinds}
                width={258}
                height={263}
              />
              <RadialBarChart value={score} />
            </div>
          </div>
          <KeyDataCards datas={keyData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
