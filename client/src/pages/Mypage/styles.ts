import { CloseCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import styled from "styled-components";

export const ContentBox = styled.div`
    min-width: 40vw;
    max-width: 40vw;
    border: 1px solid #ebebeb;
    border-radius: 8px;
    padding: 60px;
    text-align: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
`;
export const CardContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`;
export const StyledCloseCircleOutlined = styled(CloseCircleOutlined)`
    position: absolute;
    color: #fff;
    top: 2%;
    left: 92%;
    z-index: 1;
`;
export const StyledCard = styled(Card)`
    .ant-card-head {
        padding: 0 !important;
    }
    .ant-card-head-title {
        overflow: visible;
        height: 114px;
    }
`;
export const StyledImg = styled.img`
    border-radius: 8px 8px 0 0;
    width: 210px;
    height: 114px;
    margin-left: -1px;
`;