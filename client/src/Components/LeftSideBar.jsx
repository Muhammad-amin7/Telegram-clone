import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatPart from './ChatPart';
import { useFindChat } from '../hooks/useFindChat';

export default function LeftSideBar({ sampleChatData }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const { sendID, data, loading, error } = useFindChat();

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    sendID(chatId);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <aside className="w-full md:w-[370px] flex flex-col bg-tg-secondary-bg bg-neutral-800 backdrop-blur-sm">
        <div className="p-2 flex items-center space-x-2">
          <input type="text" placeholder="Search" className="w-full bg-[rgb(55,55,55)] rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none" />
        </div>
        <ChatList chats={sampleChatData} activeChatId={activeChatId} onChatSelect={handleChatSelect} />
      </aside>

      {/* Right Side */}
      <ChatPart data={data} ChatId={sampleChatData.find(item => item.id === activeChatId)} />
    </div>
  );
}
