/** @jsxImportSource @emotion/react */
'use client';

import { css } from "@emotion/react";
import LogoutButton from "./LogoutButton";
import useAuth from "@/lib/hooks/useAuth";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const { session: isLogin } = useAuth();

  return (
    <div css={wrapper}>
      <header css={header}>
        <div css={headerContainer}>
          <h1 css={title}>
            <Link href={"/"}>
              <span css={logoIcon}>💬</span>
              <span>Chat App</span>
            </Link>
          </h1>
          {isLogin && <LogoutButton />}
        </div>
      </header>
      <main css={main}>{children}</main>
      <footer css={footer}>
        <div css={footerContent}>
          <p css={footerText}>© {new Date().getFullYear()} Chat App</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;

// css
const wrapper = css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const main = css`
  height: 100%;
  width: 100%;
  padding: 20px;
`;

const header = css`
  background-color: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const headerContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 0 24px;
  height: 70px;
`;

const title = css`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  
  a {
    color: #0084ff;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s;
    
    &:hover {
      color: #0069d9;
    }
  }
`;

const logoIcon = css`
  font-size: 28px;
`;

const footer = css`
  background-color: #212529;
  color: #f8f9fa;
  padding: 24px 0;
`;

const footerContent = css`
  width: min(100%, 1200px);
  margin-inline: auto;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const footerText = css`
  margin: 0;
  font-size: 14px;
  color: #adb5bd;
`;

const footerLinks = css`
  display: flex;
  gap: 24px;
  margin: 0;
`;

const footerLink = css`
  color: #adb5bd;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
  
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;