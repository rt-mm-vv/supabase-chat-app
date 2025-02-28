/** @jsxImportSource @emotion/react */
'use client';

import { css } from "@emotion/react";
import useAuth from "@/lib/hooks/useAuth";
import Image from "next/image";

const SignInGithub = () => {
  const { signInWithGithub, error } = useAuth();

  return (
    <div css={wrapper}>
      <button css={signInButton} onClick={signInWithGithub}>
        <Image src="/github.svg" alt="Github" width={24} height={24} />
        <span>Githubでサインインする</span>
      </button>
      {error && <p css={errorMessage}>{error}</p>}
    </div>
  );
};

export default SignInGithub;

const wrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 60px;
`;

const signInButton = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background-color: #24292e;
  width: 250px;
  height: 48px;
  color: #fff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #1a1e22;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const errorMessage = css`
  margin-top: 16px;
  color: #e03131;
  font-size: 14px;
`;