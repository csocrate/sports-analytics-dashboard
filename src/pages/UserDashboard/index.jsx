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
  const error =
    userMainData === null &&
    userSessions === null &&
    userActivity === null &&
    userPerformance === null;
  const userErrorMessage = `Une erreur s'est produite. Veuillez-nous en excuser.`;

  return !error ? (
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
          <div className="graphics__left">
            <GroupedBarChart datas={activityDatas} width={650} height={380} />
            <div className="blocks">
              <LineChart datas={sessionDatas} width={200} height={205} />
              <RadarChart
                datas={performanceDatas}
                kinds={performanceKinds}
                width={200}
                height={205}
              />
              <RadialBarChart value={score} width={200} height={205} />
            </div>
          </div>
          <div className="graphics__right">
            <KeyDataCards datas={keyData} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="error-message">
      <p>{userErrorMessage}</p>
    </div>
  );
}

export default UserDashboard;
