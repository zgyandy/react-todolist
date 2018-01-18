import React, {
	Component
} from "react";
import ReactDom from "react-dom";
import {
	createStore
} from "redux";

import To from "./components/To";
import Do from "./components/Do";
import List from "./components/List";


// 定义一个默认状态
const defaultState = {
	arr: []
}

// 定义reducer 纯函数必须有返回值
let reducer = (state = defaultState, action) => {
	// 动作方式来源于type，需要对type进行判断
	let {
		type,
		payload
	} = action;
	switch (type) {
		case "ADD":
			return Object.assign({}, state, {
				arr: state.arr.concat(payload)
			});
			break;
		default:
			return state;
	}
};

let store = createStore(reducer, defaultState);

class Text extends Component {
	constructor() {
		super();
		this.state = {

		}
		this.onClick = this.onClick.bind(this)
	}
	onClick() {
		console.log(store)
	}
	render() {
		return (
			<div>
				<input onClick={this.onClick} type="button" value="测试"/>
			</div>
		)
	}
}
class ToDoList extends Component {
	constructor() {
		super();
		this.state = {
			arr: [],
			msg: ''
		};
		this.send = this.send.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	send() {
		// if (this.state.msg != "") {
		// 	var arr = this.state.arr;
		// 	arr.unshift(this.state.msg);
		// 	this.setState({
		// 		arr: arr,
		// 		msg: ""
		// 	})
		// }
		console.log(this.props.store);
		this.props.store.dispatch({
			type: "ADD",
			payload: this.state.msg
		})
	};
	onChange(eve) {
		this.setState({
			msg: eve.target.value
		})
	};
	componentDidMount() {
		// 加载完成后获取一次状态
		this.setState({
			arr: this.props.store.getState().arr
		})

		// 添加数据时触发订阅
		this.props.store.subscribe(() => {
			this.setState({
				arr: this.props.store.getState().arr
			})
		})
	}
	render() {
		return (
			<div>
				<div>ToDoList</div>
				<Do onChange={this.onChange}></Do>
				<To send={this.send}></To>
				<List arr={this.state.arr}></List>
			</div>
		)
	}
}
ReactDom.render(
	<ToDoList store={store}></ToDoList>,
	document.querySelector("#app")
);