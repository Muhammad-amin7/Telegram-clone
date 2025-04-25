import React from 'react'
import { BsSend } from "react-icons/bs";
import { useSendChat } from '../hooks/useSendChat';

export default function ChatInput() {

      const { sendChat, data, loading, error } = useSendChat()

      const handleSend = (e) => {
            e.preventDefault()
            const text = new FormData(e.target).get("message")
            sendChat(text)
      }

      return (
            <section className='absolute bottom-0 left-0 w-[100%] flex items-center justify-between '>
                  <form onSubmit={handleSend} className="relative w-[100%]">
                        <input name='message' type="text" className='rounded-2xl px-2.5 py-1 w-[100%] outline-black bg-zinc-900' />
                        <button className='absolute top-1/2 transform -translate-y-1/2 right-4'><BsSend /></button>
                  </form>
            </section>
      )
}     
