import { css } from '@emotion/react';
import { textColor, borderColor1, buttonColor } from '../common';

export const markdownStyles = css`
  h1, h2, h3, h4, h5, h6 {
    color: ${textColor};
    margin-top: 1em;
    margin-bottom: 0.5em;
    font-weight: bold;
  }

  h1 { font-size: 2em; border-bottom: 1px solid ${borderColor1}; padding-bottom: 0.3em; }
  h2 { font-size: 1.5em; border-bottom: 1px solid ${borderColor1}; padding-bottom: 0.3em; }
  h3 { font-size: 1.2em; }
  h4 { font-size: 1em; }
  h5 { font-size: 0.8em; }
  h6 { font-size: 0.7em; color: ${borderColor1}; }

  p {
    margin-bottom: 1em;
    line-height: 1.6;
    color: ${textColor};
  }

  a {
    color: ${buttonColor};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  ul, ol {
    margin-bottom: 1em;
    padding-left: 2em;
  }

  li {
    margin-bottom: 0.5em;
  }

  blockquote {
    border-left: 4px solid ${borderColor1};
    padding-left: 1em;
    margin-left: 0;
    color: ${borderColor1};
  }

  code {
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    background-color: #f0f0f0;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }

  pre {
    background-color: #f0f0f0;
    padding: 1em;
    border-radius: 5px;
    overflow-x: auto;
    margin-bottom: 1em;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1em;
  }

  th, td {
    border: 1px solid ${borderColor1};
    padding: 0.8em;
    text-align: left;
  }

  th {
    background-color: #f9f9f9;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1em 0;
  }
`;
