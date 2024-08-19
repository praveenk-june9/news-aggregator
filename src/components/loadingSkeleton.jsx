import React from 'react'

function LoadingSkeleton() {
    return (
        <div className='skeletonContainer'>
            {Array(10).fill().map((_, index) => (
                <div key={index} className='skeleton'></div>
            ))}
        </div>
    )
}

export default LoadingSkeleton