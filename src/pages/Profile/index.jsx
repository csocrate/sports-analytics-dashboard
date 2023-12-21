import { useMockedData } from '../../hooks/useMockedData';
import {
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_MAIN_DATA,
} from '../../mocks/userData';
import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';

function Profile() {
  const USER_ID = 18;
  const { data: userMainData } = useMockedData(USER_ID, USER_MAIN_DATA);
  const { data: userSessions } = useMockedData(USER_ID, USER_AVERAGE_SESSIONS);
  const { data: userActivity } = useMockedData(USER_ID, USER_ACTIVITY);

  const firstName = userMainData && userMainData.userInfos.firstName;
  const keyData = userMainData && userMainData.keyData;
  const score = userMainData?.score ?? userMainData?.todayScore;
  const sessionDatas = userSessions?.sessions;
  const activityDatas = userActivity?.sessions;

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
          <BarChart datas={activityDatas} width={835} height={320} />
          <KeyDataCards datas={keyData} />
          <LineChart datas={sessionDatas} />
          <RadialBarChart value={score} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
