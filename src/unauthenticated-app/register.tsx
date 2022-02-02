/*此版本从从login下面的index复制过来的*/
import React, {useState} from 'react'
import { useAuth } from 'context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL
export const ResigterScreen =  () =>{
    const  {register} = useAuth()
    const handleSubmit =  (e:any) => {
        e.preventDefault()
        const username = e.currentTarget.elements[0].value
        const password = e.currentTarget.elements[1].value
        register({username,password})
        /*{}传入变量/表达式,style*/
    }
    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">用户名</label>
            <input type="text" id={'username'} ></input>
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'}></input>
        </div>
        <button type={'submit'}>注册</button>
    </form>
}