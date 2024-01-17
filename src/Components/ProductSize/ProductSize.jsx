import s from './ProductSize.module.scss';
import PropTypes from 'prop-types';

export const ProductSize = ({
  formError,
  size,
  selectedSize,
  handleSizeChange,
}) => (
  <div className={s.size}>
    <p className={s.title}>Размер</p>
    <ul className={s.list}>
      {size?.map((item) => (
        <label key={item} className={s.item}>
          <input
            className={s.input}
            type="radio"
            name="size"
            value={item}
            checked={selectedSize === item}
            onChange={handleSizeChange}
          />
          <span className={s.check}>{item}</span>
        </label>
      ))}
    </ul>
    {!formError ? <p className={s.error}>Выберите размер</p> : ''}
  </div>
);

ProductSize.propTypes = {
  formError: PropTypes.bool,
  size: PropTypes.array,
  selectedSize: PropTypes.string,
  handleSizeChange: PropTypes.func,
};
