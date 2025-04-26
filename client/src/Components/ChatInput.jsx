import React, { useEffect } from 'react'
import { useSendChat } from '../hooks/useSendChat';
import { useFindChat } from '../hooks/useFindChat';

export default function ChatInput({ id }) {

      const { sendChat, data, loading, error } = useSendChat()
      const { sendID } = useFindChat()
      useEffect(() => {
            if (id) sendID(id)
      }, [id])
      console.log(id + " " + "<-id");


      const handleSend = (e) => {
            e.preventDefault()
            const text = {}
            text.text = new FormData(e.target).get("message")
            text.time = new Date()
            sendChat(text, id)
            console.log(error)
      }

      return (
            <section className='absolute bottom-0 left-0 w-[100%] flex items-center justify-between '>
                  <form onSubmit={handleSend} className="relative w-[100%]">
                        <input name='message' type="text" className='rounded-2xl px-2.5 py-1 w-[100%] outline-black bg-zinc-900' />
                        <button className='absolute top-1/2 transform -translate-y-1/2 right-4'>Send</button>
                  </form>
            </section>
      )
}     
