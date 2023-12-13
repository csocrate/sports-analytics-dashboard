import { useMockedData } from '../../hooks/useMockedData';
import { USER_AVERAGE_SESSIONS, USER_MAIN_DATA } from '../../mocks/userData';
import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';
import LineChart from '../../components/LineChart';

function Profile() {
  const { data: userMainData } = useMockedData(18, USER_MAIN_DATA);
  const { data: userSessions } = useMockedData(18, USER_AVERAGE_SESSIONS);

  const firstName = userMainData && userMainData.userInfos.firstName;
  const keyData = userMainData && userMainData.keyData;
  const score = userMainData?.score ?? userMainData?.todayScore;

  const sessionDatas = userSessions?.sessions;

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
          <KeyDataCards datas={keyData} />
          <LineChart datas={sessionDatas} />
          <RadialBarChart value={score} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
