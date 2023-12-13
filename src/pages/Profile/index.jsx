import { useMockedData } from '../../hooks/useMockedData';
import { USER_MAIN_DATA } from '../../mocks/userData';
import KeyDataCards from '../../components/KeyDataCards';
import RadialBarChart from '../../components/RadialBarChart';

function Profile() {
  const { data } = useMockedData(18, USER_MAIN_DATA);

  const firstName = data && data.userInfos.firstName;
  const keyData = data && data.keyData;
  const score = data?.score ?? data?.todayScore;

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
          <RadialBarChart value={score} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
