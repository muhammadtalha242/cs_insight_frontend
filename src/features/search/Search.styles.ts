import { Layout, Tabs } from "antd";
import styled from "styled-components";
import { Size } from "../../themes";

const { Content } = Layout;

export const MainContentContainer = styled(Content)`
`;


export const SearchLayoutContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
`;

export const VisualizationsTabContainer = styled(Tabs)`
    padding: 0 ${Size.xl} 0 ${Size.lm};
    width: 80%;
    height: 100%;
    min-width: 700px;
`;

