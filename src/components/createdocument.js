import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { postService, getService, putService } from '../services/htppservice';
import environmentsettings from '../environment/settings';


class CreateDocument extends Component {
    
    constructor(props) {
        super(props);
        this.modules = {
            toolbar: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'video'],
                ['clean']
            ]
        };

        this.formats = [
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video'
        ];

        this.state = {
            account: {
                subject: '',
                editorText: '',
                fileName: ''
            }
        }
    }

    handleChange = (e) => {
        let account = this.state.account;
        if (e.currentTarget.name == "fileUploader") {
            account['fileName'] = e.target.files[0];
        }
        else if (e.currentTarget.name == "subject") {
            account['subject'] = e.currentTarget.value;
        }

        this.setState({
            account: account
        });       
    }

    handleChangeEditor = (content, delta, source, editor) => {
        console.log('handlechange editor');
        let account = this.state.account;
        account['editorText'] = editor.getHTML();
        this.setState({
            account: account
        });
    }

    submitData = async () => {
        try {
            const formData = new FormData();
            formData.append('file', this.state.account.fileName);
            formData.append('subject', this.state.account.subject);
            formData.append('editorText', this.state.account.editorText);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            const result = await postService(environmentsettings().APIURL+'/documents/createDocument', formData, config);
            console.log('result', result);
            if(result.data){
                if(result.data.errorCode==200){
                    this.props.history.push('/documentlist');
                }
                else{
                    alert('Something went wrong!');
                }
            }
            else{
                alert('Something went wrong!');
            }
        }
        catch (ex) {
            console.log(ex);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input type="text" className="form-control" maxlength="300" name="subject" id="subject"
                            onChange={this.handleChange}
                            value={this.state.account.subject} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-2">
                            Upload Image File
                            </label>
                        <input id="input-2" name="fileUploader"
                            onChange={this.handleChange}
                            type="file" className="form-control"
                            data-show-upload="true"
                            data-show-caption="true" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <ReactQuill theme="snow" modules={this.modules} placeholder="Write Something!"
                            style={{ 'height': '200px' }}
                            onChange={this.handleChangeEditor}

                            formats={this.formats}
                        />
                    </div>
                    <button type="button" onClick={this.submitData} className="btn btn-primary" style={{ "marginTop": "40px" }}>Submit</button>
                </div>
            </React.Fragment>
        );
    }
}

export default CreateDocument;