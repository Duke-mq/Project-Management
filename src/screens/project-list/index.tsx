import {useState,useEffect} from 'react'
import {SearchPanel} from './search-panel'
import {cleanObject,useMount,useDebounce} from 'utils'
import  {useHttp} from 'utils/http'
import {List} from './list'
import * as qs from "qs"
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = ()=>{
    /*确定要提升的状态 */
    const [list,setList] = useState([])
    const [users, setUsers] = useState([])
    /*看到useState的类型定义，这里用到的是泛型，通过setState传入的类型来给到param类型，即输入啥类型，
    输出就是啥类型。 定义的时候是一个占位符，传入相等于
    interfa <T> {
        name:string,
        personId:string
    },再把T与paran和返回的setParam的类型强绑定下来*/
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    const debounceParam = useDebounce(param,200)
    const client = useHttp()
    useEffect(() =>{
        client('projects',{data: cleanObject(debounceParam)}).then(data => {
                setList(data)
                console.log(data)
            })
        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
        //     if(response.ok) {
        //         setList(await response.json())
        //     }
        // })
    },[debounceParam])
    /*只在最开始的时候获取,很多时候都会用到，我们就可以抽象一个自定义hook*/
    useMount(() =>{
        client('users').then(data => {setUsers(data)
            console.log(data)
        })
        // fetch(`${apiUrl}/users`).then(async response => {
        //     if(response.ok) {
        //         setUsers(await response.json())
        //     }
        // })
    })
    


    return(
            <div>
                <SearchPanel param={param} setParam={setParam} users={users} />
                <List list={list} users={users} />
            </div>
        )

}
