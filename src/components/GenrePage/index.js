const GenrePage = props => {
  const {eachG} = props
  const {name} = eachG
  return (
    <li>
      <p>{name}</p>
    </li>
  )
}

export default GenrePage
