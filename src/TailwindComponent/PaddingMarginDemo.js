import React from 'react'

export default function PaddingMarginDemo() {
    return (
        <div className="container">
            <button className="bg-red-200 pl-5 py-5" style={{width: 'auto', marginTop: 15}}>
                button padding 
            </button>

            <br/>
            <button className="bg-purple-200 mx-10" style={{width: 'auto', marginTop: 15}}>
                button margin  
            </button>
        </div>
    )
}
