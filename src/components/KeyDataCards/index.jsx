import PropTypes from 'prop-types';
import KeyDataCard from '../KeyDataCard';

function KeyDataCards({ datas }) {
  const calories = datas && datas.calorieCount;
  const proteins = datas && datas.proteinCount;
  const carbohydrates = datas && datas.carbohydrateCount;
  const lipids = datas && datas.lipidCount;

  return (
    <div className="graphics__key-data">
      <KeyDataCard
        className="calories"
        number={calories}
        unit="Kcal"
        title="Calories"
      />
      <KeyDataCard
        className="proteins"
        number={proteins}
        unit="g"
        title="Protéines"
      />
      <KeyDataCard
        className="carbohydrates"
        number={carbohydrates}
        unit="g"
        title="Glucides"
      />
      <KeyDataCard
        className="lipids"
        number={lipids}
        unit="g"
        title="Lipides"
      />
    </div>
  );
}

KeyDataCards.propTypes = {
  datas: PropTypes.object,
};

KeyDataCards.defaultProps = {
  datas: '',
};

export default KeyDataCards;
