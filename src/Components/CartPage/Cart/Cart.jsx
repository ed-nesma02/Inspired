import s from './Cart.module.scss';
import {Container} from '../../Layout/Container/Container';
import {CartItem} from './CartItem/CartItem';
import PropTypes from 'prop-types';

export const Cart = ({cartItems, goodsList}) => {
  const totalPrice = cartItems.reduce((sum, item) => {
    const product = goodsList.find((product) => product.id === item.id);
    if (product) {
      return sum + product.price * item.count;
    } else {
      return sum;
    }
  }, 0);

  return (
    <section className={s.cart}>
      <Container>
        <h2 className={s.title}>Корзина</h2>
        {cartItems.length ? (
          <>
            <ul className={s.list}>
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.color}-${item.size}`}
                  className={s.item}
                >
                  <CartItem {...item} goodsList={goodsList} />
                </li>
              ))}
            </ul>
            <div className={s.total}>
              <p>Итого:</p>
              <p>руб {totalPrice}</p>
            </div>
          </>
        ) : (
          <h3 className={s.empty}>В корзине пусто</h3>
        )}
      </Container>
    </section>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  goodsList: PropTypes.array,
};
