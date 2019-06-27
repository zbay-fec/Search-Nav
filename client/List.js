import React from 'react';


const List = (props) => {
    console.log(props);
    return(
        <div>
        {props.msg.messages}
        </div>
        )
}

export default List;