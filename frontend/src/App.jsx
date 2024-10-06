import React, { useEffect, useState } from 'react'
import useTask from './api/useTask'
import { MdDeleteOutline } from "react-icons/md";

const App = () => {
  const { addTask, getTasks, taskLoading, updateTask, deleteTask } = useTask()

  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const handleAddTask = async () => {
    addTask({ title: title, description: description, status: "pending" }, (res, err) => {
      if (error) {
        console.error(error)
        return
      }
      getTasks((res, error) => {
        if (error) {
          return
        }
        setTasks(res)
      })
    })
  }

  useEffect(() => {
    getTasks((res, error) => {
      if (error) {
        return
      }
      setTasks(res)
    })
  }, [])
  return (
    <div className='w-full flex flex-col gap-8'>
      <h1 className='text-4xl font-semibold underline w-full text-center'>All Tasks</h1>
      <div className='text-black'>
        <input
          type='text'
          placeholder='Enter Task Title'
          className='w-full p-2 border rounded-md'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter Task Description'
          className='w-full p-2 border rounded-md mt-2'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='w-full p-2 bg-blue-400 text-white rounded-md mt-2' onClick={handleAddTask}>Add Task</button>
      </div>
      <div className='flex flex-wrap gap-8'>
        {
          tasks?.map((task, index) => {
            return (
              <div className=' w-48 border-2 p-4 rounded-md' key={index}>
                <div className='w-full flex justify-between items-center'>
                  <h1 className='text-xl font-bold w-full'>{task.title}</h1>
                  <MdDeleteOutline className=' cursor-pointer' onClick={() => deleteTask(task?._id, (res, err) => {
                    if (err) {
                      console.log(err);
                      return;
                    }
                    getTasks((res, error) => {
                      if (error) {
                        return
                      }
                      setTasks(res)
                    })
                  })} />
                </div>
                <div className=" flex gap-1 justify-center items-center">
                  <p className='w-full'>{task.description}</p>
                  {
                    task.status == 'pending' ?
                    <p className='p-1 rounded-full bg-orange-400'></p> :
                    <p className='p-1 rounded-full bg-blue-400'></p>
                  }
                </div>
                <button className='w-full p-1 bg-blue-400 text-white text-sm rounded-md mt-2' onClick={() => updateTask({ status: "completed" }, task._id, (res, err) => {
                  if (err) {
                    console.log(err);
                    return;
                  }
                  getTasks((res, error) => {
                    if (error) {
                      return
                    }
                    setTasks(res)
                  })
                })}>
                  Mark Done
                </button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default App
