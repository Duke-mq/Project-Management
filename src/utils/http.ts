import { useAuth } from 'context/auth-context'
import * as auth from 'auth-provider'
import * as qs from "qs"
/*Config继承了RequestInit接口，也有字段*/
interface Config extends RequestInit {
    data?:object,
    token?:string
}
const apiUrl = process.env.REACT_APP_API_URL
/*axios和fetch库是有区别的
fetch 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve
* （如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
所以我们需要去根据我们的需要去做reject 比如状态码在400，401,500*/
/*有时候我们不一定需要config，所以我们可能传入一个默认参数{}，为什么不能写可选参数呢，因为我们用了解构赋值*/
export const http = async(endpoint:string, {data,token,headers,...customConfig}:Config = {}) =>{
    const config ={
        method:'GET',
        headers: {
            Authorization: token? `Bearer ${token}`:'',
            'Content-Type': data? 'application/jsons':'',
        },
        /*上面是默认配置，下面是可以修改的*/
        ...customConfig
    }
    if(config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
        console.log('打印data/endpoint',data,endpoint)
    }else {
        config.body = JSON.stringify(data || {})
    }
    // axios 和 fetch 的表现不一样, axios在返回状态不为2xx的时候抛出异常，状态由pedding改变为reject
    /*async/await 封fetch*/
    return window.fetch(`${apiUrl}/${endpoint}`,config).then(
        async response => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({message: '请重新登录'})
            }
            const data = await response.json()
            if(response.ok) {
                return data
            }else {
                return Promise.reject(data)
            }
        }
    )
}


//上面的http方法，仍然要手动传入token，我们需要封装一个自动携带token网络请求方法。
export const useHttp = () => {
    const {user} = useAuth()
    /*传入的类型和http类型是一样，todo 讲解ts操作符s*/
    /*我们不想传过去的函数要传入一个tuple类型，用解构就可以实现传入两个参数*/
    return (...[endpoint,config]:Parameters<typeof http>)=> http(endpoint,{...config,token: user?.token || ""})
    // return ([endpoint,config]:[string,Config])=> http(endpoint,{...config,token: user?.token || ""})
}













