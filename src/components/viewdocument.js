import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { postService, getService, putService } from '../services/htppservice';
import queryString from 'query-string';
import environmentsettings from '../environment/settings';

class ViewDocument extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                subject: '',
                editorText: '',
                fileName: '',
                id: '',
                createdDate: new Date()
            },
            isResultFound:false
        };
    }
    componentDidMount() {
        const { selectedId } = queryString.parse(this.props.location.search);
        this.readData(selectedId);
    }

    readData = async (selectedId) => {
        const result = await getService(environmentsettings().APIURL+'/documents/getDocumentById?id=' + selectedId);
        console.log('result', result);
        if (result.data) {
            if (result.data.id) {
                this.setState({
                    account: {
                        id: result.data.id,
                        subject: result.data.subject,
                        editorText: result.data.editorText,
                        fileName: result.data.fileName,
                        createdDate: result.data.createdDate
                    },
                    isResultFound:true
                });
            }
            else {
                alert('Something went wrong!');
            }
        }
        else {
            alert('Something went wrong!');
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="container">

                    <div class="col-12" style={{ "overflow-x": "scroll" }}>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Subject</th>
                                    <th scope="col">Body</th>
                                    <th scope="col">File</th>
                                </tr>
                            </thead>
                            {
                                this.state.isResultFound &&
                                <tbody>
                                    {
                                        <tr>
                                            <th scope="row">{this.state.account.createdDate}</th>
                                            <td>{this.state.account.subject}</td>
                                            <td style={{ "width": "20px", "height": "20px" }} >
                                                <div dangerouslySetInnerHTML={{ __html: this.state.account.editorText }}>
                                                </div>
                                            </td>
                                            <td>
                                                <img style={{ "display": "block;", "width": "80px" }}
                                                    src={environmentsettings().ImagePath+ this.state.account.fileName} />
                                            </td>
                                        </tr>


                                    }

                                </tbody>
                            }

                            {
                                !this.state.isResultFound && <div>Not Found</div>
                            }
                        </table>
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}

export default ViewDocument;