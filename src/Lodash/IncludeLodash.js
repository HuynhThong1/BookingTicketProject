import React from 'react'
import _ from 'lodash';


export default function IncludeLodash() {


    const arr = ['1', '2', '3'];


    console.log(_.includes(arr, '1'));


    const obj = {
        id: 1,
        name: 'Nguyen Van A',
        age: 21,
    };

    console.log('Obj', _.includes(obj, 1))


    

    return (
        <div>
            
        </div>
    )
}
