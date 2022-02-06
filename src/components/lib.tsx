import styled from "@emotion/styled";

/**
 * Author xumianqu
 * 此模块是为了header栏定制类似react-componment组件Row，通过传入参数改变标签的样式
 * */
export const Row = styled.div<{
    gap?: number | boolean;
    between?: boolean;
    marginBottom?: number
}>`
    display: flex;
    align-items: center;
    justify-content: ${ props => props.between ? "space-betwenn" : undefined };
    margin-bottom: ${props => props.marginBottom + 'rem'};
    /*递归指定元素的所有指定子元素*/
    > * {
      margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem': undefined};
    }
`

// export const Row = styled.div<{
//     gap?: number | boolean;
//     between?: boolean;
//     marginBottom?:number
// }>`
//     display: flex;
//     align-items: center;
//     justify-content: ${props => props.between ? "space-between" : undefined };
//     > * {
//       margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem': props.gap ?'2rem': undefined};
//     }
// `