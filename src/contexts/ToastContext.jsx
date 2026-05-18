import {createContext}from 'react'
import {useState,useContext} from 'react';
import SnackBar from '../components/SnackBar'

const ToastContext=createContext({})

export const ToastProvider=({children})=>{
    const [severity,setseverity]=useState("success");
     const [open, setOpen] = useState(false);
       const [message, setmessage] = useState();
       
     function showhidetoast(msg,type="success"){
        setmessage(msg);
        setseverity(type);
        setOpen(true);

        setTimeout(()=>{
            setOpen(false);
        },2000)
}
    return( <ToastContext.Provider  value={{showhidetoast}}>
        <SnackBar 
        open={open}
        message={message}
        severity={severity}
        />
        {children}
    </ToastContext.Provider>

        );
        
    
};

export const useToast = ()=>{
    return useContext(ToastContext);
}