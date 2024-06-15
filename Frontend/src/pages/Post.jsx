import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Button } from "../components/index.js";
import parse from "html-react-parser";
import axios from "axios";
import conf from "../conf/conf.js";

function Post() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate();
	const userData = useSelector((state) => state.auth.userData);
	let isAuthor = post && userData ? post.userid === userData._id : false;
	
	useEffect(() => {
		isAuthor = post && userData ? post.userid === userData._id : false;
	}, [post, userData]);

	useEffect(() => {
		if (slug) {
				axios.get(`${conf.backendUrl}/articles/${slug}`, { withCredentials: true })
				.then((res) => {
					if (res.data.status === 200) {
						setPost(res.data.data);
					} else {
						navigate("/");
					}
				});
		} else {
			navigate("/");
		}
	}, [slug, navigate]);
	
	const deletePost = () => {
		axios.delete(`${conf.backendUrl}/articles/${post.slug}`, { withCredentials: true })
			.then((res) => {
				if (res.data.status === 200) {
					navigate("/");
				}
			});
	};

	return (
		post && (
			<div className="py-8">
				<Container>
					<div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
						<img
							src={post.featuredImage}
							alt={post.title}
							className="rounded-xl"
						/>

						{isAuthor && (
							<div className="absolute right-6 top-6">
								<Link to={`/edit-post/${post.slug}`}>
									<Button
										bgColor="bg-green-500"
										className="mr-3"
									>
										Edit
									</Button>
								</Link>
								<Button
									bgColor="bg-red-500"
									onClick={deletePost}
								>
									Delete
								</Button>
							</div>
						)}
					</div>
					<div className="w-full mb-6">
						<h1 className="text-2xl font-bold">{post.title}</h1>
					</div>
					<div className="browser-css">{parse(post.content)}</div>
				</Container>
			</div>
		)
	);
}

export default Post;
