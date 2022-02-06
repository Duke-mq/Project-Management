// import {jsx} from '@emotion/react'
import {Form, Input, Select} from "antd"
export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string;
    token: string
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    }
    setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({param, users, setParam}: SearchPanelProps) => {
    /*这里遇到一个问题，会把list给用进来，因为随着搜索面板的更新，list也会随着更新,
    * 这时候list肯定要在父组件上的，所以只能用状态提升，将搜索框的状态和list的状态写在父组件，
    * 再将以props的形式传到子组件*/
    return (
        <Form style={{marginLeft: "2rem"}} layout={"inline"}>
            <Form.Item>
                <Input
                    placeholder={'项目名'}
                    type="text" value={param.name} onChange={e => setParam({
                    /*这种写要很熟悉，对象有多个键值对，覆盖所要修改的键值对
                    * 等于 Object.assisn({},param,{name:e.target.value})*/
                    ...param,
                    name: e.target.value
                })}></Input>
            </Form.Item>
            <Form.Item>
                <Select value={param.personId} onChange={value => setParam({...param, personId: value})}>
                    <Select.Option value={""}>负责人</Select.Option>
                    {
                        users.map(user => <Select.Option key={user.id} value={user.id}> {user.name} </Select.Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    )

}