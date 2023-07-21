import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Auth from "./pages/Auth/Auth.jsx";
import Tags from "./pages/Tags/Tags.jsx";
import Users from "./pages/Users/Users.jsx";
import Questions from "./pages/Questions/Questions.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import AskQuestion from "./pages/AskQuestion/AskQuestion.jsx";
import DisplayQuestion from "./pages/Questions/DisplayQuestion.jsx";

const AllRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/Auth" element={<Auth />} />
			<Route path="/Tags" element={<Tags />} />
			<Route path="/Users" element={<Users />} />
			<Route path="/Questions" element={<Questions />} />
			<Route path="/Users/:id" element={<UserProfile />} />
			<Route path="/AskQuestion" element={<AskQuestion />} />
			<Route path="/Questions/:id" element={<DisplayQuestion />} />
		</Routes>
	);
};

export default AllRoutes;
