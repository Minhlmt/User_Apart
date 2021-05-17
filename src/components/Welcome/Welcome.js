import React ,{useContext, useEffect,useState}from 'react';
import IsSignIn from '../SignIn/IsSignIn'
import Intro from './Intro'
import {notifyBillContext} from '../../globals/constants'

export default function Welcome(props){
  
    const [component,setComponent]=useState(<Intro/>);
   
    useEffect(()=>{
        const timeout=setTimeout(()=>{
        setComponent(<IsSignIn navigation={props.navigation}/>)
        },1000);
        return ()=>{
            clearTimeout(timeout);
        }
    },[])
    return(
        component
    )
}