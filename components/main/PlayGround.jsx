import styles from '../../styles/Home.module.css';
import { Configuration, OpenAIApi } from 'openai';
// import { createCompletion } from '../../pages/api/chatcompletions';
import { useState } from 'react';
import { useRef } from 'react';

export const PlayGround = () => {
  const ref = useRef(null);
  const [result, setResult] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isPrompt, setIsPrompt] = useState(false);

  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  const createCompletion = async () => {
    ref.current.value = '';
    setIsPrompt(true);
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });
    console.log(response.data.choices[0].message.content);
    setResult(response.data.choices[0].message.content);
  };

  const handleChange = event => {
    setPrompt(event.target.value);
  };

  return (
    <div className="mx-auto w-5/6 h-screen">
      <div className={styles.playgroundcontainer}>
        <div className=" flex flex-row-reverse bg-gray-50  h-full rounded-lg border-gray-200  p-12 text-sm shadow-sm">
          {isPrompt ? (
            <>
              <div className="w-2/4 pl-2">
                <div className="flex justify-start bg-cyan-100 p-2">
                  <p className="text-2xl">Raúl</p>
                </div>
                <div className="bg-white p-2">
                  <p>{prompt}</p>
                </div>
              </div>
              <div className="w-2/4 mt-20 pr-2">
                <div className="flex bg-fuchsia-100 p-2">
                  <p className="text-2xl">Chat Diftinto</p>
                </div>
                {result.length > 0 ? (
                  <>
                    <div className="bg-white p-2">
                      <p>{result}</p>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row bg-white p-2">
                    <p>Escribiendo &nbsp; </p>
                    <img src="/loading.gif" alt="..." width="20" />
                  </div>
                )}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div>
        <div className="relative">
          <textarea
            id="prompt"
            ref={ref}
            name="prompt"
            className=" bg-gray-50 w-full rounded-lg border-gray-200 my-6 p-4 pr-12 text-sm shadow-sm"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          onClick={() => createCompletion()}>
          Enviar
        </button>
      </div>
    </div>
  );
};
