import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useState } from "react";
import toast from "react-hot-toast";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";

const Auth = () => {
	const [isSignup, setIsSignup] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSwitch = () => {
		setIsSignup(!isSignup);
		setName("");
		setEmail("");
		setPassword("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email && !password) {
			return toast.error("Please enter email and password");
		}
		if (isSignup) {
			if (!name) {
				return toast.error("Please enter name");
			}
			dispatch(signup({ name, email, password }, navigate));
			toast.success("Redirecting...");
			toast.success("User registered successfully");
			toast.success("Logged in successfully");
		} else {
			dispatch(login({ email, password }, navigate));
			toast.success("Redirecting...");
			toast.success("Logged in successfully");
		}
	};

	return (
		<section className="auth-section">
			{isSignup && <AboutAuth />}
			<div className="auth-container-2">
				{!isSignup && (
					<img
						src={icon}
						alt="stackoverflow"
						className="login-logo"
						width="80px"
					/>
				)}
				<form onSubmit={handleSubmit}>
					{isSignup && (
						<label htmlFor="name">
							<h4>Display Name</h4>
							<input
								type="text"
								id="name"
								name="name"
								onChange={(e) => {
									setName(e.target.value);
								}}
							/>
						</label>
					)}
					<label htmlFor="email">
						<h4>Email</h4>
						<input
							type="email"
							name="email"
							id="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</label>
					<label htmlFor="password">
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<h4>Password</h4>
							{!isSignup && (
								<p style={{ color: "#007ac6", fontSize: "14px" }}>
									forgot password?
								</p>
							)}
						</div>
						<input
							type="password"
							name="password"
							id="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						{isSignup && (
							<p style={{ color: "#666767", fontSize: "14px" }}>
								Passwords must contain at least eight <br /> characters,
								including at least 1 letter and 1 <br /> number.
							</p>
						)}
					</label>
					{isSignup && (
						<label htmlFor="check">
							<input type="checkbox" id="check" />
							<p style={{ fontSize: "14px" }}>
								Opt-in to receive occasional <br /> product updates,
								user research invitations, <br /> company announcements,
								and digests.
							</p>
						</label>
					)}
					<button type="submit" className="auth-btn">
						{isSignup ? "Signup" : "Log in"}
					</button>
					{isSignup && (
						<p style={{ color: "#666767", fontSize: "14px" }}>
							By clicking “Sign up”, you agree to our
							<span style={{ color: "#007ac6" }}>
								{" "}
								terms <br /> of service
							</span>
							,<span style={{ color: "#007ac6" }}>
								{" "}
								privacy policy
							</span>{" "}
							and
							<span style={{ color: "#007ac6" }}> cookie policy</span>
						</p>
					)}
				</form>
				<p>
					{isSignup
						? "Already have an account?"
						: "Don't have an account?"}
					<button
						type="button"
						className="handle-switch-btn"
						onClick={handleSwitch}
					>
						{isSignup ? "Log in" : "Sign Up"}
					</button>
				</p>
			</div>
		</section>
	);
};

export default Auth;
