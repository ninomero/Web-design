import React from 'react'

const TextDetail = ({ label, value }) => {
    return (
        <div className='text__display'>
            <div>
                {label}
            </div>
            <div>
                {value}
            </div>
        </div>
    )
}

export default TextDetail