import React from 'react';
import ChatInput from '../Components/ChatInput';

const ChatPlaceholderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
  </svg>
);

export default function ChatPart({ data }) {
  const hasMessages = data?.send?.length > 0;
  console.log(data);


  return (
    <main className="flex-grow bg-tg-bg flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <ChatInput id={data?.id} />
      {hasMessages ? (
        <div className="flex flex-col w-full h-full bg-neutral-600 overflow-y-auto p-4">
          {data.send.map((msg) => (
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
        <div className="text-center text-gray-400">
          <ChatPlaceholderIcon />
          <p className="mt-2">Select a chat to start messaging</p>
          <p className="text-sm mt-1">Or use the search bar to find people, groups, or channels.</p>
          <p className="text-sm mt-4 text-tg-accent">Built with React & Tailwind CSS</p>
        </div>
      )}
    </main>
  );
}
