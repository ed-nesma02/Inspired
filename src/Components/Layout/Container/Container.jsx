import cn from 'classnames';
import s from './Container.module.scss';
import PropTypes from 'prop-types';

export const Container = ({className, children}) => (
  <div className={cn(s.container, className)}>{children}</div>
);

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
