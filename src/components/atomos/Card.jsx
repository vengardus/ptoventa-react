import styled from "styled-components"

export const Card = styled.div`
    background-color: ${({ theme }) => theme.bg4};
    color: ${({ theme }) => theme.text};
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 35px 60px -15px rgba(0, 0, 0, 0.3);
    width: 45%;
    height: auto;
    max-height: 120px; 
    min-width: 100px;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
`
