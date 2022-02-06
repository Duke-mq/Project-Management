import {useEffect,useState} from 'react'


export const isVoid = (value:unknown) => value === undefined || value === null || value === ""
export const isFalsy = (value:unknown) => value === 0 ? false: !value
/*
let a:object
a = {name: 'jack'}
a = () =>{}
a = new RegExp('')
let b:{[key:string]:unknown}
b = {name: 'jack'}
/!*b如果是一个函数就会报错了*!/
b = () =>{}*/
/*我们对object进行解构，object里面不止是键值对 还可以是函数，正则对象 {...object} 索性就返回一个{''} 空对象
* 解决方案就是我们写要传入的对象必须是键值对的形式*/
export const cleanObject = (object:{[key:string]:unknown}) =>{
    const result = {...object}
    Object.keys(result).forEach(
        key => {
            const value = result[key]
            if(isVoid(value)) {
                delete result[key]
            }
        }
    )
    return result
}


/*react自带的hook只能在组件或者自定义hook中运行，否则会报错*/


export const useMount = (callback: () => void ) =>{
    useEffect( ()=>{
        callback()
        /*TODO 依赖项里面加上callback会造成无限循环，这和useCallback 和useMemo有关系*/
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

/*我们希望value是什么类型，返回的debouncedValue就是什么类型，这就很依赖泛型*/
export const  useDebounce = <V>(value:V, delay?:number)=>{
    const [debouncedValue, setDebouncedValue] = useState (value)
    useEffect(()=> {
        /*每次在value变化后，设置一个定时器，*/
        const timeout = setTimeout( ()=> setDebouncedValue(value), delay)
        /*每次在上一个useEffect处理完以后再运行 */
        return () => clearTimeout(timeout)
    },[value, delay])
    return debouncedValue
}


// export const useArray = <T>(initialArray:T[]) =>{
//     const [value,setValue] = useState(initialArray)
//     return {
//         value,
//         setValue,
//         add: (item:T) => setValue([...value, item]),
//         clear:() => setValue([]),
//         removeIndex:(index:number)
//     }
// }


//debounce 原理详解
//0s -------> 1s ------> 2s -------> ....
//     一定要理解：这三个函数都是同步操作的，所以他们都是在0-1s这个时间段内瞬间完成段:
//     log()#1   // timeout#1
//     log()#2   // 发现 timeout#1！取消，设置timeout#2
//     log()#3   // 发现timeout#2！取消，设置timeout#3
//      // 所以 log()#3 结束后，只剩下timeout#3在独立等待