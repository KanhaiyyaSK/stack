import React from "react";

const WidgetTags = () => {
	const tags = [
		"c",
		"css",
		"html",
		"javascript",
		"mongodb",
		"next.js",
		"node.js",
		"reactjs",
		"express",
		"tailwind-css",
		"mysql",
		"cms",
	];
	return (
		<div className="widget-tags">
			<h3>Watched Tags</h3>
			<div className="widget-tags-div">
				{tags.map((tag) => (
					<p key={tag}>{tag}</p>
				))}
			</div>
		</div>
	);
};

export default WidgetTags;
