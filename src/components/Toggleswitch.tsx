import React, { useState } from 'react';
import '../toggleswitch.css';

interface ToggleProps {
  toggle: boolean;
  handleToggleChange: (isToggled: boolean) => void;
}

const Toggle = ({ toggle, handleToggleChange }: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(toggle);

  const handleClick = () => {
    setIsToggled(!isToggled);
    handleToggleChange(isToggled);
  };

  return (
    <div className='toggle-container' onClick={handleClick}>
      <div className={`toggle-btn ${!isToggled ? "disable" : ""}`}>
        {isToggled ? "ON" : "OFF"}
      </div>
    </div>
  );
};

export default Toggle;