export default function Num(props) {
  const { holdNum, className, value } = props
  console.log(props)
  return (
    <div onClick={holdNum} className={`die-face ${className}`}>
      <h2 className="die-num ">{value}</h2>
    </div>
  )
}
