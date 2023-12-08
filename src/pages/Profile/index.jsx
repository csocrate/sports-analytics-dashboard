import { useMockedData } from '../../hooks/useMockedData';
import { USER_MAIN_DATA } from '../../mocks/userData';

function Profile() {
  const { data } = useMockedData(18, USER_MAIN_DATA);

  const firstName = data && data.userInfos.firstName;

  return (
    <div className="profile">
      <div>
        <h1>
          <span>Bonjour</span>
          <span>{firstName}</span>
        </h1>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
        <div className="graphics"></div>
      </div>
    </div>
  );
}

export default Profile;
