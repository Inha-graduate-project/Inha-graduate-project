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
export const CardTitle = styled.div`
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
`;
export const CardLabel = styled.div`
    background-color: #1959b6;
    color: #fff;
    padding: 0 8px;
    font-weight: normal;
    font-size: 10px;
    height: 16px;
    border-radius: 9999px;
`;