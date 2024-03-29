import {useDispatch, useSelector} from 'react-redux';
import s from './CartItem.module.scss';
import {API_URL} from '../../../../const';
import cn from 'classnames';
import {Count} from '../../../Count/Count';
import {addToCart, removeFromCart} from '../../../../features/cartSlice';
import PropTypes from 'prop-types';

export const CartItem = ({id, color, size, count, goodsList}) => {
  const dispatch = useDispatch();
  const {colorList} = useSelector((state) => state.color);
  const item = goodsList.find((item) => item.id === id);

  const handleCountChange = (count) => {
    dispatch(addToCart({id, color, size, count}));
  };

  const handleRemoveItem = (e) => {
    dispatch(removeFromCart({id, color, size, count}));
  };

  return (
    <article className={s.item}>
      <img
        className={s.image}
        src={`${API_URL}/${item?.pic}`}
        alt={item?.title}
      />
      <div className={s.content}>
        <h3 className={s.title}>{item?.title}</h3>
        <p className={s.price}>руб {item?.price}</p>
        <div className={s.vendorCode}>
          <span className={s.subtitle}>Артикул</span>
          <span>{id}</span>
        </div>
      </div>

      <div className={s.prop}>
        <div className={s.color}>
          <p className={cn(s.subtitle, s.colorTitle)}>Цвет</p>
          <div
            className={s.colorItem}
            style={{
              '--data-color': colorList?.find((item) => item.title === color)
                ?.code,
            }}
          ></div>
        </div>

        <div className={s.size}>
          <p className={cn(s.subtitle, s.sizeTitle)}>Размер</p>
          <div className={s.sizeItem}>{size}</div>
        </div>
      </div>

      <button
        className={s.del}
        aria-label="Удалить товар из корзины"
        onClick={handleRemoveItem}
      ></button>
      <Count
        className={s.count}
        count={count}
        handleDecrement={() => {
          if (count > 1) {
            handleCountChange(count - 1);
          }
        }}
        handleIncrement={() => {
          handleCountChange(count + 1);
        }}
      />
    </article>
  );
};

CartItem.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  count: PropTypes.number,
  goodsList: PropTypes.array,
};
