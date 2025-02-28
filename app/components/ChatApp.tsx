/** @jsxImportSource @emotion/react */
'use client';

import { css } from "@emotion/react";
import { Database } from "@/lib/types/supabase";
import { TABLE_NAME, addSupabaseData, fetchDatabase } from "@/lib/supabaseFunctions";
import { useEffect, useState, useRef } from "react";
import supabase from "@/lib/supabase";
import Image from "next/image";
import useAuth from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { dateToString } from "@/lib/utils/dateToString";

const ChatApp = () => {
  const [inputText, setInputText] = useState(""); 
  const [messageText, setMessageText] = useState<Database[]>([]);
  const { session: isLogin, profileFromGithub } = useAuth();
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!isLogin) router.push("/");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchRealtimeData = () => {
    try {
      supabase
        .channel("table_postgres_changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: TABLE_NAME,
          },
          (payload) => {
            if (payload.eventType === "INSERT") {
              const { createdAt, id, message, avatarUrl, nickName } = payload.new;
              setMessageText((messageText) => [...messageText, { createdAt, id, message, avatarUrl, nickName }]);
              setTimeout(scrollToBottom, 100);
            }
          }
        )
        .subscribe();

      return () => supabase.channel("table_postgres_changes").unsubscribe();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const allMessage = await fetchDatabase();
      setMessageText(allMessage as Database[]);
      setTimeout(scrollToBottom, 100);
    })();
    fetchRealtimeData();
  }, []);

  const onChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => 
    setInputText(event.target.value);

  const onSubmitNewMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputText === "") return;
    addSupabaseData({ message: inputText, ...profileFromGithub });
    setInputText("");
  };

  return (
    <div css={wrapper}>
      <div css={chatContainer}>
        {messageText?.map((item) => (
          <div key={item.id} data-my-chat={item.nickName === profileFromGithub.nickName} css={chatWrapper}>
            <div css={chatProfile}>
              <time>{dateToString(item.createdAt, "MM/DD HH:mm")}</time>
              <a href={`https://github.com/${item.nickName}`} target="_blank" rel="noopener noreferrer" css={chatLink}>
                {item.avatarUrl ? (
                  <img src={item.avatarUrl} alt="アイコン" width={50} height={50} />
                ) : (
                  <Image src="/noimage.png" alt="no image" width={50} height={50} />
                )}
                <p>{item.nickName ? item.nickName : "名無し"}</p>
              </a>
            </div>
            <div css={item.nickName === profileFromGithub.nickName ? myChatMessage : chatMessage}>
              <p>{item.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={onSubmitNewMessage} css={formArea}>
        <input
          type="text"
          name="message"
          value={inputText}
          onChange={onChangeInputText}
          placeholder="メッセージを入力..."
          aria-label="新規メッセージを入力"
        />
        <button type="submit" disabled={inputText === ""}>
          送信
        </button>
      </form>
    </div>
  );
};

export default ChatApp;

// =====================
//       CSS part
// =====================

const wrapper = css`
  display: flex;
  flex-direction: column;
  /* 画面の高さいっぱいを使う */
  height: calc(100vh - 175px);
  width: min(100%, 800px);
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  background-color: #f8f9fa;
  box-sizing: border-box;
`;

const chatContainer = css`
  /* 余った部分をすべて使用してスクロール可能に */
  flex: 1;
  overflow-y: auto;

  padding: 20px;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
  }
`;

const chatWrapper = css`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;

  &[data-my-chat="true"] {
    flex-direction: row-reverse;
  }
`;

const chatProfile = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;

  time {
    font-size: 11px;
    color: #6c757d;
    margin-bottom: 4px;
  }
`;

const chatLink = css`
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    display: block;
    border-radius: 50%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    object-fit: cover;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
    }
  }

  p {
    margin: 6px 0 0;
    font-size: 12px;
    font-weight: 500;
    color: #495057;
    text-align: center;
  }
`;

const chatMessage = css`
  background-color: white;
  padding: 14px 18px;
  margin: 0 16px;
  border-radius: 18px;
  max-width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  p {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    color: #212529;
    word-break: break-word;
  }
`;

const myChatMessage = css`
  background-color: #0084ff;
  padding: 14px 18px;
  margin: 0 16px;
  border-radius: 18px 18px 4px 18px;
  max-width: 70%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    padding: 0;
    line-height: 1.5;
    color: white;
    word-break: break-word;
  }
`;

const formArea = css`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background-color: white;
  border-top: 1px solid #e9ecef;
  border-radius: 0 0 12px 12px;
  gap: 10px;

  input {
    flex: 1;
    height: 46px;
    padding: 0 16px;
    border: 1px solid #ced4da;
    border-radius: 24px;
    font-size: 15px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: #86b7fe;
      box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.25);
    }

    &::placeholder {
      color: #adb5bd;
    }
  }

  button {
    height: 46px;
    padding: 0 20px;
    background-color: #0084ff;
    color: white;
    border: none;
    border-radius: 24px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(:disabled) {
      background-color: #0069d9;
    }

    &:disabled {
      background-color: #6c757d;
      opacity: 0.65;
      cursor: not-allowed;
    }
  }
`;
