import React, {useState} from 'react'
/*ts中的类型兼容，就是A类型继承自于B类型，如果函数传入的需要是一个B类型，传入A类型是不会报错的
ts是 鸭子类型;duck typing 面向接口编程，不是面向对象编程，java就是面向对象编程
就是说传入函数的类型，只要和接口有相同的属性名，且类型相同，就可以传入，不一定要在变量后面声明接口
类型也能继承
interface Base {
    id: number
}
interface Advance extends Base {
    name:string
}
const test = (p:Base) =>{
}
let p = {name:true,id:1}
test(p)*/
const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen =  () =>{
    const login = (param: {username:string,password:string}) =>{
        fetch(`${apiUrl}/login`, {
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(param)
        }).then(async response => {
            if(response.ok) {
                let result = await response.json()
                console.log(result)
            }
        })
    }
    const handleSubmit =  (e:any) => {
        e.preventDefault()
        const username = e.currentTarget.elements[0].value
        const password = e.currentTarget.elements[1].value
        login({username,password})
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
        <button type={'submit'}>登录</button>
    </form>
}