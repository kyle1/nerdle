import styled from "styled-components";

const FormContainer = styled.div`
  text-align: center;
  width: 450px;
  margin-left: auto;
  margin-right: auto;

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid white;
    padding: 10px 15px;
    margin-bottom: 10px;
    font-size: 14px;
  }

  label {
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 0px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    font-weight: 200;
  }
  button[type="submit"],
  input[type="submit"] {
    background: #036781;
    color: white;
    text-transform: uppercase;
    border: none;
    margin-top: 40px;
    padding: 20px;
    font-size: 16px;
    font-weight: 100;
    letter-spacing: 10px;
  }
  button[type="submit"]:hover,
  input[type="submit"]:hover {
    background: #02485b;
    cursor: pointer;
  }
  button[type="submit"]:active,
  input[type="button"]:active,
  input[type="submit"]:active {
    transition: 0.3s all;
    transform: translateY(3px);
    border: 1px solid transparent;
    opacity: 0.8;
  }
  input:disabled {
    opacity: 0.4;
  }
  input[type="button"]:hover {
    transition: 0.3s all;
  }
  button[type="submit"],
  input[type="button"],
  input[type="submit"] {
    -webkit-appearance: none;
  }
`;

export default FormContainer;
