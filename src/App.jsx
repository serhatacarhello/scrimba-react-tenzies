import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import WinConfetti from './components/Confetti'
import Num from './components/Num'

export default function App() {
  const [numArr, setNumArr] = useState(allNewNum())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = numArr.every((num) => num.isHeld === true)
    const firstValue = numArr[0]?.value
    const allSameValue = numArr.every((num) => num.value === firstValue)
    if (allHeld && allSameValue) setTenzies(true)
  }, [numArr])

  function generateNewNum() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }

  function allNewNum() {
    let newNumArr = []
    for (let index = 0; index < 10; index++) {
      newNumArr.push(generateNewNum())
    }
    return newNumArr
  }

  function rollNum() {
    if (!tenzies) {
      setNumArr((prev) =>
        prev.map((item) => (item.isHeld ? item : generateNewNum()))
      )
    } else {
      setNumArr(allNewNum())
      setTenzies(false)
    }
  }

  const holdNum = (id) => {
    console.log(id)
    const holdArr = numArr.map((num) =>
      num.id === id ? { ...num, isHeld: !num.isHeld } : num
    )
    setNumArr(holdArr)
  }
  const numElements = numArr.map((num) => (
    <Num
      className={num.isHeld ? 'isHeld' : ''}
      key={num.id}
      value={num.value}
      holdNum={() => holdNum(num.id)}
    />
  ))

  // console.log('numElements', numElements)
  // console.log('numArr', numArr)
  return (
    <>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{numElements}</div>

        <button className="roll-num" onClick={rollNum}>
          {tenzies ? 'New Game ' : 'Roll'}
        </button>
      </main>
      {tenzies && <WinConfetti />}
    </>
  )
}
