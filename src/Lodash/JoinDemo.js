import React from 'react';
import _ from 'lodash';

export default function JoinDemo() {


    let arr = ['Thong1', 'Thong2', 'Thong3', 'Thong4'];


    let arrPerson = [
        {id: 1, name: 'Thong1'},
        {id: 2, name: 'Thong2'},
        {id: 3, name: 'Thong3'},
    ];

    //es6

    const result = arr.join('-');
    //Lodash

    const resultLodash = _.join(arr, '*');


    const  person = _.find(arrPerson, item => item.id === 1);

    return (
        <div>
            {result}
            <br/>
            {resultLodash}

            <br/>
            Name: {person.name} - id: {person.id}
        </div>
    )
}
