
import * as React from 'react';
import * as noPicture from './nopicture.png';
import classNames from 'classnames';

class Footer extends React.Component<FooterProps, FooterState> {

    state = {
        activeCameraId: this.props.cameras[0].id
    }

    cameraClicked = (cameraId: number) => {
        this.setState({
            activeCameraId: cameraId
        });

        this.props.cameraSelected(cameraId);
    }

    componentDidUpdate(prevProps: FooterProps) {
        if( prevProps.cameras !== this.props.cameras ) {
            this.setState({
                activeCameraId: this.props.cameras[0].id
            })
        };
    }

    render() {

        const self = this;

        const cameras = this.props.cameras.map( (camera: ICamera, index: number) => {

            let cameraClassName = classNames({
                'carousel-item-div': true,
                'activeCamera': self.state.activeCameraId === camera.id
            });
    
            return <li key={index}>
                      <div className={cameraClassName} tab-index='0'
                        onClick={ () => this.cameraClicked(camera.id)}>
                        <span className='number-red'>{camera.id}</span>
                        <img src={'public/' + noPicture} alt="picture not availbale" />
                        <div>{camera.name}</div>    
                        <div style={{height: 0}}>.</div>
                        <div style={{height: 0}}>.</div>
                        <div style={{height: 0}}>View full screen</div>                    
                      </div>
                    </li>
        });

        return <div id='footer'>
            <div id='footerDesktop'>
                <div className='carousel'>
                    <div className='carouselWrapper'>
                        <div className='carouselScroller no-touch'
                            style={{
                                width: '2340px',
                                transitionProperty: 'transform',
                                transformOrigin: '0px 0px 0px',
                                transform: 'translate(0px, 0px) translateZ(0px)'
                            }}>
                            <ul>
                                {cameras}
                            </ul>
                            
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    }

};

export default Footer;
