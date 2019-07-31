import React from 'react'
import { ActionCable } from 'react-actioncable-provider';


class Chat extends React.Component {

	state = {
		content: ""
	}


	handleChange = (e) => {
		console.log('e: ', e);
		this.setState({ [e.target.name]: e.target.value });
	}

	handleSocketResponse = data => {

    switch (data.type) {
      case 'ADD_MESSAGE':
       		this.props.addMessage(data.payload)
       		break;
      case "DELETE_MESSAGE":
      		this.props.removeMessage(data.payload.message_id)
       		break;
      default:
        console.log(data);
    }
  };

  	sendMesssage = (event) => {
	event.preventDefault()
	fetch(`http://localhost:3000/chats/${this.props.chat.id}/add_message`, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({
			content: this.state.content,
			user_id: this.props.currentUser.id
		})
	})
	.then(res => {
		console.log('res: ', res);
		this.setState({
			content: "",
		})
	})
}


	deleteMessage = (messageId) => {
		fetch("http://localhost:3000/chats/delete_message", {
			method: "POST",
			headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					message_id: messageId,
					chat_id: this.props.chat.id
				})
		})
	}

	render(){
		
		let messageComponents = this.props.chat.messages.map(message => {
			return(
				<div key={message.id}>
					{message.username}: {message.content} 
					<button onClick={(event) => this.deleteMessage(message.id)}>DELETE</button>
				</div>

			)
		})
		return (
			<div>
				<ActionCable
          channel={{ channel: 'ChatChannel', chat_id: this.props.chat.id }}
          onReceived={this.handleSocketResponse}
        />
				<h3>Session - Chat</h3>
				{messageComponents}
				<form onSubmit={this.sendMesssage} >
				<input type="text" value={this.state.content} onChange={this.handleChange} name="content"/>
				</form>
				
				
				
			</div>
		)
	}
}

export default Chat