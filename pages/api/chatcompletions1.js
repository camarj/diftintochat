// const [chatList, setChatList] = ([]);
// ur chat history
export const createCompletion = async (params = {}) => {
  const DEFAULT_PARAMS = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'que es la vitamina d' }],
    // max_tokens: 4096,
    temperature: 0,
    // frequency_penalty: 1.0,
    // stream: true,
  };
  const params_ = { ...DEFAULT_PARAMS, ...params };
  const result = await fetch(`https://api.openai.com/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer ' + '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',
    },
    body: JSON.stringify(params_),
  });
  const stream = result.body;
  const output = await fetchStream(stream);
  const text = output.choices[0].message.content;
  console.log(text);
  return text;
  // setChatList(previousInputs =>
  //   previousInputs.concat(output.choices[0].message)
  // );
};

const fetchStream = async stream => {
  const reader = stream.getReader();
  let charsReceived = 0;

  const li = document.createElement('li');

  // read() returns a promise that resolves
  // when a value has been received
  const result = await reader
    .read()
    .then(function processText({ done, value }) {
      // Result objects contain two properties:
      // done  - true if the stream has already given you all its data.
      // value - some data. Always undefined when done is true.
      if (done) {
        // console.log('Stream complete');
        return li.innerText;
      }
      // value for fetch streams is a Uint8Array
      charsReceived += value.length;
      const chunk = value;
      //   console.log(
      //     `Received ${charsReceived} characters so far. Current chunk = ${chunk}`
      //   );
      li.appendChild(document.createTextNode(chunk));
      return reader.read().then(processText);
    });
  const list = result.split(',');
  const numList = list.map(item => {
    return parseInt(item);
  });
  const text = String.fromCharCode(...numList);
  const response = JSON.parse(text);
  return response;
};
