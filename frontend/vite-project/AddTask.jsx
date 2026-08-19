import React from 'react'

function AddTask() {
  return (
    <div>
        <div>
            <h2>Add Task</h2>
            <form className='add-task-form'>
                <div className='form-field'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder='Enter task title' />
                    </div>
                    <div className='form-field'>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" row="4" placeholder='Enter task description'></textarea>
                                            </div>
                                            <div>
                                                <button type="button" className='btn btn-secondary'> cancle </button>
                                                <button type="submit" className='btn btn-primary'> save task</button>
                                            </div>
            </form>
        </div>
      
    </div>
  )
}

export default AddTask
