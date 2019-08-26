import React, { Component } from 'react';
import { Container } from 'reactstrap';

import axios from 'axios';
import { dev_environment } from '../../config/environment';

class FormPage extends Component {
    state = {
        lists: []
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

    postFormData = () => {
        axios({
            method: 'post',
            url: dev_environment.base_url + 'form.json',
            data: {
                'name': 'a',
                'age': 10
            }
        })
    }

    render() {
        let listsHtml = '';
        if (this.state.lists.length) {
            listsHtml = this.state.lists.map((list) => (
                <div key={list.id}>
                    <span>Name: {list.name} </span>
                    &&
                    <span> Age: {list.age}</span>
                </div>
            ));
        }
        return (
            <Container>
                <h1>Form Page</h1>
                {listsHtml}
            </Container>
        )
    }
}

export default FormPage;