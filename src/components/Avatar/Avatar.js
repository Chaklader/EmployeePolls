import React from 'react';
import Image from 'react-bootstrap/Image';

function Avatar(props) {
    return (
        <Image
            src={props.avatarURL}
            roundedCircle
            fluid
            width="40"
            height="40"
            className={props.className}
            alt="user avatar"
        />
    );
}

export default Avatar;
