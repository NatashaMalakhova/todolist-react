import React from 'react';

const Task = ({ task, ...props }) => {
  const DeleteBtn = () => (
  <button className="action-btn delete" onClick={props.deleteTask}>
    <i className='material-icons'>clear</i>
  </button>
  );

  const className = 'task ' + (task.done  
    ? 'task-done' 
    : '');

  return(
    <div>
      <ul className={className}>
        <li onClick={props.doneTask}>
            <label>{task.title}</label>
        </li>
        <DeleteBtn />
      </ul>  
    </div>
  )
}

export default Task;