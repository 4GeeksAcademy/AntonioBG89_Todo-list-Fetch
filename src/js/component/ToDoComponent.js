import React, { useState } from 'react';
import { FaRegTimesCircle } from 'react-icons/fa';

const ToDoComponent = ({ todo, onDelete }) => {
  const [showIcon, setShowIcon] = useState(false);

  return (
    <div className="container estiloListaTodos d-flex justify-content-between"
      onMouseEnter={()=> setShowIcon(true)}
      onMouseLeave={()=> setShowIcon(false)}>
      {todo}
      {showIcon && <FaRegTimesCircle onClick={onDelete} style={{ cursor: 'pointer' }} />}
      </div>
  );
};

export default ToDoComponent;