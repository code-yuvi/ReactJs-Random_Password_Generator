import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState("")

  // Ref hook
  const passwordRef = useRef(null)



  const passwordGenerator = useCallback(() => {
    let pass = "";
    let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numAllow) {
      char += "0123456789"
    }
    if (charAllow) {
      char += "!@#$%^&*()_+"
    }

    for (let i = 1; i <= length; i++) {
      // pass += char.charAt(Math.floor(Math.random() * char.length))
      let ch = Math.floor(Math.random() * char.length + 1)
      pass += char.charAt(ch)
    }
    setPassword(pass);

  }, [length, numAllow, charAllow, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current.select()
    // passwordRef.current.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password);
  }, [password])



  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className="text-white text-4xl text-center my-3">Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='Password' readOnly ref={passwordRef} />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllow} id='numberInput' onChange={() => { setNumAllow((prev) => !prev) }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllow} id="characterInput" onChange={() => { setCharAllow((prev) => !prev) }} />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
