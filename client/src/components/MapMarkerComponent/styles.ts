import styled from "styled-components";

export const StyledLabel = styled.div`
    position: absolute;
    color: #000;
    left: -7px;
    top: -30px;
    font-weight: bold;
    background-color: #fff;
    border-radius: 9999px;
    width: 16px;
    height: 16px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const StyledInfo = styled.div`
    width: 200px;
    height: 70px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    top: -110px;
    left: -100px;
    position: absolute;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
`;
export const StyledAddress = styled.span`
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
`;
export const StyledChildren = styled.span`
    width: 180px;
    font-weight: bold;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;