import React, {useState} from "react"
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider"
import {ReactNode} from "../../../WebStorm 2021.3.1/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";
interface AuthForm {
    username: string,
    password:string
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
    return <AuthContext.Provider children={children} value={{user, login,register,logout }}/>
}


export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    console.log('打印',context)
    return context
}
