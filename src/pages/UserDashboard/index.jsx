/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - pages/UserDashboard
 * ------------------------------------------------------------
 */

import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';
import LineChart from '../../components/LineChart';
import GroupedBarChart from '../../components/GroupedBarChart';
import RadarChart from '../../components/RadarChart';
import DatasServices from '../../services/DatasServices';

/**
 * This component renders user's dashboard on sports analytics.
 *
 * @component
 * @returns {JSX.Element} User's dashboard page component.
 */
function UserDashboard() {
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
    <div className="user-dashboard">
      <div>
        <div className="dashboard-header">
          <h1>
            <span>Bonjour</span>
            <span>{firstName}</span>
          </h1>
          <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        </div>
        <div className="graphics">
          <div>
            <GroupedBarChart datas={activityDatas} width={600} height={320} />
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

export default UserDashboard;
