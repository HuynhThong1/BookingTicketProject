import React from 'react';
import _ from 'lodash';

export default function UniLodash() {


    const arr = [1, 2, 2, 2 ,4, 5, 6]   
    console.log(_.uniq(arr));


    const obj = [
        {id: 1, name: 'IphoneX', price: 1000},
        {id: 2, name: 'IphoneXs', price: 1000},
        {id: 3, name: 'IphoneXs Max', price: 1000},
        {id: 4, name: 'Iphone 11', price: 1000},
        {id: 4, name: 'Iphone 11', price: 1000},
        {id: 4, name: 'Iphone 11', price: 1000},
        {id: 4, name: 'Iphone 11', price: 1000},
        {id: 4, name: 'Iphone 11', price: 1000},
        {id: 5, name: 'Iphone 11 Pro ', price: 1000},
        {id: 6, name: 'Iphone 11 Pro Max', price: 1000},
    ]

    console.log(_.uniqBy(obj, 'id'))



    return (
        <div>
            123
        </div>
    )
}
