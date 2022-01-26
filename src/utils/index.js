import {useEffect,useState} from 'react'
export const isFalsy = (value) => value === 0 ? false: !value
export const cleanObject = (object) =>{
    const result = {...object}
    Object.keys(result).forEach(
        key => {
            const value = result[key]
            if(isFalsy(value)) {
                delete result[key]
            }
        }
    )
    return result
}
/*react自带的hook只能在组件或者自定义hook中运行，否则会报错*/
export const useMount = (callback) =>{
    useEffect( ()=>{
        callback()
    },[])
}


/* 初始版debounce
const debounce = (func,delay) => {
    let timeout;
    return (...param) => {
        if(timeout) {
            clearTimeout(timeout)
        }
        timeout = setTimeout(function () {
            func()
        },delay);
    }
}
*/


export const  useDebounce = (value, delay) =>{
    const [debouncedValue, setDebouncedValue] = useState (value)
    useEffect(()=> {
        /*每次在value变化后，设置一个定时器，*/
        const timeout = setTimeout( ()=> setDebouncedValue(value), delay)
        /*每次在上一个useEffect处理完以后再运行 */
        return () => clearTimeout(timeout)
    },[value, delay])
    return debouncedValue
}


//debounce 原理详解
//0s -------> 1s ------> 2s -------> ....
//     一定要理解：这三个函数都是同步操作的，所以他们都是在0-1s这个时间段内瞬间完成段:
//     log()#1   // timeout#1
//     log()#2   // 发现 timeout#1！取消，设置timeout#2
//     log()#3   // 发现timeout#2！取消，设置timeout#3
//      // 所以 log()#3 结束后，只剩下timeout#3在独立等待
