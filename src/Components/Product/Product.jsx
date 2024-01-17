import {NavLink} from 'react-router-dom';
import {API_URL} from '../../const';
import s from './Product.module.scss';
import {ColorList} from '../ColorList/ColorList';
import {BtnLike} from '../BtnLike/BtnLike';
import PropTypes from 'prop-types';

export const Product = ({id, pic, title, price, colors, description}) => (
  <article className={s.product}>
    <NavLink to={`/product/${id}`} className={s.link}>
      <img
        className={s.image}
        src={`${API_URL}/${pic}`}
        alt={`${title} ${description}`}
      />
      <h3 className={s.title}>{title}</h3>
    </NavLink>
    <div className={s.row}>
      <p className={s.price}>руб {price}</p>
      <BtnLike id={id} />
    </div>
    <ColorList colors={colors} />
  </article>
);

Product.propTypes = {
  id: PropTypes.string,
  pic: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  colors: PropTypes.array,
  description: PropTypes.string,
};
