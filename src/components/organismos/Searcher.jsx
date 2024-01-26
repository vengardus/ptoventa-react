import styled from "styled-components"
import { FaSearch } from "react-icons/fa"

export const Searcher = ({
    setSearcher
}) => {
    const handleOnChange = (e) => {
        setSearcher(e.target.value)
    }

    return (
        <Container>
            <article className="content">
                <FaSearch className="icon" />
                <input
                    onChange={handleOnChange}
                    placeholder="...buscar"
                >
                </input>
            </article>
        </Container>
    )
}

const Container = styled.div`
    align-items: center;
    background-color: ${(props) => props.theme.bgTotal};
    border-radius: 10px;
    color: ${(props) => props.theme.text};
    display: flex;
    height: 60px;
    width: 60%;
    border: 1px solid #414244;
    
    .content {
        padding: 15px;
        gap:10px;
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        .icon {
            font-size: 18px;
        }
        input {
            font-size: 18px;
            width: 100%;
            outline: none;
            background: none;
            border: 0;
            color: ${(props) => props.theme.text};
        }
    }
`