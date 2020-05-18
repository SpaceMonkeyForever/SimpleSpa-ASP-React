import React, {Component} from 'react';
import axios from 'axios';

export class FileUpload extends Component {
    static displayName = FileUpload.name;
    static uploadUrl = "fileupload/uploadstreamingfile"

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedFile: null,
            uploadFileProgress: 0,
        };

        this.uploadStreamingFile = this.uploadStreamingFile.bind(this);
        this.abortHandler = this.abortHandler.bind(this);
        this.completeHandler = this.completeHandler.bind(this);
        this.errorHandler = this.errorHandler.bind(this);
        this.progressHandler = this.progressHandler.bind(this);
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    renderUploadForm() {
        return (
            <form encType="multipart/form-data"
                  method="post" className="form-label-left" role="form">
                <div className="modal-body">
                    <div className="form-group">
                        <div className="input-group">
                            <label className="input-group-btn">
                                <span className="btn btn-primary">
                                   Browse… <input type="file" style={{display: "none"}} name="file" id="FileInput" onChange={ (e) => this.onFilePicked(e.target.files)}/>
                                </span>
                            </label>
                            <input type="text" className="form-control" readOnly={true} value={this.state.selectedFile?.name ?? ""}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <button type="button" value="Upload Streaming File" className="btn btn-default btn-primary"
                                    onClick={this.uploadStreamingFile}>Upload Streaming File
                            </button>

                        </div>
                    </div>
                    <div className="form-group hidden">
                        Uploading...
                        <div className="progress">
                            <div className="progress-bar" style={{width: `${this.state.uploadFileProgress}%`}}>
                                {`${this.state.uploadFileProgress}%`}
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    render() {
        return this.state.loading
            ? <p><em>Loading...</em></p>
            : (
                <div>
                    <div>{this.renderUploadForm()}</div>
                </div>
            );
    }

    onFilePicked(files) {
        console.log(`selected file: ${files}`)
        this.setState({selectedFile: files[0]})
    }

    uploadStreamingFile() {
        let file = this.state.selectedFile;
        // Details of the uploaded file 
        console.log(file);
        
        // Create an object of formData 
        const formData = new FormData();
        // Update the formData object 
        formData.append("myFile", file, file.name);

        const ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", this.progressHandler, false);
        ajax.addEventListener("load", this.completeHandler, false);
        ajax.addEventListener("error", this.errorHandler, false);
        ajax.addEventListener("abort", this.abortHandler, false);
        ajax.open("POST", FileUpload.uploadUrl);
        //use file_upload_parser.php from above url
        ajax.send(formData);
    }

    progressHandler(event) {
        // _("loaded_n_total").innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
        // var percent = (event.loaded / event.total) * 100;
        // _("progressBar").value = Math.round(percent);
        // _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
        console.log(event.loaded);
        let percentDone = Math.floor(event.loaded/event.total * 100);
        this.setState({uploadFileProgress: percentDone})
    }

    completeHandler(event) {
        // _("status").innerHTML = event.target.responseText;
        // _("progressBar").value = 0; //wil clear progress bar after successful upload
        console.log("done")
    }

    errorHandler(event) {
        // _("status").innerHTML = "Upload Failed";
        console.log("error: " + event)
    }

    abortHandler(event) {
        // _("status").innerHTML = "Upload Aborted";
        console.log("aborted: " + event)
    }
}
