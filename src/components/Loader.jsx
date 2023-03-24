import React, {useState, useEffect} from 'react'

const Loader = () => {
	const [text, setText] = useState("");
	useEffect(() => {
		const interval = setInterval(() => {
			if (text.length >= 3) {
				setText("");
			} else {
				setText((prev) => prev + ".");
			}
		}, 500);
		return () => clearInterval(interval);
	}, [text]);
	return <p className="loader">{text}</p>;
};

export default Loader;
