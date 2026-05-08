import ToDoList from './components/ToDoList'
import './App.css'
import {TodosContext} from './contexts/ToDoContext'
import { createTheme , ThemeProvider } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import {useState} from 'react';


const itodos = [
  { id: uuidv4(), title: "Read Book", details: "Read a Story Book", isCompleted: false },
  { id: uuidv4(), title: "Read Book", details: "Read a Story Book", isCompleted: false },
  { id: uuidv4(), title: "Read Book", details: "Read a Story Book", isCompleted: false },
];
const themes = createTheme({
  typography:{
    fontFamily:["myfont"],

  },
})
function App() {
  const [todos,settodos]=useState(itodos);

  return (
    <>
    <ThemeProvider theme={themes}>

   <div 
  className="App" 
  style={{ 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center",
    height: "100vh",
    background:"#455a64",
  }}
>
  <TodosContext.Provider  value={{todos,settodos}}>

  <ToDoList />
  </TodosContext.Provider >
</div>
    </ThemeProvider>
    </>
  )
}

export default App
