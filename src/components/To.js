import React, {
	Component
} from "react";

const To = props => (
	<input type="button" value="发送" onClick={props.send}/>
);

export default To;