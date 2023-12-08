import KeyDataCard from '../../components/KeyDataCard';
import { useMockedData } from '../../hooks/useMockedData';
import { USER_MAIN_DATA } from '../../mocks/userData';

function Profile() {
  const { data } = useMockedData(18, USER_MAIN_DATA);

  const firstName = data && data.userInfos.firstName;

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
          <div className="graphics__key-data">
            <KeyDataCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
