import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, RTE, Select, Button } from "../index.js";
import axios from "axios";
import conf from "../../conf/conf.js";

function PostForm({ post }) {
	const [error, setError] = useState("");
	const { register, handleSubmit, watch, setValue, control, getValues, formState: {errors} } =
		useForm({
			defaultValues: {
				title: post?.title || "",
				slug: post?.slug || "",
				content: post?.content || "",
				status: post?.status || "active",
			},
		});
	const navigate = useNavigate();

	const submitHandler = async (data) => {
        const formData = new FormData();
		if (data.title) formData.append("title", data.title);
		if (data.slug) formData.append("slug", data.slug);
		if (data.content) formData.append("content", data.content);
		if (data.status) formData.append("status", data.status);

		if (data.featuredImage && data.featuredImage[0]) {
			formData.append("featuredImage", data.featuredImage[0]);
		}

		if (post) {
			// Update post
			axios
				.post(
					`${conf.backendUrl}/articles/update-article/${post.slug}`,
					formData,
					{
						withCredentials: true,
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				)
				.then((res) => {
					if (res.data.status === 200) {
						navigate(`/post/${post.slug}`);
					}
				});
		} else {
			// Create post
			axios
				.post(
					`${conf.backendUrl}/articles/create-article`,
					formData,
					{
						withCredentials: true,
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				)
				.then((res) => {
					if (res.data.status === 200) {
						navigate(`/post/${res.data.data.slug}`);
					}
				})
				.catch((error) => {
					if (error.response.status === 400) {
						setError("Article with this slug already exists");
					} else if (error.response.status === 401) {
						setError("Missing required Fields");
					}
				});
		}
	};

	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string") {
			return value
				.trim()
				.toLowerCase()
				.replace(/[^a-zA-Z\d\s]+/g, "-")
				.replace(/\s/g, "-");
		}
		return "";
	});

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === "title") {
				setValue("slug", slugTransform(value.title));
			}
		});
		return () => subscription.unsubscribe();
	}, [watch, slugTransform, setValue]);

	return (
		<form onSubmit={handleSubmit(submitHandler)} className="flex flex-wrap">
			<div className="text-red-500">{error}</div>
			<div className="w-2/3 px-2">
				<Input
					label="Title: "
					placeholder="Enter the title"
					className="mb-4"
					{...register("title", { required: "Title is required" })}
				/>
				<Input
					label="Slug: "
					placeholder="Enter the slug"
					className="mb-4"
					{...register("slug", { required: "Slug is required" })}
					onInput={(e) =>
						setValue("slug", slugTransform(e.target.value))
					}
				/>
				<RTE
					label="Content: "
					name="content"
					control={control}
					defaultValue={getValues("content")}
				/>
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image: "
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("featuredImage", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={post.featuredImage}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status: "
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button
					type="submit"
					bgColor={post ? "bg-green-500" : undefined}
					className="w-full"
				>
					{" "}
					{post ? "Update" : "Create"}{" "}
				</Button>
			</div>
		</form>
	);
}

export default PostForm;
