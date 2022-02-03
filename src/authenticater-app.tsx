/*在用户登录的情况下，只有退出登录现象*/
import {useState} from 'react';
import {useAuth} from 'context/auth-context'
import {ProjectListScreen} from 'screens/project-list'
import styled from '@emotion/styled';
import { Row } from 'components/lib';

/**
 * gird 和 flex 各自的应用场景
 * 1.要考虑是一维布局，还是二维布局
 * 2.是从内容出发还是从布局出发
 * 从内容出发：你先有一组内容(数量一般不固定)，然后希望他们均匀分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里面填充
 * 从内容出发用flex，从布局出发用grid
 * */
export const AuthenticatedApp = () => {
    const {logout} = useAuth()
    return <Container>
        <Header between={true}>
            <HeaderLeft gap={true}>
                <h2>logo</h2>
                <h2>项目</h2>
                <h2>logo</h2>
            </HeaderLeft>
            <HeaderRight>
                <button onClick={logout}>登出</button>
            </HeaderRight>
        </Header>
        <Main>
            <ProjectListScreen/>
        </Main>
    </Container>
}

/**
 * H5语义化标签,假设登录进来后的布局是 上面是header，左边是navigation(导航) 中间是主内容 Main content，右边是sideBar/aside (侧边栏) 最下面是footer，
 * 但实际上我们是不需要footer的
 * */

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 6rem 1fr
`

const Header = styled(Row)`
  justify-content: space-between;
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
 /* display: flex;
  flex-direction: row;
  align-items: center;
  !* 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐 *!
  justify-content: space-between;*/
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main`
  height: calc(100vh - 6rem);
`
const HeaderItem = styled.h3`
    margin-right: 3rem;
`

