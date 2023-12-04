import { Drawer, Layout } from "antd";
import styled from "styled-components";

const { Sider } = Layout;
export const Container = styled(Sider)`
    background-color: #fff !important;
    padding: 0 20px;
    overflow-y: scroll;
    height: 140vh;
    &::-webkit-scrollbar {
        display: none;
      }
    .ant-layout-sider-children {
        height: 130%;
    }
`;

export const StyledDrawer = styled(Drawer)`
    margin-left: 400px;
`;