
import * as React from 'react';

class Footer extends React.Component<FooterProps, {}> {

    render() {

        const cameras = this.props.cameras.map( (camera: ICamera, index: number) => {
            return <li key={index}>
                      <div className='carousel-item-div selected'>{camera.id}</div>
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