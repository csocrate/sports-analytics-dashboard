import PropTypes from 'prop-types';
import Energy from '../../assets/images/energy.svg';
import Chicken from '../../assets/images/chicken.svg';
import Apple from '../../assets/images/apple.svg';
import Cheeseburger from '../../assets/images/cheeseburger.svg';

function KeyDataCard({ className, number, unit, title }) {
  const icon =
    className === 'calories' ? (
      <img src={Energy} alt={title} />
    ) : className === 'proteins' ? (
      <img src={Chicken} alt={title} />
    ) : className === 'carbohydrates' ? (
      <img src={Apple} alt={title} />
    ) : (
      <img src={Cheeseburger} alt={title} />
    );

  return (
    <div className="key-data-card">
      <div>
        <p>
          {number}
          {unit}
        </p>
        <small>{title}</small>
      </div>
      <div className={className}>{icon}</div>
    </div>
  );
}

KeyDataCard.propTypes = {
  className: PropTypes.string,
  number: PropTypes.number,
  unit: PropTypes.string,
  title: PropTypes.string,
};

KeyDataCard.defaultProps = {
  className: '',
  number: '',
  unit: '',
  title: '',
};

export default KeyDataCard;
