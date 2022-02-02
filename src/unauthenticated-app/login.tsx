import React, {useState} from 'react'
import { useAuth } from 'context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen =  () =>{
    const  {login} = useAuth()
    const handleSubmit =  (e:any) => {
        e.preventDefault()
        const username = e.currentTarget.elements[0].value
        const password = e.currentTarget.elements[1].value
        login({username,password})
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
        <button type={'submit'}>登录</button>

    </form>
}