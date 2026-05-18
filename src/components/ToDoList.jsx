import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import ToDo from './ToDo';
import { v4 as uuidv4 } from 'uuid';
import {TodosContext} from '../contexts/ToDoContext'
import {useContext,} from 'react';
import {useEffect,useMemo} from 'react';
import {useToast} from '../contexts/ToastContext'
export default function ToDoList() {
  
  const {todos,settodos}=useContext(TodosContext);
  const [titleinput,settitleinput]=useState("")
  const [displaytodostype,setdisplaytodostype]=useState("All");
  const {showhidetoast}=useToast()
  const completedtodos =useMemo(()=>{
    return todos.filter((t) => t.isCompleted)

    },[todos]);

  const notcompletedtodos = useMemo(()=>{
    return todos.filter((t) => !t.isCompleted)
  },[todos]);
  
    let todosrender=todos;
    if(displaytodostype=="Finished"){
      todosrender=completedtodos;
    }else if(displaytodostype=="Unfinished"){
      todosrender=notcompletedtodos;
    }else{
      todosrender=todos;
    }

  const todosjsx = todosrender.map((t) => {
    return <ToDo key={t.id} todo={t}  />;
  });

  
useEffect(() => {
  const storagetodos = JSON.parse(localStorage.getItem("todos"));
  if (storagetodos) settodos(storagetodos);
}, []);

  function handleaddclick(){
    const newtodo={
      id:uuidv4(),
      title:titleinput,
      details:"",
      isCompleted:false,
    }

    const updatetodos=[...todos,newtodo]
    settodos(updatetodos)
    localStorage.setItem("todos",JSON.stringify(updatetodos));
    settitleinput("");
    showhidetoast("The task has been added")
  }

function changedisplaytodostype(e){
  setdisplaytodostype(e.target.value);

}
  
  
  return (
    <>
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 3 }} style={{maxHeight:"80vh",overflow:"scroll"}}>
        <CardContent sx={{ p: 3 }}>

          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
          >
            My Tasks
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <ToggleButtonGroup
            exclusive
            aria-label="filter"
            sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
            value={displaytodostype}
            onChange={changedisplaytodostype}
          >
            <ToggleButton  value="All" sx={{ border: '1px solid #607d8b', color: '#607d8b' }}>
              All
            </ToggleButton>
            <ToggleButton  value="Finished" sx={{ border: '1px solid #607d8b', color: '#607d8b' }}>
              Finished
            </ToggleButton>
            <ToggleButton value="Unfinished" sx={{ border: '1px solid #607d8b', color: '#607d8b' }}>
              Unfinished
            </ToggleButton>
          </ToggleButtonGroup>

          {todosjsx}

          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Grid size={3}>

              <Button
              disabled={titleinput.length == 0}
              onClick={()=>{
                handleaddclick();
              }}
                fullWidth
                variant="contained"
                sx={{ background: '#607d8b', height: '56px', '&:hover': { background: '#455a64' } }}
              >
                Add
              </Button>
            </Grid>

            <Grid size={9}>
              <TextField
                fullWidth
                label="Task title"
                variant="outlined"
                value={titleinput}
                onChange={(e)=>{
                  settitleinput(e.target.value);
                }}
              />
            </Grid>
          </Grid>

        </CardContent>
      </Card>
    </Container>
    </>
  );
}