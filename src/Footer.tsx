import * as React from 'react';

class Footer extends React.Component<FooterProps> {

    render() {

        const cameras = this.props.cameras.map( (camera, index) => {
            return <div key={index}>{camera.id}</div>
        });

        return <div id='footer'>
            <div id='footerDesktop'>
                <div className='carousel'>
                    <div className='carouselWrapper'>
                    {cameras}
                    </div>
                </div>
            </div>
        </div>
    }

};

export default Footer;