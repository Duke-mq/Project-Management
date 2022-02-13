/*此版本从从login下面的index复制过来的*/
import React, {useState} from 'react'
import { useAuth } from 'context/auth-context'
import {Form, Input, Button} from 'antd'
import { LongButton } from 'unauthenticated-app'
const apiUrl = process.env.REACT_APP_API_URL
export const ResigterScreen =  ({onError}:{ onError:(error:Error) => void }) =>{
    const  {register} = useAuth()
    const handleSubmit =  (values:{username:string,password:string}) => {
        try{
            register(values)
        }catch(e){
            
        }


    }
  /*  const handleSubmit =  (e:any) => {
        e.preventDefault()
        const username = e.currentTarget.elements[0].value
        const password = e.currentTarget.elements[1].value
        register({username,password})
        /!*{}传入变量/表达式,style*!/
    }*/
    return <Form onFinish={handleSubmit}>
        <Form.Item
            name={'username'}
            rules={[{required: true, message:'请输入用户名'}]}>
            <Input id ="username" placeholder={'用户名'} type="text"/>
        </Form.Item>
        <Form.Item
            name={'password'}
            rules={[{required: true, message:'请输入密码'}]}>
            <Input id ="password" placeholder={'密码'} type="password"/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType ={'submit'} type={'primary'}>注册</LongButton>
        </Form.Item>
    </Form>
}