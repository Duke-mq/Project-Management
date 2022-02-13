/*传入泛型，就是为了初始化data的类型*/
import {useState} from "react"
interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success'
}
const defaultInitialState: State<null> = {
    stat: 'idle',
    error: null,
    data: null,
}

export const useAsync = <D>(initialState?: State<D>) => {
    const [state, setState] = useState({
        ...defaultInitialState,
        ...initialState
    })

    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })
    const setError = (error: Error) => setState({
            error,
            stat: 'error',
            data: null
        }
    )
    /**
     * 传入参数为promise,返回结果为 返回值 为返回结果 或者抛出错误,
     * 用来触发异步请求*/
    const run = (promise:Promise<D>) => {
        if(!promise || !promise.then) {
            throw new Error('请传入promise')
        }
        setState({...state,stat:'loading'})
        return promise.then(data => {
            setData(data)
            return data
        }).catch(error => {
                setError(error)
                return error
                // return Promise.reject(error)
            }
        )
    }
    return {
        isIdle: state.stat === 'idle',
        isLoading:state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        ...state,
        /*上面返回的是一些状态数据/下面是异步函数/数据处理函数*/
        run,
        setData,
        setState
    }
}