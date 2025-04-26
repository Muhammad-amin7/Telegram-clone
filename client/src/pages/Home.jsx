import React from 'react'
import LeftSideBar from '../Components/LeftSideBar';

export default function Home() {
  
  const sampleChatData = [
    { id: 11, name: 'Telegram', message: 'Web A Digest: Many new features...', time: '14:02', unreadCount: 1 },
    { id: 22, name: 'Frontend Group', message: "Let's discuss UI comp...", time: '08:15', unreadCount: 0 },
    { id: 33, name: 'Alice', message: 'See you tomorrow!', time: 'Yesterday', unreadCount: 0 },
    { id: 44, name: 'Project X', message: 'Meeting notes attached', time: 'Mon', unreadCount: 3 },
  ];

  return (
    <div>
      <LeftSideBar sampleChatData={sampleChatData}/>
    </div>
  )
}
