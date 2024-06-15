import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from './pages/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './pages/Signup.jsx';
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
import AuthenticationLayout from './components/AuthenticationLayout.jsx';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: (
					<AuthenticationLayout authentication={false}>
						<Login />
					</AuthenticationLayout>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthenticationLayout authentication={false}>
						<Signup />
					</AuthenticationLayout>
				),
			},
			{
				path: "/all-post",
				element: (
					<AuthenticationLayout authentication>
						{" "}
						<AllPosts />
					</AuthenticationLayout>
				),
			},
			{
				path: "/add-post",
				element: (
					<AuthenticationLayout authentication>
						{" "}
						<AddPost />
					</AuthenticationLayout>
				),
			},
			{
				path: "/edit-post/:slug",
				element: (
					<AuthenticationLayout authentication>
						{" "}
						<EditPost />
					</AuthenticationLayout>
				),
			},
			{
				path: "/post/:slug",
				element: <Post />,
			},
		],
	},
]);

// const router = createBrowserRouter(
// 	createRoutesFromElements(
// 		<Route path="/" element={<App />}> 
// 			<Route path="/" element={<Home />} />
// 			<AuthenticationLayout authentication={false}>
// 				<Route path="/login" element={<Login />} />
// 			</AuthenticationLayout>
// 		</Route>
// 	)
// );


ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
