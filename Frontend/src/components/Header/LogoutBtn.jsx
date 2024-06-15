import React from "react";
import { logout as storeLogout } from "../../store/authenticationSlice.js";
import { useDispatch } from "react-redux";
import axios from "axios";
import conf from "../../conf/conf.js";

function LogoutBtn() {
	const dispatch = useDispatch();
	const logoutHandler = () => {
		axios.post(`${conf.backendUrl}/users/logout`, {}, { withCredentials: true })
		.then((res) => {
			if (res.data.status === 200) {
				dispatch(storeLogout());
			}
		});
	};

	return (
		<button
			className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
			onClick={logoutHandler}
		>
			Logout
		</button>
	);
}

export default LogoutBtn;
