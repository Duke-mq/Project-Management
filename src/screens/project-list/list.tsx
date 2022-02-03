import {User} from "screens/project-list/search-panel"
import { Dropdown, Menu, Table, TableProps, Modal } from "antd";
interface Project {
    id:string;
    name: string;
    personId:string;
    pin:boolean;
    organization:string
}
interface ListProps {
    list: Project[]
    users:User[]
}

export const List = ({list,users}:ListProps) => {
    return(
        <Table pagination={false} columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter:(a, b) => a.name.localeCompare(b.name)
            },
            {
                title:'负责人',
                render(value, project) {
                    return <span>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                    </span>
                }
            }
        ]}
            dataSource={list}/>
    )
        /*用Table组件去代替*/
        //     <table>
        //         <thead>
        //         <tr>
        //             <th>名称</th>
        //             <th>负责人</th>
        //         </tr>
        //         </thead>
        //         <tbody>
        //         {
        //             list.map((project) =>
        //                 <tr key={project.id}>
        //                     <td>{project.name}</td>
        //                     {/*下面用这种变量？的形式去写，即使该变量为undefined的时候，.xxx也不会报错*/}
        //                     <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
        //                 </tr>
        //             )
        //         }
        //         </tbody>
        //     </table>
        // )

}