import React from "react";
const List = props => (
	<ul>
		{
			props.arr.map((val,ind)=>{
				return <li key={ind}>{val}</li>
			})
		}
	</ul>
);
export default List;