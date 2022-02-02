/*在用户登录的情况下，只有退出登录现象*/
import {useState} from 'react';
import {useAuth} from  'context/auth-context'
import {ProjectListScreen} from 'screens/project-list'

export const AuthenticatedApp =()=> {
    const {logout} = useAuth()
    return <div>
        <button onClick={logout}>登出</button>
        <ProjectListScreen/>
    </div>
}