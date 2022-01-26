export const List = ({list,users}) => {
    console.log('专门打印',list)
    return(
            <table>
                <thead>
                <tr>
                    <th>名称</th>
                    <th>负责人</th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((project) =>
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            {/*下面用这种变量？的形式去写，即使该变量为undefined的时候，.xxx也不会报错*/}
                            <td>{users.find(user => user.id === project.personId)?.name || '未知'}</td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        )

}