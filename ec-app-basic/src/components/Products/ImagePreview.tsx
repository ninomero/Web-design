import React from 'react'

const ImagePreview = (props) => {
  return (
    <div className='p-media__thumb' onClick={() => props.delete(props.id)}>
        <img alt='プレビュー画像' src={props.path}></img>
    </div>
  )
}

export default ImagePreview