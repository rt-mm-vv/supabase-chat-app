/** @jsxImportSource @emotion/react */
'use client';

import { css } from "@emotion/react";
import useAuth from "@/lib/hooks/useAuth";

const LogoutButton = () => {
  const { signOut } = useAuth();
  return (
    <button onClick={signOut} css={button}>
      <span css={buttonIcon}>👋</span>
      <span>ログアウト</span>
    </button>
  );
};

export default LogoutButton;

// css
const button = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background-color: #f1f3f5;
  color: #495057;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9ecef;
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const buttonIcon = css`
  font-size: 16px;
`;