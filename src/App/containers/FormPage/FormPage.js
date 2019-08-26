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
        showModal: false,
        editListData: { 'id': 0, 'name': '', 'age': 0 }
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

    putFormData = (data) => {
        const formId = data.id;
        delete data.id;
        axios({
            method: 'put',
            url: dev_environment.base_url + 'form/' + formId + '.json',
            data
        }).then(() => {
            this.getFormData();
        });
    }

    addFormData = () => {
        const editListData = {
            name: '',
            age: 0
        }
        this.setState({
            editListData,
            showModal: true
        })
    }

    editFormData = (listId) => {
        const editList = this.state.lists.find((list) => list.id === listId);
        const editListData = {
            id: editList.id,
            name: editList.name,
            age: editList.age
        }
        this.setState({
            editListData,
            showModal: true
        })
    }

    deleteFormData = (id) => {
        axios({
            method: 'delete',
            url: dev_environment.base_url + 'form/' + id + '.json',
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
                <Button color="success" className="float-right" onClick={this.addFormData}>Add</Button>
                </h1>
                <FormList
                    lists={this.state.lists}
                    editFormData={this.editFormData}
                    deleteFormData={this.deleteFormData} />
                <AddEditForm
                    data={this.state.editListData}
                    showModal={this.state.showModal}
                    toggleModal={this.toggleModal}
                    postFormData={this.postFormData}
                    putFormData={this.putFormData} />
            </Container>
        )
    }
}

export default FormPage;