import React from 'react';
import { Button } from 'reactstrap';

export default function FormList(props) {
    return (
        <div className="form-list">
            {props.lists.map(list => (
                <div key={list.id}>
                    <span>Name: {list.name} - Age: {list.age}</span>
                    <Button>
                        Edit
                    </Button>
                    <Button onClick={() => props.deleteFormData(list.id)}>
                        Delete
                    </Button>
                </div>
            ))}
        </div>
    )
}