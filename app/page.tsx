/** @jsxImportSource @emotion/react */
'use client';

import { css } from "@emotion/react";
import AppLayout from "@/app/components/AppLayout";
import ChatApp from "@/app/components/ChatApp";
import useAuth from "@/lib/hooks/useAuth";
import SignInGithub from "@/app/components/SignInGithub";

export default function Home() {
  const { session: isLogin } = useAuth();

  // ログインしている場合のみチャットページを表示
  return isLogin ? (
    <AppLayout>
      <ChatApp />
    </AppLayout>
  ) : (
    <AppLayout>
      <h2 css={title}>Githubでサインイン</h2>
      <SignInGithub />
    </AppLayout>
  );
}

// css
const title = css`
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 20px;
  color: #212529;
  font-size: 28px;
  border-bottom: 1px solid #dee2e6;
`;