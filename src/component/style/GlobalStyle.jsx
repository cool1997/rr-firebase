import { createGlobalStyle } from 'styled-components/macro'

export const GlobalStyle = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.body}; 
        transition: background 0.1s linear;

        padding: 40px calc(50vw - 200px);
        min-width: 100vw;
        min-height: 100vh;
        
        color: ${({ theme }) => theme.text}; 
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: 400;
        /* font-size: 16px; */
        /* line-height: 16px; */
    }

    .visually-hidden:not(:focus):not(:active),
        input[type='checkbox'].visually-hidden,
        input[type='radio'].visually-hidden {
        position: absolute;

        width: 1px;
        height: 1px;
        margin: -1px;
        border: 0;
        padding: 0;

        white-space: nowrap;

        clip-path: inset(100%);
        clip: rect(0 0 0 0);
        overflow: hidden;
    }
`
