import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *, *::after, *::before {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    body{
        width: 100%;
        overflow: hidden;
    }
`;