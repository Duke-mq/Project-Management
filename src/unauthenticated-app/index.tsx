import { useState } from "react";
import {LoginScreen} from  "./login"
import {ResigterScreen} from  "./register"
export const UnauthenticatedApp = () =>{
    const [isRegister,setIsRegister] = useState(false)
    return(
        <div>
            {isRegister?<ResigterScreen/>:<LoginScreen/>}
            <button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister? '登录':'注册'}</button>
        </div>
    )
}