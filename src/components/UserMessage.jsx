import React, {useState, useEffect} from 'react'
import user from ".././assets/user.png";

const UserMessage = ({ content }) => {
	return (
		<div className="message user">
			<div>
				<img src={user} className="profile-img" />
				<p>{content}</p>
			</div>
		</div>
	);
};

export default UserMessage;