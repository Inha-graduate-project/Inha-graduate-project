import { Rate, Typography } from "antd";
import styled from "styled-components";
const { Title } = Typography;
interface ButtonSectionProps {
    button: string;
}
export const Block = styled.div`
    display: flex;
    gap: 10px;
    margin: 30px 0;
`;
export const ImageContainer = styled.div`
    width: 160px;
    min-width: 160px;
    height: 100px;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const Content = styled.div`
    display: flex;
    flex-direction: column;
`
export const StyledTitle = styled(Title)`
    margin: 0 0 10px !important;
`;
export const ButtonSection = styled.div<ButtonSectionProps>`
    display: flex;
    gap: ${({ button }) => button === 'edit' ? '100px' : '70px'};
    align-items: center;
`;
export const StyledRate = styled(Rate)`
    .ant-rate-star {
        margin: 0 !important;
    }
    font-size: 10px;
`;
export const ButtonContainer = styled.div`
    display: flex;
    gap: 4px;
`;