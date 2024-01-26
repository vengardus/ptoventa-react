import styled from "styled-components"
import { ConfigTemplate } from "../../components/templates/config/ConfigTemplate"

export const ConfigPage = () => {

    return (
        <Container>
            <ConfigTemplate />
        </Container>
    )
}

const Container = styled.main`
    height:100vh
`
