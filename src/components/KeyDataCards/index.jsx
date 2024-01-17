/**
 * ------------------------------------------------------------
 * Sports Analytics Dashboard - components/KeyDataCards
 * ------------------------------------------------------------
 */

import PropTypes from 'prop-types';
import KeyDataCard from '../KeyDataCard';

/**
 * This component renders user's key datas
 * as a list of cards.
 *
 * @component
 * @param {Object} props - Props for the component.
 *  @param {Object} props.datas - Data of the chart.
 * @returns {JSX.Element} Chart component.
 */
function KeyDataCards({ datas }) {
  const calories = datas && datas.calorieCount;
  const proteins = datas && datas.proteinCount;
  const carbohydrates = datas && datas.carbohydrateCount;
  const lipids = datas && datas.lipidCount;

  return (
    <>
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
    </>
  );
}

KeyDataCards.propTypes = {
  datas: PropTypes.object,
};

KeyDataCards.defaultProps = {
  datas: {},
};

export default KeyDataCards;
