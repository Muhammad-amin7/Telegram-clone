import React, { useEffect, useRef, useState } from 'react';
import ChatInput from '../Components/ChatInput';
import { socket } from '../utils/socket.io';

export default function ChatPart({ data, ChatId, loading, setRefreshTrigger }) {
  const [allMessages, setAllMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (data) {
      const combined = [...(data.send || []), ...(data.receiver || [])]
        .sort((a, b) => new Date(a.time) - new Date(b.time));
      setAllMessages(combined);
    }
  }, [data]);
  

  useEffect(() => {
    if (data) {
      const combined = [...(data.send || []), ...(data.receiver || [])]
        .sort((a, b) => new Date(a.time) - new Date(b.time));
      setAllMessages(combined);
    }
  }, [data]);

  useEffect(() => {
    const handleNewMessage = (msg) => setAllMessages((prev) => [...prev, msg]);
    socket.on('new_message', handleNewMessage);

    return () => {
      socket.off('new_message', handleNewMessage);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  if (loading) {
    return (
      <main className="mainBG flex-grow bg-tg-bg flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <p className="text-gray-400">Loading chat...</p>
      </main>
    );
  }

  return (
    <main className="mainBG flex-grow bg-tg-bg flex flex-col items-center justify-between p-4 overflow-hidden relative">
      {allMessages.length ? (
        <div className="flex flex-col w-full h-[90%] z-10 overflow-y-auto p-4">
          {allMessages.map((msg) => (
            <div key={msg._id} className={`flex items-center mt-1 ${msg?.to === ChatId?._id ? 'justify-end' : 'justify-start'}`}>
              <p className={`rounded-xl px-4 py-2 max-w-[700px] ${msg?.to === ChatId?._id ? 'bg-amber-200 text-black' : 'bg-[#212121] text-amber-50'}`}>
                {msg.text} <span className="text-[10px]">{new Date(msg.time).toLocaleTimeString()}</span>
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center text-center text-gray-400 bg-[rgba(200,200,200,0.01)] backdrop-blur-sm px-20 py-10 rounded-2xl w-full h-full">
          <p className="mt-2">Select a chat to start messaging</p>
          <p className="text-sm mt-1">Or use the search bar to find people, groups, or channels.</p>
          <p className="text-sm mt-4 text-tg-accent">Built with React & Tailwind CSS</p>
        </div>
      )}
      <ChatInput id={ChatId?._id} setRefreshTrigger={setRefreshTrigger} />
    </main>
  );
}
