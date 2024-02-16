import styled from "styled-components"

export const ActionTable = ({
    func,
    fontSize,
    color,
    icon
}) => {
  // icon viene con valor v.iconeditarTabla
  const _icon =icon
  
  return (
    // <span className={`text-[${_color}] text-[${_fontSize}]`}>
    //   {<_icon></_icon>}
    // </span>
    <Container $color={color} $fontSize={fontSize} onClick={func}>
      {<_icon></_icon>}
    </Container>
  )

}
  const Container = styled.span`
    color: ${(props)=>props.$color};
    font-size: ${(props)=>props.$fontSize};
  `
