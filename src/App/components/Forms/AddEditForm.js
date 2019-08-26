import React, { useState } from 'react';
import { Row, Col, Button, Form, Label, Input, FormGroup, Modal } from 'reactstrap';

export default function AddEditForm(props) {
    const [name, updateName] = useState('');
    const [age, updateAge] = useState(0);

    const onSaveClick = () => {
        const data = {
            name, age
        }
        props.postFormData(data);
        props.toggleModal();
    }

    return (
        <Modal isOpen={props.showModal} toggle={props.toggleModal}>
            <Form>
                <Row>
                    <Col xs="6">
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                id="name"
                                margin="normal"
                                value={name}
                                onChange={(e) => updateName(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs="6">
                        <FormGroup>
                            <Label for="age">Age</Label>
                            <Input
                                id="age"
                                margin="normal"
                                value={age}
                                onChange={(e) => updateAge(e.target.value)}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6">
                        {/* <Button>Reset</Button> */}
                        <Button onClick={onSaveClick}>Submit</Button>
                    </Col>
                </Row>
            </Form>

        </Modal>
    )
}