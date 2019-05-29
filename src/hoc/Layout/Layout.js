import React from 'react'
import Navbar from '../../components/Navigation/Navbar';
import Aux from '../Aux/Aux';

const layout = (props) => {
    return (
        <Aux>
            <Navbar />
            {props.children}
        </Aux>
    )
}

export default layout;