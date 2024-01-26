import styled from "styled-components"


export const InputSearchList = ({ 
    onChange,       // function
    placeholder     // string
}) => {
    return (
        <Container>
            <input type="text" onChange={onChange} placeholder={placeholder} />
        </Container>
    )
}


const Container = styled.div`
    position: relative;
    input {
        background: ${(props) => props.theme.bgtotal};
        font-size: 16px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        border-bottom: solid 1px grey;
        color: ${(props) => props.theme.text};
        outline: none;
        &:focus {
            border-bottom: none;
        }
        &::placeholder {
            color: #c8c8c8;
        }
    }
`