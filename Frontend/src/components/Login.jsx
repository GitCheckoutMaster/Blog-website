import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as storeLogin } from "../store/authenticationSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import conf from "../conf/conf.js";

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState("");

	const login = async (data) => {
		setError("");
		try {
			// const session = await AuthenticationService.login(data);

			// if (session) {
			// 	const userData = await AuthenticationService.getCurrentUser();
			// 	console.log(userData)
			// 	if (userData) {
			// 		dispatch(storeLogin(userData));
			// 	}
			// 	navigate("/");
			// }
			axios.post(`${conf.backendUrl}/users/login`, data, { withCredentials: true })
				.then((res) => {
					if (res.data.status === 200) {
						dispatch(storeLogin({userData: res.data.data}));
						navigate("/");
					}
				})
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div className="flex items-center justify-center w-full">
			<div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
				<Logo width="100%" />
				<h2 className="text-center text-2xl font-bold leading-tight">
					Sign in to your account
				</h2>
				<p className="m-2 text-center text-base text-black/60">
					Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className="font-medium text-primary transition-all duration-200 hover:underline"
					>
						Sign up
					</Link>
				</p>
				{error && (
					<p className="text-red-500 mt-8 text-center">{error}</p>
				)}

				<form onSubmit={handleSubmit(login)} className="mt-8">
					<div className="space-y-5">
						<Input
							label="Email: "
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPatern: (value) =>
										/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim.test(value) || "Email address must be valid"
								},
							})}
						/>

                        <Input 
                            label="Password: "
                            placeholder="Enter your password"
                            type="password"
                            {...register("password", {required: true})}
                        />

                        <Button 
                            type="submit"
                            className="w-full"    
                        >Sign in</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
