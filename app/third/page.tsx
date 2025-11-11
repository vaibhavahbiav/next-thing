"use client"
import React, { useState } from 'react'

const ThirdPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [clicked, setClicked] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "message":
        setMessage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const thirdThing = { name, email, message };

    try {
      const response = await fetch("api/postThird", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(thirdThing),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <div className='flex flex-col space-y-18 pt-10 mx-52'>
      <h1 className='text-4xl uppercase text-cyan-950 font-medium tracking-widest text-left border-l-8 pl-5 border-teal-600 leading-loose'>send us a greeting?</h1>
      <div className='border-l-2 border-r-2 border-teal-800 py-10'>
        <form className='flex items-center justify-center space-x-9' autoComplete='off' onSubmit={handleSubmit}>
          <div className='flex-col flex space-y-7 ml-9 w-1/3'>
            <div className='relative tracking-widest bg-cyan-800 w-full after:absolute after:top-0 after:right-0 after:content-[""] after:size-8 after:z-10 after:bg-teal-600 after:border-b-4 after:border-l-4 after:border-teal-100 shadow-lg shadow-teal-300'>
              <input className='bg-teal-200 border-l-8 border-teal-200 focus:border-l-8 focus:border-cyan-950 focus:outline-0 w-full text-teal-950 px-5 pt-10 pb-3 transition-all' name='name' id='name' type="text" value={name} onChange={handleChange} />
              <label className='text-center flex justify-center items-center uppercase py-1 text-teal-200 text-xl font-thin' htmlFor="name">name</label>

            </div>
            <div className='relative tracking-widest bg-cyan-800 w-full after:absolute after:top-0 after:right-0 after:content-[""] after:size-8 after:z-10 after:bg-teal-600 after:border-b-4 after:border-l-4 after:border-teal-100 shadow-lg shadow-teal-300'>
              <input className='bg-teal-200 border-l-8 border-teal-200 focus:border-l-8 focus:border-cyan-950 focus:outline-0 w-full text-teal-950 px-5 pt-10 pb-3 transition-all' name='email' id='email' type="text" value={email} onChange={handleChange} />
              <label className='text-center flex justify-center items-center uppercase py-1 text-teal-200 text-xl font-thin' htmlFor="email">email</label>
            </div>
            <div className='relative tracking-widest bg-cyan-800 w-full after:absolute after:top-0 after:right-0 after:content-[""] after:size-8 after:z-10 after:bg-teal-600 after:border-b-4 after:border-l-4 after:border-teal-100 shadow-lg shadow-teal-300'>
              <textarea className='bg-teal-200 border-l-8 border-teal-200 focus:border-l-8 focus:border-cyan-950 focus:outline-0 w-full text-teal-950 px-5 pt-10 pb-3 h-[200px] transition-all' name='message' id='message' value={message} onChange={handleChange} />
              <label className='text-center flex justify-center items-center uppercase py-1 text-teal-200 text-xl font-thin' htmlFor="message">message</label>
            </div>
          </div>
          <button className={`bg-teal-200 pt-9 text-cyan-200 tracking-widest font-thin text-lg uppercase cursor-pointer hover:bg-cyan-800 transition-all relative after:absolute after:top-0 after:right-0 after:content-[""] after:size-6 after:z-10 after:bg-teal-600 after:border-b-4 after:border-l-4 after:border-teal-100 ${clicked ? 'after:block' : 'after:hidden'}`} type='submit'onClick={handleClick} ><span className='bg-cyan-800 px-3 py-1'>send message</span></button>
        </form>
      </div>
    </div>
  )
}

export default ThirdPage
