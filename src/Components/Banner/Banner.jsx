import {NavLink} from 'react-router-dom';
import {Container} from '../Layout/Container/Container';
import s from './Banner.module.scss';
import {API_URL} from '../../const';
import {useMedia} from 'react-use';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const Banner = ({data}) => {
  const isMobile = useMedia('(max-width: 540px)');
  const isTablet = useMedia('(max-width: 768px)');
  const isLaptop = useMedia('(max-width: 1024px)');
  const [bgURL, setBgURL] = useState();
  useEffect(() => {
    if (isMobile) {
      setBgURL(data?.bg.mobile);
    } else if (isTablet) {
      setBgURL(data?.bg.tablet);
    } else if (isLaptop) {
      setBgURL(data?.bg.laptop);
    } else {
      setBgURL(data?.bg.desktop);
    }
  }, [isMobile, isTablet, isLaptop, data]);

  return (
    <section
      className={s.banner}
      style={bgURL ? {backgroundImage: `url(${API_URL}/${bgURL})`} : {}}
    >
      <Container>
        <div className={s.content}>
          <h2 className={s.title}>{data.description}</h2>
          <NavLink className={s.link} to={`/product/${data.id}`}>
            Перейти
          </NavLink>
        </div>
      </Container>
    </section>
  );
};

Banner.propTypes = {
  data: PropTypes.object,
};
