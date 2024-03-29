import {useEffect, useRef} from 'react';
import s from './ColorLabel.module.scss';
import PropTypes from 'prop-types';

export const ColorLabel = ({
  color,
  check,
  handleColorChange,
  selectedColor,
}) => {
  const colorRef = useRef();
  useEffect(() => {
    colorRef.current.style.setProperty('--data-color', color?.code);
  });
  return (
    <label className={s.color} ref={colorRef}>
      <input
        className={s.input}
        type="radio"
        name="color"
        value={color?.title}
        checked={selectedColor ? selectedColor === color?.title : check}
        onChange={handleColorChange}
      />
      <span className={s.colorCheck}></span>
    </label>
  );
};

ColorLabel.propTypes = {
  color: PropTypes.object,
  check: PropTypes.bool,
  handleColorChange: PropTypes.func,
  selectedColor: PropTypes.string,
};
