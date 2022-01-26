export interface  User {
    id:string;
    name:string;
    email:string;
    title:string;
    organization:string;
}
interface SearchPanelProps {
    users:User[],
    param: {
        name:string,
        personId: string
    }
    setParam:(param:SearchPanelProps['param']) => void
}
export const SearchPanel = ({param,users,setParam}:SearchPanelProps) =>{
    /*这里遇到一个问题，会把list给用进来，因为随着搜索面板的更新，list也会随着更新,
    * 这时候list肯定要在父组件上的，所以只能用状态提升，将搜索框的状态和list的状态写在父组件，
    * 再将以props的形式传到子组件*/
    return(
        <form>
            <div>
                <input type="text" value={param.name} onChange={e => setParam({
                    /*这种写要很熟悉，对象有多个键值对，覆盖所要修改的键值对
                    * 等于 Object.assisn({},param,{name:e.target.value})*/
                    ...param,
                    name: e.target.value.trim()
                })}></input>
                <select value={param.personId} onChange={ e => setParam(
                    {
                        ...param,
                        personId:e.target.value,
                    })}>
                    <option value={param.personId}>负责人</option>
                    {
                        users.map( user => <option  key={user.id} value = {user.id}> {user.name} </option>)
                    }
                </select>
            </div>
        </form>)

}