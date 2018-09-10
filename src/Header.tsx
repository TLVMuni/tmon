import * as React from 'react';
import { Container, Navbar } from 'reactstrap';

class Header extends React.Component {
    render() {
        return <Navbar
                    expand="lg"
                    className='navbar'>
                <Container fluid>
                    <div>
                        Welcome
                    </div>
                </Container>
               </Navbar>
    }
};

export default Header;