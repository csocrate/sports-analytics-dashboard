import { useMockedData } from '../../hooks/useMockedData';
import {
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_MAIN_DATA,
  USER_PERFORMANCE,
} from '../../mocks/userData';
import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';
import LineChart from '../../components/LineChart';
import GroupedBarChart from '../../components/GroupedBarChart';
import RadarChart from '../../components/RadarChart';

function Profile() {
  const USER_ID = 18;
  const { data: userMainData } = useMockedData(USER_ID, USER_MAIN_DATA);
  const { data: userSessions } = useMockedData(USER_ID, USER_AVERAGE_SESSIONS);
  const { data: userActivity } = useMockedData(USER_ID, USER_ACTIVITY);
  const { data: userPerformance } = useMockedData(USER_ID, USER_PERFORMANCE);

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
