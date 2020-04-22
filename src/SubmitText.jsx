import React, { useState } from 'react';
import Text from './Text';
import './SubmitText.css'

export default function SubmitText({ someText }) {
  const [text, setText] = useState("");

  const [textList, setTextList] = useState([])
  const changeText = (event) => {
    const textDescrip = event.currentTarget.value;
    setText(textDescrip);

  }
  const createText = (event) => {
    console.log(event.key)
    if (event.key === "Enter") {
      let updatedTextList = [...textList, text]
      setText(''); //CLEAR INPUT FIELD
      setTextList(updatedTextList)
    }
    else if (event.key === undefined) {
      let updatedTextList = [...textList, text]
      setText(''); //CLEAR INPUT FIELD
      setTextList(updatedTextList)
    }

  }
  return (
    <div className="inputTextContainer">
      {
        textList.map((desc, index) => (
          <Text key={index} desc={desc} />
        ))
      }
      <input
        type="text"
        placeholder="Type a text"
        value={text}
        onChange={changeText}
        onKeyPress={createText}
      />
      <button onClick={createText}> Add Text</button>
    </div>
  );
}

// export default App;
