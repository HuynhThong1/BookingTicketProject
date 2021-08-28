import React from 'react';
import _ from 'lodash';

export default function FillLodash() {


    const arr = [
        {id: 1, name: 'Iphone'},
        {id: 2, name: 'Iphone X'},
        {id: 3, name: 'Iphone XS'},
        {id: 4, name: 'Iphone XS Max'},
        {id: 5, name: 'Iphone 11 '},
        {id: 6, name: 'Iphone 11 Pro'},
    ]

    _.fill(arr, {id: 5, name: 'Samsumg Galaxy note 10 plus'}, 1, 5);


    console.log(arr);



    return (
        <div>
            
        </div>
    )
}
