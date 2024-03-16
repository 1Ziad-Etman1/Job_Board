import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import CandidateD from "./components/dashboards/candidate/CandidateD";
import EmployerD from "./components/dashboards/employer/EmployerD";
import JobList from "./components/jobs/JobList";
import JobDetails from "./components/jobs/JobDetails";
import AddJob from "./components/jobs/AddJob";
import EmployerJobs from "./components/jobs/EmployerJobs";
import ApplicationForm from "./components/job-application/ApplicationForm";
import NotFound from "./components/error/NotFound";

function AppRouter() {
	return (
		<>
			<Router>
				<div style={{ paddingTop: "30px", paddingBottom: "50px" }}>
					<Header />
					<Routes>
						<Route exact path="/" element={<Home />} />{" "}
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/jobs" element={<JobList />} />
						<Route
							exact
							path="/jobs/:jobId"
							element={<JobDetails />}
						/>
						<Route exact path="/add-job/" element={<AddJob />} />
						<Route
							exact
							path="/employer-dashboard"
							element={<EmployerD />}
						/>
						<Route
							exact
							path="/employer-jobs/:id"
							element={<EmployerJobs />}
						/>
						<Route
							exact
							path="/candidate-dashboard"
							element={<CandidateD />}
						/>
						<Route
							exact
							path="/apply/:jobId"
							element={<ApplicationForm />}
						/>
						<Route path="*" element={<NotFound />} />{" "}
					</Routes>
					<Footer />
				</div>
			</Router>
		</>
	);
}

export default AppRouter;
