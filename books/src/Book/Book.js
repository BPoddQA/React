import React from 'react';

const book = (props) => {
    return (
        <tr className="Book">
            <td>{props.title}</td>
            <td>{props.author}</td>
            <td>{props.num_pages}</td>
            <td>{props.isbn}</td>
        </tr>
    )
};
export default book;