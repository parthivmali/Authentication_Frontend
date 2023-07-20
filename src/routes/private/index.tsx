import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router"
import Cookies from "js-cookie"
import Navbar from "../../components/header/Navbar"

const Private:React.FC = () => {
    const navigate = useNavigate()
    const [checkedLogin, setCheckedLogin]=useState<string | null>("")
    
    useEffect(() => {
      const login= Cookies.get('jwt')
      if(login){
          setCheckedLogin(login)
      }else{
        navigate('/login')
      }
    }, [navigate])
    
  return (
    <div>
        {checkedLogin 
        ?
        <div>
            <Navbar/>
            <Outlet/> 
        </div>
        :
        null
        } 
    </div>
  )
}

export default Private