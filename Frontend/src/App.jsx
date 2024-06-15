import { useState, useEffect } from "react";
import "./App.css";
import { Header, Footer } from "./components/index.js";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authenticationSlice.js";
import { Outlet } from "react-router-dom";
import axios from "axios";
import conf from "./conf/conf.js";

function App() {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [reload, setReload] = useState(0);
	const status = useSelector(state => state.auth.status);

	useEffect(() => {
		setReload(prev => prev + 1);
	}, [status]);

	useEffect(() => {
		axios
			.get(`${conf.backendUrl}/users/get-user`, { withCredentials: true })
			.then((res) => {
				if (res.data.status === 200) {
					dispatch(login({userData: res.data.data}))
				} else {
					dispatch(logout());
				}			
			})
			.finally(() => {
				setLoading(false);
			})
	}, []);

	return !loading ? (
		<div className="min-h-screen flex flex-wrap content-between bg-gray-400">
			<div className="w-full block">
				<Header />
				<main>
					<Outlet key={reload} />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App;
