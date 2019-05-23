import React, { Component } from 'react';


class EditForm extends Component {

    onSubmit = () => {

    }

    state = {}
    render() {
        return (<div>
            <form onSubmit={this.onSubmit}>
                <input type="text" value="" />
                <h1>asdfasdfasdf</h1>
            </form>
        </div>);
    }
}

export default EditForm;