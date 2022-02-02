import React, {useState} from "react"
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider"
import {ReactNode} from "react";
import {http} from 'utils/http'
import {useMount} from 'utils'
/*附上type / interface关键字的区别 https://juejin.cn/post/6844903749501059085*/

interface AuthForm {
    username: string,
    password:string
}
/*函数功能，去本地缓存中找token信息，然后带着token去拿到user信息，再return出来*/
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if(token) {
        const data = await http('me',{token})
        user = data.user
    }
    console.log('打印下user',user)
    return user
}


type InitContext = {
    user: User | null;
    login: (form: AuthForm) => Promise<void>;
    register: (form: AuthForm) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = React.createContext<InitContext | undefined>(undefined)
AuthContext.displayName = 'AuthContetxt'
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    /*
    const login = (form:AuthForm) =>{auth.login(form).then(user => setUser(user))}
    const register = (form:AuthForm) =>{auth.register(form).then(user => setUser(user))}
    上面这两行代码可以用pointfree的思想抽写成这样*/
    const login = (form:AuthForm) => auth.login(form).then(setUser)
    const register = (form:AuthForm) => auth.register(form).then(setUser)
    const logout = () =>  auth.logout().then(user => setUser(null))
    /*这个调用的位置有点疑惑啊*/
    useMount(()=> bootstrapUser().then(user => setUser(user)))
    /*给全局的组件提供user*/
    return <AuthContext.Provider children={children} value={{user, login,register,logout }}/>
}

/*上面已经写好context，进下来要通过useContext传入context实例，通过export-import供消费组件获取到provider的value*/
/* 配合这篇文章去理解 http://www.ptbird.cn/react-createContex-useContext.html*/
export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
