import React, {useState, useEffect} from 'react'
import Loader from './Loader'
import robot from ".././assets/chip.png";

const AIMessage = ({ content, loading }) => {
	const ref = React.useRef(null);
	const [displayedText, setDisplayedText] = useState("");
	useEffect(() => {
		let currentIndex = 0;
		const intervalId = setInterval(() => {
			setDisplayedText(content.substring(0, currentIndex + 1));
			ref.current?.scrollIntoView({ behaviour: "smooth" });
			currentIndex++;
			if (currentIndex === content.length) {
				clearInterval(intervalId);
			}
		}, 10);
		return () => clearInterval(intervalId);
	}, [content]);

	return (
		<div className="message ai">
			<div>
				<img src={robot} className="profile-img" />
				{loading && content == "..." ? <Loader /> : <p>{displayedText}</p>}
			</div>
			<div className="bottom-div" ref={ref}></div>
		</div>
	);
};

export default AIMessage;