const FailureView = props => {
  const {failurePage} = props

  const onClickingTryAgainButton = () => failurePage()
  return (
    <div>
      <img
        src="https://res.cloudinary.com/dojn2omox/image/upload/v1701685821/ajbhizawkpwpo1aw7pnx.png"
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={onClickingTryAgainButton}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
