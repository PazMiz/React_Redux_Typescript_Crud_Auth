// YourComponent.tsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCount } from '../Letters/letterCountSlice';
import { RootState } from '../types/store';
import './letter.css'; // Import the CSS file

const YourComponent: React.FC = () => {
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = e.target.value.length;
    dispatch(setCount(count));
  };

  return (
    <div>
      <input type="text" onChange={handleInputChange} />
    </div>
  );
};

export default YourComponent;
