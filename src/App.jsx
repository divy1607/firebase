import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TextField, Button } from '@mui/material'
import Auth from './components/Auth.jsx';
import { db, auth, storage } from "./config/Firebase";
import { addDoc, collection, deleteDoc, getDocs, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [taskList, setTaskList] = useState([]);

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDur, setNewDur] = useState(0);

  const [updatedTitle, setUpdatedTitle] = useState('');

  const [fileUpload, setFileUpload] = useState(null);

  const getTaskCollection = collection(db, "Task");

  const getTaskList = async () => {
    try {
      const data = await getDocs(getTaskCollection);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }))
      setTaskList(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  const Submit = async () => {
    try {
      await addDoc(getTaskCollection, {
        Title: newTitle,
        Description: newDesc,
        Duration: newDur,
        userId: auth?.currentUser?.uid
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "Task", id);
    await deleteDoc(taskDoc);
  }

  const updateTaskTitle = async (id) => {
    const taskDoc = doc(db, "Task", id);
    await updateDoc(taskDoc, { Title: updatedTitle });
  }

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `pdfs/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <>
      <Auth></Auth>
      <br />
      <input type="text" placeholder='task title' onChange={(e) => setNewTitle(e.target.value)} />
      <input type="text" placeholder='task desc' onChange={(e) => setNewDesc(e.target.value)} />
      <input type="number" placeholder='task duration in days' onChange={(e) => setNewDur(Number(e.target.value))} />
      <button onClick={Submit}>add task</button>
      <div>
        {taskList.map((task) => (
          <div>
            <h1>{task.Title}</h1>
            <h2> {task.Description} </h2>
            <h3> {task.Duration} </h3>
            <h3> {task.TechStack}</h3>
            <button onClick={() => deleteTask(task.id)}> Delete Task </button>
            <input type="text" placeholder='new task title' onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateTaskTitle(task.id)}>update</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files)} />
        <button onClick={uploadFile}> upload file </button>
      </div>
    </>
  )
}

export default App