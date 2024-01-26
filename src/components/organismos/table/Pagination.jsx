import styled from "styled-components"
import { v } from "../../../styles/variables"


export const Pagination = ({
    table,
    goBegin,
    page,
    //setPage,
    pageCount
}) => {

    return (
        <Container>
            <button 
            disabled={!table.getCanPreviousPage()}
                onClick={() => goBegin()}
            >
                <span className="icons left"><v.iconoflechaderecha /><v.iconoflechaderecha /></span>
            </button>
            <button 
                disabled={!table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
            >
                <span className="icons left">{<v.iconoflechaderecha />}</span>
            </button>
            <span>{page}</span>
            <p>de {pageCount}</p>
            <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.nextPage()}
            >
                <span className="icons">{<v.iconoflechaderecha />}</span>
            </button>
            <button
                disabled={!table.getCanNextPage()}
                onClick={() => table.setPageIndex(table.getPageCount()-1)}
            >
                <span className="icons">{<v.iconoflechaderecha />}</span>
            </button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    margin-top: 1rem;
    button {
        background-color: #FF7800;
        border: none;
        padding: 5px 10px;
        border-radius: 3px;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        text-align: center;
        transition: 0.3s;
        &:enabled {
            &:hover {
                box-shadow: 0px 10px 15px -3px ${(props) => props.$colorCategory};
            }
        }
        &:disabled {
            background-color: gray;
        }
        .icons {
            color: #fff;
            &.left {
                transform: rotate(-180deg);
                display: flex;
            }
        }
    }
`