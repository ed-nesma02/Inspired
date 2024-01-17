import {useSelector} from 'react-redux';
import s from './Goods.module.scss';
import {Container} from '../Layout/Container/Container';
import {Product} from '../Product/Product';
import {Pagination} from '../Pagination/Pagination';
import {Preloader} from '../Preloader/Preloader';
import PropTypes from 'prop-types';

export const Goods = ({title}) => {
  const {goodsList, totalCount, status} = useSelector((state) => state.goods);

  return (
    <section className={s.goods}>
      <Container>
        <h2 className={s.title}>
          {title ?? 'Новинки'}
          {totalCount && title !== 'Вам также может понравиться' && (
            <sup> ({totalCount})</sup>
          )}
        </h2>
        {status !== 'success' ? (
          <Preloader />
        ) : (
          <>
            <ul className={s.list}>
              {goodsList?.map((item) => (
                <li key={item.id}>
                  <Product {...item} />
                </li>
              ))}
            </ul>
            <Pagination />
          </>
        )}
      </Container>
    </section>
  );
};

Goods.propTypes = {
  title: PropTypes.string,
};
