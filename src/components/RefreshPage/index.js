import {IoIosAlert} from 'react-icons/io'

const RefreshPage = props => {
  const {reload} = props
  const onClickingRefresh = () => reload()
  return (
    <div>
      <IoIosAlert size="20" color="red" />
      <p>Something went wrong. Please try Again</p>
      <button type="button" onClick={onClickingRefresh}>
        Try Again
      </button>
    </div>
  )
}

export default RefreshPage
