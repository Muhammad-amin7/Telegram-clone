import React, { useEffect } from 'react';
import ChatInput from '../Components/ChatInput';

export default function ChatPart({ data , ChatId }) {
  const messages = data?.send || [];     

  useEffect(()=>{
    console.log(messages);
    
  }, [messages])

  const hasMessages = messages.length > 0;

  return (
    <main className="mainBG flex-grow bg-tg-bg flex flex-col items-center justify-between p-4 overflow-hidden relative">
      {/* Chat Area */}
      {hasMessages ? (
        <div className="flex flex-col w-full h-[80%] z-10 overflow-y-auto p-4">
          {messages.map((msg) => (
            <div key={msg._id} className="flex items-center relative m-4">
              <svg width="29" height="40" className="h-[20px] w-[10px] absolute left-[-7px] bottom-[-3px]">
                <g fill="none" fillRule="evenodd">
                  <path d="M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z" fill="#000" />
                </g>
              </svg>
              <span className="bg-black text-amber-50 rounded-xl px-4 py-2 max-w-[700px]">{msg.text}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center text-gray-400 bg-[rgba(200,200,200,0.01)] backdrop-blur-sm px-20 py-10 rounded-2xl w-full h-full">
          <p className="mt-2">Select a chat to start messaging</p>
          <p className="text-sm mt-1">Or use the search bar to find people, groups, or channels.</p>
          <p className="text-sm mt-4 text-tg-accent">Built with React & Tailwind CSS</p>
        </div>
      )}

      {/* Chat Input (always at bottom) */}
      <ChatInput id={ChatId?.id} />
    </main>
  );
}
