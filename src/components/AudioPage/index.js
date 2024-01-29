const AudioPage = props => {
  const {eachA} = props
  const {englishName} = eachA
  return (
    <li>
      <p>{englishName}</p>
    </li>
  )
}

export default AudioPage
