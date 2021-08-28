import React from 'react';
import _ from 'lodash';


export default function LastFirstLodash() {


    const arrSStudent = [
        { id:1, name: 'Student1'},
        { id:2, name: 'Student2'},
        { id:3, name: 'Student3'},
    ]

    const arr = [['001', 'name1'], ['002', 'name2'], ['003', 'name3']];

    const [id,name] = _.first(arr);

    const [id2,name2] = _.last(arr);
    


    return (
        <div className="container">
            <div>First Item: {_.first(arrSStudent).name}</div>
            <div>Last Item: {_.last(arrSStudent).name}</div>

            <hr/>

            <div>First Item: {id} - {name}</div>
            <div>Last Item: {id2} = {name2}</div>

        </div>
    )
}
