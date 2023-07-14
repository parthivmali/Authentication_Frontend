import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Cookies from "js-cookie";

const Public = () => {
    const navigate = useNavigate()
    const [checkedLogin, setCheckedLogin]=useState<string | null>("")

    useEffect(() => {
        const login= Cookies.get('jwt')
        if(login){
         setCheckedLogin(login)   
        }
      }, [])
      
  return (
    <div>
        {checkedLogin 
        ?
        <>
        {navigate('/')}
        </>
        : 
        <Outlet/>
        }
    </div>
  )
}

export default Public