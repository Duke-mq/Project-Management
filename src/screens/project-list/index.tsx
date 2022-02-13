import {useState, useEffect} from 'react'
import {SearchPanel} from './search-panel'
import {cleanObject, useMount, useDebounce} from 'utils'
import styled from '@emotion/styled'
import {List, Project} from './list'
import * as qs from "qs"
import { Typography } from 'antd'
import { useAsync } from 'utils/use-async'
import { useProjects } from 'utils/project'
import { useHttp } from 'utils/http'
import { useUsers } from 'utils/user'
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    /*确定要提升的状态 */
    // const [list, setList] = useState([])
    // const [users, setUsers] = useState([])
    // const [isLoading,setIsLoading] = useState(false)
    // const [error,setError] = useState<null | Error>(null)
    /*看到useState的类型定义，这里用到的是泛型，通过setState传入的类型来给到param类型，即输入啥类型，
    输出就是啥类型。 定义的时候是一个占位符，传入相等于
    interfa <T> {
        name:string,
        personId:string
    },再把T与paran和返回的setParam的类型强绑定下来*/
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    /*这里用到了节流,注意下这个知识点*/
    const debounceParam = useDebounce(param, 200)
    console.log('打印下这个',debounceParam)
    // const client = useHttp()
    /*下面这个data另起变量名list*/
    const {isLoading,error,data:list} = useProjects(debounceParam)
    const {data:users} = useUsers()
    // const {run, isLoading, error,data:list} = useAsync<Project[]>()
    // useEffect(()=> {
    //     run(client('projects', {data: cleanObject(debounceParam)}))
    // },[debounceParam])
    /*上面再封装一层获取项目列表的函数*/
  /* 下面是没有封装async hook版本
    useEffect(() => {
        setIsLoading(true)
        client('projects', {data: cleanObject(debounceParam)})
        .then(
            data => {setList(data)})
        .catch(
            error=> {setError(error)
                setList([])
            })
        .finally(
            ()=> setIsLoading(false))
        // 下面是fetch版本
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
        //     if(response.ok) {
        //         setList(await response.json())
        //     }
        // })
    }, [debounceParam])*/
    /*只在最开始的时候获取,很多时候都会用到，我们就可以抽象一个自定义hook*/
    // useMount(() => {
    //     client('users').then(data => {
    //         setUsers(data)
    //         console.log(data)
    //     })
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if(response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    // })
    return (
        <Container>
                <h1>项目列表</h1>
                <SearchPanel param={param} setParam={setParam} users={users || []}/>
                {error? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
                {/* 下面这里的类型要加入list || [] 加入空数组类型*/}
                <List dataSource={list || []} users={users || []} loading={isLoading}/>
        </Container>
    )
}


const Container = styled.div`
  padding: 3.2rem;
`
function client(arg0: string) {
    throw new Error('Function not implemented.')
}

