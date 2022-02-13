import {useEffect} from "react"
import {cleanObject, useDebounce} from "utils"
import {useAsync} from "./use-async"
import {useHttp} from 'utils/http'
import {Project} from "screens/project-list/list"
import { User } from "screens/project-list/search-panel"
/*
export interface Student {
    name: string;
    age: number;
}
const student1: Student = {name:'xu',age:18}
const student2: Partial<Student> = {}
*/
/*type User = {
    id: string;
    name: string;
    email: string;
};
type UserWithoutEmail = Omit<User, "email">;
type UserKeys = keyof User;
const b:UserKeys = 'id'*/

export const useUsers = (param?:Partial<User>) => {
    const client = useHttp()
    /*这里只用到run处理异步请求的custome hook*/
    const {run, ...result} = useAsync<User[]>()
    useEffect(() => {
        run(client('users', {data: cleanObject(param || {})}))
    }, [param])
    return result
}