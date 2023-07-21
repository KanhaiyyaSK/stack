import React from "react";
import { useParams, Link } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteAnswer } from "../../actions/question";
import toast from "react-hot-toast";
import HTMLReactParser from "html-react-parser";

const DisplayAnswer = ({ question, handleShare }) => {
	const User = useSelector((state) => state.currentUserReducer);

	const { id } = useParams();
	const dispatch = useDispatch();

	const handleDelete = (answerId, noOfAnswers) => {
		dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
		toast.success("Answer deleted");
	};

	return (
		<div>
			{question.answer.map((ans) => (
				<div className="display-ans" key={ans._id}>
					<p>{HTMLReactParser(ans.answerBody)}</p>
					<div className="question-action-user">
						<div>
							<button
								type="button"
								className="edit-question-btn"
								onClick={handleShare}
							>
								Share
							</button>
							{User?.result._id === ans.userId && (
								<button
									type="button"
									className="edit-question-btn"
									onClick={() =>
										handleDelete(ans._id, question.noOfAnswers)
									}
								>
									Delete
								</button>
							)}
						</div>
						<div>
							<p>answered {moment(ans.answeredOn).fromNow()}</p>
							<Link
								to={`/Users/${ans.userId}`}
								className="user-link"
								style={{ color: "#0086d8" }}
							>
								<Avatar
									backgroundColor="green"
									px="8px"
									py="5px"
									textDecoration="none"
								>
									{ans.userAnswered.charAt(0).toUpperCase()}
								</Avatar>
								<div className="answered-username">
									{ans.userAnswered}
								</div>
							</Link>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default DisplayAnswer;
