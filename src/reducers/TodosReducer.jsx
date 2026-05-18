import { v4 as uuidv4 } from 'uuid';


export default function TodosReducer(currenttodos,action){
    switch(action.type){
        case"added":{
                const newtodo={
                      id:uuidv4(),
                      title:action.payload.title,
                      details:"",
                      isCompleted:false,
                    }
                
                    const updatetodos=[...currenttodos,newtodo]
                    localStorage.setItem("todos",JSON.stringify(updatetodos));
                    return updatetodos;

        }
        case "updated":{
             const updatedtodos=currenttodos.map((t)=>{
           if(t.id==action.payload.id){
                return{...t,title:action.payload.title,details:action.payload.details};
            }else{
                return t;
            }
            })
            localStorage.setItem("todos",JSON.stringify(updatedtodos));
           
            return updatedtodos;
        }
        default:{
            throw Error("Unknown action"+action.type)
        }
    }
}