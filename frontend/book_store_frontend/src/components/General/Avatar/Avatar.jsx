import React from 'react'
import default_avatar from '../../../assets/no-profile-picture.svg'

const Avatar = ({className, src, alt}) => {
  return (
    <div>
      {src ? (
        <img className={className} src={src} alt={alt}/>
      ) : (
        <img className={className}
             src={default_avatar} 
             alt={alt}/>
      )}
    </div>
  )
}

export default Avatar
