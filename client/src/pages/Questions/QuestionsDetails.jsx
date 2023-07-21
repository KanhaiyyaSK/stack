import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import HTMLReactParser from "html-react-parser";

import upvote from "../../assets/upvote.svg";
import downvote from "../../assets/downvote.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar.jsx";
import DisplayAnswer from "./DisplayAnswer";
import {
	postAnswer,
	deleteQuestion,
	voteQuestion,
} from "../../actions/question.js";
import Editor from "../../components/Editor/Editor";
import Loader from "../../components/Loader/Loader";

const QuestionsDetails = () => {
	const { id } = useParams();
	const [Answer, setAnswer] = useState("");
	const questionsList = useSelector((state) => state.questionsReducer);
	const User = useSelector((state) => state.currentUserReducer);
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const url = "https://not-stackoverflow.netlify.app";

	const handlePostAnswer = (e, answerLength) => {
		e.preventDefault();
		if (!User) {
			toast.error("Please Login or Signup to answer a question");
			navigate("/Auth");
		} else {
			if (Answer === "") {
				toast.error("Enter an answer before submitting");
			} else {
				dispatch(
					postAnswer({
						id,
						noOfAnswers: answerLength + 1,
						answerBody: Answer,
						userAnswered: User.result.name,
						userId: User.result._id,
					})
				);
				setAnswer("");
			}
		}
	};
	const handleShare = () => {
		// const url = "http://localhost:3000";
		copy(url + location.pathname);
		toast.success("URL copied to clipboard");
	};

	const handleDelete = () => {
		dispatch(deleteQuestion(id, navigate));
		toast.success("Question deleted");
	};

	const handleUpVote = () => {
		if (!User) {
			return toast.error("Please Login or Signup to upvote");
		}
		dispatch(voteQuestion(id, "upVote", User.result._id));
		toast.success("Upvoted");
	};

	const handleDownVote = () => {
		if (!User) {
			return toast.error("Please Login or Signup to downvote");
		}
		dispatch(voteQuestion(id, "downVote", User.result._id));
		toast.success("Downvoted");
	};
	// const questionsList = [
	// 	{
	// 		_id: "1",
	// 		upVotes: 3,
	// 		downVotes: 1,
	// 		noOfAnswers: 2,
	// 		questionTitle: "what is a function?",
	// 		questionBody: "It meant to be",
	// 		questionTags: ["java", "nodejs", "python", "reactjs", "mongodb"],
	// 		userPosted: "bhav",
	// 		userId: 1,
	// 		askedOn: "jan 1",
	// 		answer: [
	// 			{
	// 				answerBody: "Answer",
	// 				userAnswered: "kumar",
	// 				answeredOn: "jan 2",
	// 				userId: 2,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		_id: "2",
	// 		upVotes: 3,
	// 		downVotes: 5,
	// 		noOfAnswers: 0,
	// 		questionTitle: "what is a function?",
	// 		questionBody: "It meant to be",
	// 		questionTags: ["javascript", "R", "python"],
	// 		userPosted: "bhav",
	// 		userId: 1,
	// 		askedOn: "jan 1",
	// 		answer: [
	// 			{
	// 				answerBody: "Answer",
	// 				userAnswered: "bhav",
	// 				answeredOn: "jan 2",
	// 				userId: 2,
	// 			},
	// 		],
	// 	},
	// 	{
	// 		_id: "3",
	// 		upVotes: 1,
	// 		downVotes: 0,
	// 		noOfAnswers: 0,
	// 		questionTitle: "what is a function?",
	// 		questionBody: "It meant to be",
	// 		questionTags: ["javascript", "R", "python"],
	// 		userPosted: "bhav",
	// 		userId: 2,
	// 		askedOn: "jan 1",
	// 		answer: [
	// 			{
	// 				answerBody: "Answer",
	// 				userAnswered: "bhav",
	// 				answeredOn: "jan 2",
	// 				userId: 3,
	// 			},
	// 		],
	// 	},
	// ];

	return (
		<div className="question-details-page">
			{questionsList.data === null ? (
				<Loader />
			) : (
				<>
					{questionsList.data
						.filter((question) => question._id === id)
						.map((question) => (
							<div key={question._id}>
								<section className="question-details-container">
									<h1>{question.questionTitle}</h1>
									<div className="question-details-container-2">
										<div className="question-votes">
											<img
												src={upvote}
												alt="upvote"
												width="18"
												className="votes-icon"
												onClick={handleUpVote}
											/>
											<p>
												{question.upVote.length -
													question.downVote.length}
											</p>
											<img
												src={downvote}
												alt="downvote"
												width="18"
												className="votes-icon"
												onClick={handleDownVote}
											/>
										</div>
										<div style={{ width: "100%" }}>
											<p className="question-body">
												{HTMLReactParser(question.questionBody)}
											</p>
											<div className="question-details-tags">
												{question.questionTags.map((tag) => (
													<p key={tag}>{tag}</p>
												))}
											</div>
											<div className="question-action-user">
												<div>
													<button
														type="button"
														className="edit-question-btn"
														onClick={handleShare}
													>
														Share
													</button>
													{User?.result?._id ===
														question.userId && (
														<button
															type="button"
															className="edit-question-btn"
															onClick={handleDelete}
														>
															Delete
														</button>
													)}
												</div>
												<div>
													<p>
														asked{" "}
														{moment(question.askedOn).fromNow()}
													</p>
													<Link
														to={`/Users/${question.userId}`}
														className="user-link"
														style={{ color: "#0086d8" }}
													>
														<Avatar
															backgroundColor="orange"
															px="8px"
															py="5px"
															textDecoration="none"
														>
															{question.userPosted
																.charAt(0)
																.toUpperCase()}
														</Avatar>
														<div>{question.userPosted}</div>
													</Link>
												</div>
											</div>
										</div>
									</div>
								</section>
								{question.noOfAnswers !== 0 && (
									<section>
										<h3>{question.noOfAnswers} Answer</h3>
										<DisplayAnswer
											key={question._id}
											question={question}
											handleShare={handleShare}
										/>
									</section>
								)}
								<section className="post-ans-container">
									<h3>Your Answer</h3>
									<form
										onSubmit={(e) => {
											handlePostAnswer(e, question.answer.length);
										}}
									>
										<div>
											<Editor value={Answer} onChange={setAnswer} />
										</div>
										<br />
										<input
											type="submit"
											className="post-ans-btn"
											value="Post Your Answer"
										/>
									</form>
									<p>
										Browse other Question tagged
										{question.questionTags.map((tag) => (
											<Link
												to="/Tags"
												key={tag}
												className="ans-tags"
											>
												{" "}
												{tag}{" "}
											</Link>
										))}
										or
										<Link
											to="/AskQuestion"
											style={{
												textDecoration: "none",
												color: "#009dff",
											}}
										>
											{" "}
											ask your own question.
										</Link>
									</p>
								</section>
							</div>
						))}
				</>
			)}
		</div>
	);
};

export default QuestionsDetails;
