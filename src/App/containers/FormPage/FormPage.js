import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';

import './FormPage.css';
import axios from 'axios';
import { dev_environment } from '../../config/environment';
import FormList from '../../components/Forms/FormList';
import AddEditForm from '../../components/Forms/AddEditForm';

class FormPage extends Component {
    state = {
        lists: [],
        showModal: false
    }

    componentDidMount() {
        this.getFormData();
    }

    getFormData = () => {
        axios({
            method: 'get',
            url: dev_environment.base_url + 'form.json?orderBy="Name"'
        }).then(response => {
            const lists = [];
            for (let key in response.data) {
                lists.push({
                    id: key,
                    ...response.data[key]
                })
            }
            this.setState({
                lists
            })
        });
    }

    postFormData = (data) => {
        axios({
            method: 'post',
            url: dev_environment.base_url + 'form.json',
            data
        }).then(() => {
            this.getFormData();
        });
    }

    toggleModal = () => {
        this.setState(prevState => ({
            showModal: !prevState.showModal
        }))
    }

    render() {
        return (
            <Container>
                <h1>Form Page
                <Button color="success" className="float-right" onClick={this.toggleModal}>Add form</Button>
                </h1>
                <FormList lists={this.state.lists} />
                <AddEditForm
                    showModal={this.state.showModal}
                    toggleModal={this.toggleModal}
                    postFormData={this.postFormData} />
            </Container>
        )
    }
}

export default FormPage;