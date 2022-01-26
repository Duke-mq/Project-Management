import {SearchPanel} from './search-panel'
import {List} from './list'
import {useState,useEffect} from 'react'
import * as qs from "qs"
import {cleanObject} from '../../utils'
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = ()=>{
    /*确定要提升的状态 */
    const [list,setList] = useState([])
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name:'',
        personId:''
    })
    useEffect(() =>{
        console.log(cleanObject(param))
        console.log('list', qs.stringify(cleanObject(param)))
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if(response.ok) {
                setList(await response.json())
            }
        })
    },[param])
    /*只在最开始的时候获取*/
    useEffect(() =>{
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok) {
                setUsers(await response.json())
            }
        })
    },[])


    return(
            <div>
                <SearchPanel param={param} setParam={setParam} users={users} />
                <List list={list} users={users} />
            </div>
        )

}
