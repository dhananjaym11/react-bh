import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Row, Col, Button, Form, Label, Input, FormGroup } from 'reactstrap';

export default function Forms(props) {

    const onSaveClick = (data) => {
        props.onSaveClick(data.email, data.age);
    }

    const handleDeletePerson = (id) => {
        props.handleDeletePerson(id);
    }

    return (
        <div className="form-page">
            <Row>
                <Col xs="6">
                    <Formik
                        initialValues={{ email: '', age: '' }}
                        onSubmit={(values, { resetForm }) => {
                            resetForm();
                            onSaveClick(values);
                        }}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup.string()
                                    .email()
                                    .required('Required'),
                                age: Yup.number()
                                    .typeError('age must be a number')
                                    .required('Required'),
                            })
                        }
                    >
                        {props => {
                            const {
                                values,
                                isValid,
                                touched,
                                errors,
                                dirty,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                handleReset,
                            } = props;
                            return (
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    label="Email"
                                                    margin="normal"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.email && touched.email && (
                                                    <div className="input-feedback">{errors.email}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col xs="6">
                                            <FormGroup>
                                                <Label for="age">Age</Label>
                                                <Input
                                                    id="age"
                                                    label="Age"
                                                    margin="normal"
                                                    value={values.age}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.age && touched.age && (
                                                    <div className="input-feedback">{errors.age}</div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="6">
                                            <Button
                                                onClick={handleReset}
                                                disabled={!dirty || isSubmitting}
                                            >Reset</Button>
                                            <Button
                                                color="primary"
                                                type="submit"
                                                disabled={!isValid}
                                            >Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            );
                        }}
                    </Formik>
                </Col>
                <Col xs="6">
                    {props.personList.map(person => (
                        <div key={person.id}>
                            <span>{person.name} - {person.age}</span>
                            <Button
                                color="secondary"
                                style={{ marginLeft: '10px' }}
                                title="delete"
                                onClick={() => handleDeletePerson(person.id)}>
                                delete
                            </Button>
                        </div>
                    ))}
                </Col>
            </Row>
        </div>
    )
}