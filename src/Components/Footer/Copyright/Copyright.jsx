import s from '../Footer.module.scss';

export const Copyright = () => (
  <div className={s.copyright}>
    &copy; INSPIRED, {new Date().getFullYear()}
  </div>
);
