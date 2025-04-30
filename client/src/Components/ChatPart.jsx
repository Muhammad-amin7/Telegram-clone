import React, { useEffect, useRef, useState } from 'react';
import ChatInput from '../Components/ChatInput';
import { socket } from '../utils/socket.io';
import { useDeleteMessage } from '../hooks/useDeleteMessage';
import { BiMessageX } from 'react-icons/bi';

export default function ChatPart({ data, ChatId, loading, setRefreshTrigger }) {
  const [allMessages, setAllMessages] = useState([]);
  const [showDelete, setShowDelete] = useState(null); // messageId for delete icon
  const [pressTimer, setPressTimer] = useState(null);
  const bottomRef = useRef(null);

  const { deleteMessageId } = useDeleteMessage();

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
    return () => socket.off('new_message', handleNewMessage);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [allMessages]);

  const handleDelete = (id) => {
    deleteMessageId(id);
    setAllMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  const handleMouseDown = (id) => {
    setPressTimer(setTimeout(() => setShowDelete(id), 800)); // 800ms for long press
  };

  const handleMouseUp = () => clearTimeout(pressTimer);

  if (loading) {
    return (
      <main className="mainBG flex-grow bg-tg-bg flex items-center justify-center p-4">
        <p className="text-gray-400">Loading chat...</p>
      </main>
    );
  }

  return (
    <main className="mainBG flex-grow bg-tg-bg flex flex-col items-center justify-between p-4 overflow-hidden">
      {allMessages.length ? (
        <div className="flex flex-col w-full h-[90%] z-10 overflow-y-auto p-4">
          {allMessages.map((msg) => {
            const isOwn = msg.to === ChatId?._id;
            return (
              <div
                key={msg._id}
                className={`relative group flex items-center mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowDelete(msg._id);
                }}
                onMouseDown={() => handleMouseDown(msg._id)}
                onMouseUp={handleMouseUp}
                onTouchStart={() => handleMouseDown(msg._id)}
                onTouchEnd={handleMouseUp}
              >
                <p className={`rounded-xl px-4 py-2 max-w-[700px] ${isOwn ? 'bg-amber-200 text-black' : 'bg-[#212121] text-amber-50'}`}>
                  {msg.text}
                  <span className="text-[10px] ml-2">{new Date(msg.time).toLocaleTimeString()}</span>
                </p>

                {showDelete === msg._id && (
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="absolute -top-0 right-1 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                  >
                    <BiMessageX size={18} />
                  </button>
                )}
              </div>
            );
          })}
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
