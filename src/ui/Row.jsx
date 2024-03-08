import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}
  ${(props) =>
    props.type === "horizontal" &&
    css`
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `}
`;

// React support define default props
Row.defaultProps = {
  type: "horizontal",
};

export default Row;
