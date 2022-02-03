import React, {useState} from 'react'
import { useAuth } from 'context/auth-context'
import {Form, Input, Button} from 'antd'
import { LongButton } from 'unauthenticated-app'
const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen =  () =>{
    const  {login} = useAuth()
    /*antd怎么知道我们需要的值是username，password，是因为我们写着的Form.Item里面的name去推断的*/
    const handleSubmit =  (values:{username:string,password:string}) => {
        login(values)
    }
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
                    <LongButton htmlType ={'submit'} type={'primary'}>登录</LongButton>
                </Form.Item>
        </Form>
}