import React from 'react';
import _ from 'lodash';


export default function CompareObjectArray() {


    const arrA = [1,2];
    const arrB = [2,1];

    const result = _.isEqual(arrA.sort, arrB.sort);

    console.log('result', result);

    const arrObj1 = [{id: 1, name: 'Thong'}, {id:2, name: 'Thong2'}];
    const arrObj2 = [{id: 1, name: 'Thong'}, {id:2, name: 'Thong3'}];

    const result2 = _.differenceWith(arrObj1, arrObj2, _.isEqual);

    console.log('result2', result2);

    return (
        <div>
            
        </div>
    )
}
