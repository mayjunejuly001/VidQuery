import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`https://localhost:3000/${endpoint}`, { question: question });
    setAnswer(response.data.answer);
  };

  return (
 <div className='bg-[url(/public/gpt.jpg)] bg-no-repeat bg-cover h-screen'>
    <div className=" container justify-center backdrop-blur-lg  pt-4 font-poppins text-center ">
      <h1 className='text-2xl font-bold text-violet-400'>Ask your question</h1>
      <form className='mt-4' onSubmit={handleSubmit}>
        <label className=' font-bold font-poppins text-violet-400'>
          Question:
          <input className=' m-4 p-2 border border-gray-400 text-slate-800 rounded w-64' type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
        </label>
        <button className='p-2 bg-violet-500 text-white rounded mt-2' type="submit">Submit</button>
      </form>
      <div className=' mt-4 flex justify-center'>
        <strong className='font-bold font-poppins text-violet-400'>Answer:</strong> {answer}
      </div>
    </div>
  </div>
  );
}

export default App;
