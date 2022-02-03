import { useState } from "react";
import {LoginScreen} from  "./login"
import {ResigterScreen} from  "./register"
import {Card,Button} from 'antd'
export const UnauthenticatedApp = () =>{
    const [isRegister,setIsRegister] = useState(false)
    return(

            <div style={{display:'flex', justifyContent:'center',flexDirection:"row"}}>
                <Card>
                    {isRegister?<ResigterScreen/>:<LoginScreen/>}
                    <Button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister? '登录':'注册'}</Button>
                </Card>

            </div>
    )
}