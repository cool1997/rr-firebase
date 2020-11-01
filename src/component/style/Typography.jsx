import styled from 'styled-components/macro'

const typeSize = {
  h1: `4rem`,
  h2: `3rem`,
  h3: `2rem`,
}

export const Typography = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: ${(props) => typeSize[props.as] || `1rem`};
  line-height: 1.5em;
  font-weight: ${(props) => (props.bold ? 700 : 400)};

  &.active {
    color: red;
  }
`
