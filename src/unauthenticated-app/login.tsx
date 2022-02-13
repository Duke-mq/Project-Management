import React, {useState} from 'react'
import {useAuth} from 'context/auth-context'
import {Form, Input, Button} from 'antd'
import {LongButton} from 'unauthenticated-app'
import {useAsync} from 'utils/use-async'

const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreen = ({onError}: { onError: (error: Error) => void }) => {
    const {login} = useAuth()
    const {run, isLoading, error} = useAsync()
    /*antd怎么知道我们需要的值是username，password，是因为我们写着的Form.Item里面的name去推断的*/
    const handleSubmit = async (values: { username: string, password: string }) => {
        await run(login(values))
        if (error) {
            onError(error)
        }
    }
    return <Form onFinish={handleSubmit}>
        <Form.Item
            name={'username'}
            rules={[{required: true, message: '请输入用户名'}]}>
            <Input id="username" placeholder={'用户名'} type="text"/>
        </Form.Item>
        <Form.Item
            name={'password'}
            rules={[{required: true, message: '请输入密码'}]}>
            <Input id="password" placeholder={'密码'} type="password"/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={'submit'} type={'primary'}>登录</LongButton>
        </Form.Item>
    </Form>
}

function run(arg0: Promise<void>) {
    throw new Error('Function not implemented.')
}
