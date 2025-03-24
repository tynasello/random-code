/*--------------------------------------------------------------*/

import { createGlobalStyle } from "styled-components";

/*--------------------------------------------------------------*/

const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

    }
    a{
        text-decoration: none;
        color: black;
    }
    h1,h2,h3,h4,h5,h6,p,div{
        margin:0;
        padding:0;
    }
    body{
        font-family:'Open Sans', sans-serif;
        background-color:#ECF0F1;
        color:#2A2D34;
    }
    
`;
/*--------------------------------------------------------------*/
export default GlobalStyle;
/*--------------------------------------------------------------*/
