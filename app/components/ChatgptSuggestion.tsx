'use client'

import React, { useState } from 'react'
import loader from "../assets/loader.svg"
import Image from 'next/image'

const ChatgptSuggestion = () => {
  const [article, setArticle] = useState({
    summary: '',
    link: ''
  })
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(false)
  return (
       <div className='my-10 max-w-full flex justify-center items-center'>
       {isFetching ? (
         <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
       ) : error ? (
         <p className='font-inter font-bold text-black text-center'>
           Well, that wasn't supposed to happen...
           <br />
           <span className='font-satoshi font-normal text-gray-700'>
             {error}
           </span>
         </p>
       ) : (
         <>
         <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
           AI <span className='blue_gradient'>Recipe Suggestion</span>
         </h2>
         </>
       )}
     </div>
  )
}

export default ChatgptSuggestion
