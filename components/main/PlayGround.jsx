import styles from '../../styles/Home.module.css';

import { createCompletion } from '../../pages/api/chatcompletions';
import { useState } from 'react';
import { useRef } from 'react';

export const PlayGround = () => {
  const ref = useRef(null);

  const arryMsgs = [];

  const [result, setResult] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isPrompt, setIsPrompt] = useState(false);
  const [historyMsg, setHistoryMsg] = useState(arryMsgs);

  console.log(historyMsg);

  const completion = async () => {
    ref.current.value = '';
    setIsPrompt(true);
    setResult('');
    const response = await createCompletion(prompt);
    setResult(response);
    setHistoryMsg([
      ...historyMsg,
      {
        userMsg: prompt,
        AiMsg: response,
      },
    ]);
    setIsPrompt(false);
  };

  const handleChange = event => {
    setPrompt(event.target.value);
  };

  return (
    <div className="mx-auto w-5/6 h-screen">
      <div className={styles.playgroundcontainer}>
        {
          historyMsg.length > 0
            ? historyMsg.map(msg => (
                <div
                  id={msg.AiMsg}
                  className=" flex flex-row-reverse  bg-gray-100  h-full rounded-lg border-gray-200 py-4 px-6  text-sm shadow-sm">
                  <div className="w-2/4 pl-2">
                    <div className="flex justify-start bg-cyan-100 p-2 rounded-t-lg">
                      <p className="text-2xl">Raúl</p>
                    </div>
                    <div className="bg-white p-2 rounded-b-lg">
                      <p>{msg.userMsg}</p>
                    </div>
                  </div>

                  <div className="w-2/4 mt-20 pr-2 ">
                    <div className="flex bg-fuchsia-100 p-2 rounded-t-lg">
                      <p className="text-2xl">Chat Diftinto</p>
                    </div>
                    <div className="bg-white p-2 rounded-b-lg">
                      <p>{msg.AiMsg}</p>
                    </div>
                  </div>
                </div>
              ))
            : ''
          // <div className="flex bg-gray-50   h-full rounded-lg border-gray-200 py-4 px-6  text-sm shadow-sm">
          //   <div className="flex flex-row bg-white p-2">
          //     <p>Escribiendo &nbsp; </p>
          //     <img src="/loading.gif" alt="..." width="20" />
          //   </div>
          // </div>
        }
        {isPrompt ? (
          <div className=" flex flex-row-reverse  bg-gray-100  h-full rounded-lg border-gray-200 py-4 px-6  text-sm shadow-sm">
            <div className="w-2/4 pl-2">
              <div className="flex justify-start bg-cyan-100 p-2 rounded-t-lg">
                <p className="text-2xl">Raúl</p>
              </div>
              <div className="bg-white p-2">
                <p>{prompt}</p>
              </div>
            </div>
            <div className="w-2/4 mt-20 pr-2">
              <div className="flex bg-fuchsia-100 p-2 rounded-t-lg">
                <p className="text-2xl">Chat Diftinto</p>
              </div>
              {result.length > 0 ? (
                <>
                  <div className="bg-white p-2 rounded-b-lg">
                    <p>{result}</p>
                  </div>
                </>
              ) : (
                <div className="flex flex-row bg-white p-2 rounded-b-lg">
                  <p>Escribiendo &nbsp; </p>
                  <img src="/loading.gif" alt="..." width="20" />
                </div>
              )}
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
      <div>
        <div className="relative">
          <textarea
            id="prompt"
            ref={ref}
            name="prompt"
            className=" bg-gray-100 w-full rounded-lg border-gray-200 my-6 p-4 pr-12 text-sm shadow-sm"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          onClick={() => completion()}>
          Enviar
        </button>
      </div>
    </div>
  );
};
