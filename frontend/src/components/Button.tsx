import React from 'react';
import styled, { css } from 'styled-components';
import Colors from 'res/colors.json';

const Button = ({ children, secondary = false, ...rest }) => (
  <Border>
    <Container secondary={secondary} {...rest}>
      {children}
    </Container>
  </Border>
);

const Container = styled.button<any>`
  padding: 19px 30px;
  font-family: FFMark;
  font-size: 14px;
  text-transform: uppercase;
  transition: all 0.3s;
  margin: 6px;
  border: none;
  letter-spacing: 0.05em;
  min-width: 274px;
  cursor: pointer;

  &:hover {
    background: ${Colors.bgDark};
  }

  &:focus {
    outline: none;
  }

  ${({ secondary }) =>
    secondary
      ? css`
          background: ${Colors.bgLight};
          color: ${Colors.bgDark};

          &:hover {
            background: ${Colors.bgDark};
            color: ${Colors.textLight};
          }
        `
      : css`
          background: ${Colors.primary};
          color: ${Colors.textLight};
        `}

  ${({ disabled }) =>
    disabled &&
    css`
      background: transparent;
      color: ${Colors.textDark};
      pointer-events: none;
    `}
`;

const Border = styled.div`
  border: 1px solid ${Colors.borderLight};
`;

export default Button;
