import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import ChatList from '../Components/ChatList';
// --- Icons ---
const HamburgerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);


export default function LeftSideBar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeChatId, setActiveChatId] = useState(null);
    const [chats] = useState(sampleChatData);

    const menuButtonRef = useRef(null);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleChatSelect = (chatId) => {
        console.log("Selected chat ID:", chatId);
        setActiveChatId(chatId);
    };

    const activeChat = chats.find(chat => chat.id === activeChatId);
    console.log(activeChat);

    return (
        <div className="flex h-screen bg-neutral-800">

            {/* Left Sidebar */}
            <aside className="w-full md:w-[320px] flex flex-col bg-tg-secondary-bg flex-shrink-0 border-r border-gray-700">
                <div className="p-2 flex items-center space-x-2 flex-shrink-0">
                    <button
                        ref={menuButtonRef}
                        onClick={toggleMenu}
                        className="p-2 rounded-full bg-tg-secondary-bg text-gray-300 hover:text-white hover:bg-tg-hover-bg focus:outline-none focus:ring-1 focus:ring-tg-accent"
                        aria-label="Open menu"
                        aria-expanded={isMenuOpen}
                        aria-controls="sidebar-menu-content"
                    >
                        <HamburgerIcon />
                    </button>
                    <input type="text" placeholder="Search" className="w-full bg-[rgb(55,55,55)] rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-tg-accent" />
                </div>
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        id="sidebar-menu-content"
                        className="absolute top-14 left-2 w-60 bg-neutral-800 rounded-lg shadow-xl p-2 z-20 border border-gray-700"
                    >
                        <Link to="/new-group" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">New Group</Link>
                        <Link to="/contacts" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Contacts</Link>
                        <Link to="/calls" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Calls</Link>
                        <Link to="/settings" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Settings</Link>
                        <Link to="/night-mode" className="block px-3 py-2 rounded bg-neutral-400 hover:bg-tg-hover-bg text-sm text-tg-accent">Night Mode</Link>
                        <hr className="border-gray-400 my-1" />
                        <Link to="/features" className="block px-3 py-2 rounded hover:bg-tg-hover-bg text-sm text-white">Telegram Features</Link>
                    </div>
                )}

                <div className="flex-grow overflow-y-auto overflow-x-hidden">
                    <ChatList
                        chats={chats}
                        activeChatId={activeChatId}
                        onChatSelect={handleChatSelect}
                    />
                </div>
            </aside>


        </div>
    );
}
