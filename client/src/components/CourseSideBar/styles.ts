import { Button, Drawer, Layout } from "antd";
import styled from "styled-components";

const { Sider } = Layout;
export const Container = styled(Sider)`
  background-color: #fff !important;
  padding: 0 20px;
  max-height: 100vh;

  .ant-layout-sider-children {
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const StyledDrawer = styled(Drawer)`
  margin-left: 400px;
  .ant-drawer-header {
    padding-bottom: 0;
    border: none !important;
  }
`;

export const StyledButton = styled(Button)`
  font-size: 10px;
  padding: 0 10px;
  height: 24px;
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin: 10px 0;
`;
