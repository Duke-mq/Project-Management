import {User} from "screens/project-list/search-panel"
import { Dropdown, Menu, Table, TableProps, Modal } from "antd";
import dayjs from 'dayjs'
export interface Project {
    id:string;
    name: string;
    personId:string;
    pin:boolean;
    organization:string;
    created: number
}

interface ListProps extends TableProps<Project> {
    // list: Project[]
    users:User[]
}

/*这里的ListProps类型就是user类型数组 和 Table中的TableProps类型的联合类型，props中是一个对象，里面有些table的一些配置项键值对*/
export const List = ({users,...props}:ListProps) => {
    console.log('打印list',users)
    return(
        <Table pagination={false} columns={[
            {
                title: '名称',
                dataIndex: 'name',
                sorter:(a, b) => a.name.localeCompare(b.name)
            },
            {
                title: '部门',
                dataIndex: 'organization',
            },
            {
                title:'负责人',
                render(value, project) {
                    return <span>
                        {users.find(user => user.id === project.personId)?.name || '未知'}
                    </span>
                }
            },
            {
                title:'创建时间',
                dataIndex: "created",
                render(value, project) {
                    return <span>
                        {project.created?dayjs(project.created).format("YYYY-MM-DD"): "无"}
                    </span>
                }
            }
        ]}
           {...props}
        />
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