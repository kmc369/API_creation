import React, {useState} from 'react'

export const Tooltip = ({text, children}) => {
    const [isVisable, setVisable] = useState(false)
  return (
    <div className='tooltip-container' onMouseEnter={()=>setVisable(true)}
    onMouseLeave={()=>setVisable(false)}>
        {children}

    {isVisable && <div className='tooltip'>{text}</div>}
    </div>
  )
}
