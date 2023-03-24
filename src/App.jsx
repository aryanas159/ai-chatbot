import React from "react"; 
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import send from "./assets/send-message.png";
import UserMessage from "./components/UserMessage";
import AIMessage from "./components/AIMessage";

const openai = new OpenAIApi(
	new Configuration({
		apiKey: import.meta.env.VITE_API_KEY,
	})
);

function App() {
	const [messages, setMessages] = React.useState([
		{ role: "assistant", content: "Hello! How may I assist you today?" },
	]);
	const [prompt, setPrompt] = React.useState("");
	const [userPrompts, setUserPrompts] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [skipCount, setSkipCount] = React.useState(true); // To avoid initial execution of useState

	const modifyMessages = () => {
		setLoading(true);
		setTimeout(() => {
			setMessages((prev) => [...prev, { role: "assistant", content: "..." }]);
		}, 1000);
		openai
			.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: messages,
			})
			.then((res) => {
				setMessages((prev) => {
					let newArr = prev;
					newArr[newArr.length - 1] = res.data.choices[0].message;
					setLoading(false);
					return newArr;
				});
			});
	};

	React.useEffect(() => {
		if (skipCount) setSkipCount(false);
		if (!skipCount) modifyMessages();
	}, [userPrompts]);


	const requestAPI = () => {
		if (prompt !== "") {
			setMessages((prev) => [
				...prev,
				{ role: "user", content: removeInitialn(prompt) },
			]);
			setUserPrompts((prev) => [...prev, { role: "user", content: prompt }]);
			setPrompt("");
		}
	};

	return (
		<div className="App">
			<div className="input">
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							requestAPI();
						}
					}}
				/>
				<button onClick={requestAPI}>
					<img src={send} />
				</button>
			</div>
			<main>
				{messages.map((message) => {
					return message.role == "user" ? (
						<UserMessage content={message.content} />
					) : (
						<AIMessage
							content={removeInitialn(message.content)}
							loading={loading}
						/>
					);
				})}
			</main>
		</div>
	);
}

const removeInitialn = (str) => {
	return str.trim("\n\n");
};


export default App;
