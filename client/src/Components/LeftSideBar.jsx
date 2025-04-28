import React, { useEffect, useState } from 'react';
import ChatList from './ChatList';
import ChatPart from './ChatPart';
import { useFindChat } from '../hooks/useFindChat';
import LeftUserSearch from './LeftUserSearch';

export default function LeftSideBar({ sampleChatData }) {
  const [activeChatId, setActiveChatId] = useState(null);
  const { sendID, data, loading, error } = useFindChat();

  const [refreshTrigger, setRefreshTrigger] = useState(false);


  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
  };

  useEffect(() => {
    if (activeChatId) {
      sendID(activeChatId);
    }
  }, [activeChatId, refreshTrigger]);
  

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <aside className="w-full md:w-[370px] flex flex-col bg-tg-secondary-bg bg-neutral-800 backdrop-blur-sm">

        <LeftUserSearch/>

        <ChatList chats={sampleChatData} activeChatId={activeChatId} onChatSelect={handleChatSelect} />
      </aside>

      {/* Right Side */}

      <ChatPart 
        data={data} 
        ChatId={sampleChatData.find(item => item._id === activeChatId)} 
        setRefreshTrigger={setRefreshTrigger}
      />
    </div>
  );
}
