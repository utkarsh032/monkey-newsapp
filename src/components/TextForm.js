// import { clear } from "@testing-library/user-event/dist/clear";
import React, { useState } from 'react'

// console.log(useState("Enter text here"));

export default function TextForm(props) {
  const handleUpClick = () => {
    // console.log("Uppercase was clicked " + text);
    let newText = text.toUpperCase()
    setText(newText)
    props.showAlert('Converted to uppercase!', ' success')
  }

  const handleLoClick = () => {
    // console.log("Lowercase was clicked " + text);
    let newText = text.toLowerCase()
    setText(newText)
    props.showAlert('Converted to lowercase!', ' success')
  }

  const handleClearClick = () => {
    // console.log("Lowercase was clicked " + text);
    let newText = ''
    setText(newText)
    props.showAlert('Text Cleared!', ' success')
  }

  const handleCopyClick = () => {
    var text = document.getElementById('myBox')
    // text.select();
    navigator.clipboard.writeText(text.value)
    // document.getSelection().removeAllRanges();
    props.showAlert('Text Copied!', ' success')
  }

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/)
    setText(newText.join(' '))
    props.showAlert('Extra Space Removed', ' success')
  }

  const handleOnChange = (event) => {
    // console.log("OnChange was clicked");
    setText(event.target.value)
  }

  const [text, setText] = useState('')
  // text = "new text"; // wrong way to change the state
  // setText = ("new text"); // correct way to change the state
  console.log(props.mode, 'props.mode')
  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === 'dark' ? 'white' : 'black',
        }}
      >
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              background: props.mode === 'dark' ? '#103756' : 'white',
              color: props.mode === 'dark' ? 'white' : 'black',
              // background: "yellow",
            }}
            id="myBox"
            rows="10"
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpClick}
        >
          UpperCase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLoClick}
        >
          LowerCase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopyClick}
        >
          Copy
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaces}
        >
          Remove Space
        </button>
      </div>

      <div
        className="container my-3"
        style={{
          color: props.mode === 'dark' ? 'white' : 'black',
        }}
      >
        <h2>Your Text Summary</h2>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0
            }).length
          }{' '}
          words and {text.length} characters
        </p>
        <p>
          {0.08 *
            text.split(' ').filter((element) => {
              return element.length !== 0
            }).length}{' '}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : 'Enter Your Text To Preview'}</p>
      </div>
    </>
  )
}
