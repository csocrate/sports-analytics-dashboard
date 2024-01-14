import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';
import LineChart from '../../components/LineChart';
import GroupedBarChart from '../../components/GroupedBarChart';
import RadarChart from '../../components/RadarChart';
import DatasServices from '../../services/DatasServices';

function Profile() {
  const { userMainData, userActivity, userSessions, userPerformance } =
    DatasServices();

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
        <div className="profile-header">
          <h1>
            <span>Bonjour</span>
            <span>{firstName}</span>
          </h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="graphics">
          <div>
            <GroupedBarChart datas={activityDatas} width={600} height={350} />
            <div className="blocks">
              <LineChart datas={sessionDatas} width={185} height={190} />
              <RadarChart
                datas={performanceDatas}
                kinds={performanceKinds}
                width={185}
                height={190}
              />
              <RadialBarChart value={score} width={185} height={190} />
            </div>
          </div>
          <KeyDataCards datas={keyData} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
