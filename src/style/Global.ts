import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: Poppins, sans-serif;
    }
    html, body, #__next {
        height: 100%;
        margin: 0px;
    }
    @media only screen and (min-width: 993px) {
        body, html {
            max-width: 100%;
        }
    }

    html {
        background: url(img/back.jpg);
        background-size: cover;
        line-height: 1.5;
        @media only screen and (min-width: 0) {
            font-size: 14px;
        }
        @media only screen and (min-width: 992px) {
            font-size: 14.5px;
        }
        @media only screen and (min-width: 1200px) {
            font-size: 15px;
        }
    }

    ::selection {
        background-color: rgb(21, 178, 229);
        color: rgb(255, 255, 255);
    }
    
    ul:not(.browser-default) {
        padding-left: 0;
        list-style-type: none;
    }
    button, html input[type=button], input[type=reset], input[type=submit] {
        -webkit-appearance: button;
        cursor: pointer;
    }
    button, select {
        text-transform: none;
    }
    button {
        overflow: visible;
    }
    button, input, optgroup, select, textarea {
        color: inherit;
        font: inherit;
        margin: 0;
    }
    button[disabled], html input[disabled] {
        cursor: default;
    }
    img {
        border: 0;
    }
    a {
        text-decoration: none;
        background-color: transparent;
        color: #039be5;
        -webkit-tap-highlight-color: transparent;    
    }
    input {
        line-height: normal;
    }
    *, ::before, ::after {
        box-sizing: border-box;
    }
    h1, h2 {
        line-height: 110%;
    }
    audio, canvas, progress, video {
        display: inline-block;
        vertical-align: baseline;
    }
    #mouse-over-popover-top {
        * {
            font-family: Poppins;
        }
        pointer-events: none;
        >.MuiPopover-paper {
            overflow: visible;
            padding: 10px 20px;
            transform: translate(0px, -10px) !important;
            box-shadow: none;
            background-color: rgb(4, 17, 29);
            color: rgb(255, 255, 255);
            border-radius: 5px;
            font-size: 14px;
            font-weight: 600;
            outline: 0px;
        }
    }
    #mouse-over-popover-right {
        * {
            font-family: Poppins;
        }
        pointer-events: none;
        >.MuiPopover-paper {
            overflow: visible;
            padding: 10px 20px;
            transform: translate(10px, 0px) !important;
            box-shadow: none;
            background-color: rgb(4, 17, 29);
            color: rgb(255, 255, 255);
            border-radius: 5px;
            font-size: 14px;
            font-weight: 600;
            outline: 0px;
        }
    }
`;

export default GlobalStyle;