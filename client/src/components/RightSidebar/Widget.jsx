import React from "react";
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen.svg";
import blackLogo from "../../assets/black-logo.svg";

const Widget = () => {
	return (
		<div className="widget">
			<h4>The Overflow blog</h4>
			<div className="right-sidebar-div-1">
				<div className="right-sidebar-div-2">
					<img src={pen} alt="pen" height="18" />
					<p>
						How to keep the servers running when your Mastodon
						goes viral
					</p>
				</div>
				<div className="right-sidebar-div-2">
					<img src={pen} alt="pen" height="18" />
					<p>
						From Web2 to Web3: How developers can upskill and
						build with blockchain
					</p>
				</div>
			</div>
			<h4>Featured on Meta</h4>
			<div className="right-sidebar-div-1">
				<div className="right-sidebar-div-2">
					<img src={comment} alt="comment" height="18" />
					<p>
						Do you observe increased relevance of Related
						Questions with our Machine...
					</p>
				</div>
				<div className="right-sidebar-div-2">
					<img src={comment} alt="comment" height="18" />
					<p>Temporary policy: ChatGPT is banned</p>
				</div>
				<div className="right-sidebar-div-2">
					<img src={blackLogo} alt="black-logo" height="24" />
					<p>
						Plagiarism flag and moderator tooling has launched
						to Stack Overflow!
					</p>
				</div>
			</div>
			<h4>Hot Meta Posts</h4>
			<div className="right-sidebar-div-1">
				<div className="right-sidebar-div-2">
					<p>38</p>
					<p>
						Why was this spam flag declined, yet the question
						marked as spam?
					</p>
				</div>
				<div className="right-sidebar-div-2">
					<p>20</p>
					<p>
						What is the course of action when the user has
						high enough rep to...
					</p>
				</div>
				<div className="right-sidebar-div-2">
					<p>14</p>
					<p>
						Is the link to "How to ask" help page a useful
						comment?
					</p>
				</div>
			</div>
		</div>
	);
};

export default Widget;
