import React from 'react';


const List = (props) => {
    console.log(props);
    //put users above the id, for each user corresponding to the text
    //make edit or delete button for each todo;
    return(
        <div id={props.msg.id}>
            
            {props.msg.messages}
        </div>
        )
}

export default List;