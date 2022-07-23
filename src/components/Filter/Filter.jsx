import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

const Filter = ({ value, changeFilter }) => {
  return (
    <div className={style.filter}>
      <label>
        <p>Find contacts by name</p>
        <input
          className={style.input}
          type="text"
          name="number"
          value={value}
          onChange={changeFilter}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
