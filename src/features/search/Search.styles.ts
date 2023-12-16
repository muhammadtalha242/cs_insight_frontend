import { Tabs } from "antd";
import styled from "styled-components";
import { Size } from "../../themes";


type VisualizationsTabContainerStyleProps= {
    flex: number;
}

export const MainContentContainer = styled.div``;


export const SearchLayoutContainer = styled.div`
    display: flex;
`;

export const VisualizationsTabContainer= styled(Tabs)<VisualizationsTabContainerStyleProps>`
    padding: 0 ${Size.xl} 0 ${Size.lm};
    transition: flex-basis 0.5s ease;
    flex: ${(props)=>props.flex}; 
`;

