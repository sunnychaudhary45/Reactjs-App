import React, { Component } from 'react';
import '../css/listdocument.css';
import { postService, getService, putService, deleteService } from '../services/htppservice';
import environmentsettings from '../environment/settings';

class DocumentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.getAllDocumentRecords();
    }

    getAllDocumentRecords = async () => {
        const result = await getService(environmentsettings().APIURL+'/documents/getAllDocuments');
        console.log('result', result);
        if (result.data) {
            if (result.data.list.length) {
                let obj = this.state;
                this.setState({
                    list: result.data.list
                });
            }
        }

    }

    viewDocument = (selectedId) => {
        this.props.history.push('/viewdocument?selectedId=' + selectedId);
    }

    editDocument = (selectedId) => {
        this.props.history.push('/editdocument?selectedId=' + selectedId);
    }

    deleteDocument = async (selectedId) => {
        const data = { id: selectedId };
        const result = await postService(environmentsettings().APIURL+'/documents/deleteDocumentById', data);
        console.log('result', result);
        if (result.data.list) {
            this.setState({
                list: result.data.list
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div class="container">
                    <div class="row">
                        <div class="col-12" style={{ "overflow-x": "scroll" }}>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Body</th>
                                        <th scope="col">File</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.list.length>0 &&
                                        this.state.list.map(item =>
                                            <tr>
                                                <th scope="row">{item.createdDate}</th>
                                                <td>{item.subject}</td>
                                                <td style={{ "width": "20px", "height": "20px" }} >
                                                    <div dangerouslySetInnerHTML={{ __html: item.editorText }}>
                                                    </div>
                                                </td>
                                                <td>
                                                    <img style={{ "display": "block;", "width": "80px" }}
                                                        src={environmentsettings().ImagePath+item.fileName} />
                                                </td>
                                                <td>
                                                    <i class="fa fa-edit" onClick={() => this.editDocument(item.id)}
                                                        style={{ 'font-size': '35px', 'marginRight': '5%', 'cursor': 'pointer' }}></i>
                                                    <i class="fa fa-eye"
                                                        onClick={() => this.viewDocument(item.id)}
                                                        style={{ 'font-size': '35px', 'marginRight': '5%', 'cursor': 'pointer' }}></i>
                                                    <i class="fa fa-trash-o" onClick={() => this.deleteDocument(item.id)}
                                                        style={{ 'font-size': '35px', 'cursor': 'pointer' }}></i>

                                                </td>
                                            </tr>
                                        )

                                    }
                                    {
                                        this.state.list.length==0 &&
                                        <th scope="row" colSpan="5">No Records Found!</th>
                                    }

                                </tbody>



                            </table>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DocumentList;