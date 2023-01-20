import React from 'react'

function Alert(props) {
  const capitalize = (word) => {
    const lower = word.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }

  // console.log(`alert alert-${props?.alrt?.type}`);
  // console.log(props?.alrt,'dfghjk');
  return (
    <div style={{ height: '50px' }}>
      {props.alrt && (
        <div
          className={`alert alert-${props.alrt.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alrt.type)}</strong>: {props.alrt.msg}
        </div>
      )}
    </div>
  )
}

export default Alert
