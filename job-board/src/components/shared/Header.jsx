import { Link } from "react-router-dom";
import "./Header.scss";
import Home from "../Home";

const Header = () => {
	const loggedIn = true;
	return (
		<>
			<div className="header">
				<Link className="logo" to="/">
					Job Board
				</Link>
				<div className="links">
					{loggedIn ? (
						<>
							<Link to="/jobs" className="link">
								Jobs
							</Link>
							<Link to="/employer-dashboard" className="link">
								Employer Dashboard
							</Link>
							<Link to="/candidate-dashboard" className="link">
								Candidate Dashboard
							</Link>
						</>
					) : (
						<>
							<Link to="/login" className="link">
								Login
							</Link>
							<Link to="/register" className="link">
								Register
							</Link>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default Header;
