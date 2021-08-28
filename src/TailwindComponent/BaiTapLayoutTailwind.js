import React from 'react'
import Card from './Card'

export default function BaiTapLayoutTailwind() {
    return (
        <div className="container">
            <h1 className="text-green-400 text-center text-5xl">Welcome to the cybersoft frontend with tailwindcss</h1>
            <div className="grid grid-cols-3 gap-4 my-3">
                <div className="text-center">
                    <Card/>
                </div>
                <div className="text-center"><Card/></div>
                <div className="text-center"><Card/></div>
            </div>
        </div>
    )
}
