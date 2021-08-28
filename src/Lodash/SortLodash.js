import React from 'react'
import _ from 'lodash';

export default function SortLodash() {

    const user = [
        {id: 5,name: 'Fred', age: 48},
        {id: 3,name: 'Bruno', age: 37},
        {id: 7,name: 'Bruno', age: 39},
        {id: 8,name: 'Bruno', age: 35},
        {id: 2,name: 'Marcus', age: 40},
        {id: 4,name: 'Dean', age: 30},
    ]

    const resultSortByAge = _.sortBy(user, [item=> item.age]);

    console.log('resultSortByAge', resultSortByAge);


    const result  = _.sortBy(user, ['name', 'age']);

    console.log('result', result);


    return (
        <div>
            
        </div>
    )
}
