import * as React from 'react';

class CameraView extends React.Component<CameraViewProps> {

    render() {
        return <div id='picturePanel'>
            <div id='cfader'>
                <div className='member-image current'>
                    <iframe width="300" height="200" style={{border:'0'}} webkitallowfullscreen="true" 
                        scrolling="no" mozallowfullscreen="true" allowFullScreen={true} 
                        src="https://balticlivecam.com/cameras/israel/tel-aviv/tel-aviv/?embed">
                    </iframe>
                </div> 
            </div>
            CameraView: {this.props.cameraId}
        </div>
    }

};

export default CameraView;
