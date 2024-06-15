import React, { useState } from "react";
import { Button, Input, Logo } from "./index.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authenticationSlice.js";
import { Link } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf.js";

function Signup() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");

	const signup = async (data) => {
		setError("");
		try {
			// const userData = await AuthenticationService.createAccount(data);
			// if (userData) {
			// 	const userData = await AuthenticationService.getCurrentUser();
			// 	console.log(userData);
			// 	if (userData) {
			// 		dispatch(login({userData}));
			// 	}
			// 	navigate("/");
			// }
			axios.post(`${conf.backendUrl}/users/register`, data, { withCredentials: true })
				.then((res) => {
					if (res.data.status === 200) {
						dispatch(login({userData: res.data.data}));
						navigate("/");
					}
				});
		} catch (error) {
			setError("from here " + error.message);
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10">
				<div className="mb-2 flex justify-center">
					<span className="inline-block w-full max-w-[100px]">
						<Logo width="100%"></Logo>
					</span>
				</div>
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign up to your account
				</h2>
				<p className="m-2 text-center text-base text-black/60">
					Already have an account?&nbsp;
					<Link
						to="/login"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Log in
					</Link>
				</p>
				{error && (
					<p className="text-red-600 mt-8 text-center">{error}</p>
				)}

				<form onSubmit={handleSubmit(signup)}>
					<div className="space-y-5">
						<Input
							label="Name: "
							placeholder="Enter your name:"
							{...register("name", { required: true })}
						/>
						<Input
							label="Email: "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(
											value
										) || "Email address must be valid",
								},
							})}
						/>
						<Input
							label="Password: "
							placeholder="Enter your password"
							type="password"
							{...register("password", { required: true })}
						/>

						<Button type="submit" className="w-full">
							{" "}
							Create Account{" "}
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
