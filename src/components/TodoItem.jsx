import React from 'react';

const TodoItem = (
     {
        task,checked,onDelete,onToggle
     }
) => {
return (
 <div>
       <div className='todo_item'>
      <div className='divTask'>
      <input type="checkbox" 
        checked={checked}
        onChange = {onToggle}
        />
            
        <span className='taskspan'>{task.trim()}  </span>
        
      </div>

        <button onClick={onDelete} className='deleteButton'> x </button>
       
    </div>
   <hr className='row'></hr>
 </div>
    
)


}



export default TodoItem;