import React from 'react'

export default function BaiTap2() {
    return (
        <div className="container">
            <div className="flex justify-between items-end mt-20">
                <div className="h-1/2">
                    <div>
                        <p>Entire house</p>
                        <h1 className="font-bold text-3xl">Beach House in Collingwood</h1>

                        <p className="mt-2"><i className="fas fa-star"></i> 4.94(120) - Collingwood, Ontario</p>
                    </div>  

                    <div className="mt-20">
                        <div><img className="w-7 h-7 rounded-full inline-block mr-2" src="https://picsum.photos/id/15/200/200" alt="..."/>
                        Hosted by Kevin Francis
                        </div>
                        <p className="ml-7 mt-3 font-bold">Check availability</p>
                    </div>
                </div>

                <div className="grid grid-rows-2 grid-flow-col gap-4 h-1/2">
                    <div className="row-span-2 h-full">
                        <img className="rounded-lg h-full" src="https://picsum.photos/id/16/200/200" alt="..."/>
                    </div>
                    <div className="col-span-2">
                        <img className="rounded-lg " src="https://picsum.photos/id/17/200/200" alt="..."/>   
                    </div>
                    <div className="col-span-2">
                        <img className="rounded-lg " src="https://picsum.photos/id/18/200/200" alt="..."/>   
                    </div>
                </div>
            </div>
        </div>
    )
}
