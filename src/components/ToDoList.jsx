import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState('All');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), task: inputValue, checked: false }]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, checked: !task.checked };
      }
      return task;
    }));
  };
  

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.checked));
  };

  const handleModeChange = (mode) => {
    setActiveMode(mode);
  };

  const filteredTasks = tasks.filter(task => {
    if (activeMode === 'Active') {
      return !task.checked;
    } else if (activeMode === 'Completed') {
      return task.checked;
    }
    return true;
  });

  return (
    <div className="todo-list">
      <h1 className='todoHeader'>TODO</h1>
      <div className='afterTodo'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter task..."
            className='hh'
          />
        </form>
        <div className="tasks">
          {filteredTasks.map(task => (
            <TodoItem
              key={task.id}
              task={task.task}
              checked={task.checked}
              onDelete={() => handleDelete(task.id)}
              onToggle={() => handleToggle(task.id)}
            />
          ))}
        </div>
        <div className="todoFooter">
          <p className='pFooter'>{tasks.filter(task => !task.checked).length} items left</p>
          <div className='FooterCHild'>
            <p onClick={() => handleModeChange('All')}>ALL</p>
            <p onClick={() => handleModeChange('Active')}>Active</p>
            <p onClick={() => handleModeChange('Completed')}>Completed</p>
          </div>
          <p className='pFooter1' onClick={handleClearCompleted}>Clear Completed </p>
        </div>
      </div>
    </div>
  );
};

export default TodoList;