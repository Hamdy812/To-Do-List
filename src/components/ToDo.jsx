import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodosContext} from '../contexts/ToDoContext'
import {useContext,useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import {useToast} from '../contexts/ToastContext'


export default function ToDoa({todo}) {
  const [updatedtodo,setupdatedtodo]=useState({title:todo.title,details:todo.details});
  const [showdeletedialog,setshowdeletedialog]=useState(false);
  const [showupdatedialog,setshowupdatedialog]=useState(false);
  const {todos,settodos}=useContext(TodosContext);
  const { showhidetoast } = useToast();

  function handelcheckclick(){
    const updatedtodos=todos.map((t)=>{
      if(t.id==todo.id){
        t.isCompleted=!t.isCompleted;
      }
      return t;
    })

    settodos(updatedtodos)
    localStorage.setItem("todos",JSON.stringify(updatedtodos));
    showhidetoast("The Task is complete.")
  }

  function handledeleteclick(){
    setshowdeletedialog(true);
  }
  function handledeleteclose(){
   setshowdeletedialog(false);

  }
  function handledeleteconfirm(){
    const updatedtodos=todos.filter((t)=>{

      return t.id != todo.id;
    })
    settodos(updatedtodos);
        localStorage.setItem("todos",JSON.stringify(updatedtodos))??[];
showhidetoast("The Task is deleted.","error")  }

  function showupdatedialogg(){
    setshowupdatedialog(true);
  }
  function handleupdateclose(){
    setshowupdatedialog(false);
  }

  function handleupdateconfirm(){
       const updatedtodos=todos.map((t)=>{
          if(t.id==todo.id){
            return{...t,title:updatedtodo.title,details:updatedtodo.details};
          }else{
            return t;
          }
      })
    settodos(updatedtodos);
    setshowupdatedialog(false);
    localStorage.setItem("todos",JSON.stringify(updatedtodos));
    showhidetoast("The Task is updated.")
  }

return (
<>
      {/**deletaion dialog */}

    <Dialog
        
        onClose={handledeleteclose}
        open={showdeletedialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure about deleting it ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Deleted tasks cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handledeleteclose} autoFocus>
            Back
          </Button>
          <Button onClick={handledeleteconfirm} >Delete</Button>
        </DialogActions>
      </Dialog>


      {/**update dialog */}

      <Dialog
        onClose={handleupdateclose}
        open={showupdatedialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
       >

        <DialogTitle id="alert-dialog-title">
          {"Update Task "}
        </DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Title"
              fullWidth
              variant="standard"
              value={updatedtodo.title}
              onChange={(e)=>{
                setupdatedtodo({...updatedtodo,title:e.target.value})
              }}
            />
             <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Details"
              fullWidth
              variant="standard"
              value={updatedtodo.details}
              onChange={(e)=>{
                setupdatedtodo({...updatedtodo,details:e.target.value})
              }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleupdateclose} autoFocus>
            Back
          </Button>
          <Button onClick={handleupdateconfirm} >Update</Button>
        </DialogActions>
      </Dialog>
    

    <Card
      sx={{
        minWidth: 275,
        borderRadius: 3,
        background: "#cfd8dc",
        m: 2
      }}
    >
      <CardContent className='ToDoCard'>
       
     <Grid container alignItems="center">

       {/* Icons */}
      <Grid
        xs={4}
        display="flex"
        gap={1}
        mr="auto"   
      >
    <IconButton onClick={()=>{
      handelcheckclick();
    }} className="iconButton" sx = {{ color:todo.isCompleted?"white": "#607d8b", background:todo.isCompleted?"#37474f": "white", border: "2px solid #607d8b" }}>
      <CheckIcon />
    </IconButton>

    <IconButton  onClick={showupdatedialogg} className="iconButton" sx = {{ color: "#607d8b", background: "white", border: "2px solid #607d8b" }}>
      <EditIcon />
    </IconButton>

    <IconButton onClick={handledeleteclick} className="iconButton" sx = {{ color: "#607d8b", background: "white", border: "2px solid #607d8b" }}>
      <DeleteIcon />
    </IconButton>
  </Grid>

  {/* Title */}
  <Grid size={8}>
    <Typography
      variant="h6"
      sx={{  textDecoration: todo.isCompleted ? "line-through" : "none" ,textAlign: "right", fontWeight: "bold" }}
    >
      {todo.title}
      </Typography>
       <Typography
      variant="h6"
      sx={{ textAlign: "right", fontWeight: "bold" }}
    >
         {todo.details}
        </Typography>
     </Grid>

     </Grid>
      </CardContent>
     </Card>
     </>
  );
}