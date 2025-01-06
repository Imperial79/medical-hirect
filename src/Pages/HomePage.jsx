import { useContext, useEffect, useRef, useState } from "react";
import KOutlinedButton from "../components/kOutlinedButton";
import JobCard from "../components/JobCard";
import Hero from "../components/Hero";
import jobFilter from "../assets/job-filter.svg";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import { KButton, KDropDown, KTextField } from "../components/components";
import Scaffold from "../components/Scaffold";
import noData from "../assets/no-data.svg";

function HomePage() {
	const [loading, setLoading] = useState(false);
	const [rolesList, setRolesList] = useState([]);
	const [vacancyList, setvacancyList] = useState([]);
	const [statesList, setstatesList] = useState([]);
	const [selectedState, setSelectedState] = useState("Pan India");
	const [selectedRole, setselectedRole] = useState("1");
	const [selectedDistance, setselectedDistance] = useState("");
	const [pageNo, setpageNo] = useState(0);
	const [citySearch, setCitySearch] = useState("");
	const [searchKey, setSearchKey] = useState("");

	async function fetchRoles() {
		try {
			const response = await dbObject.get("/role/fetch-roles.php");
			if (!response.data.error) {
				setRolesList(response.data.response);
			}
		} catch (error) {}
	}

	async function fetchVacancies() {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("pageNo", pageNo);
			formData.append("searchKey", searchKey);
			formData.append("city", citySearch);
			formData.append("state", selectedState);
			formData.append("distanceRange", selectedDistance);
			formData.append("roleId", selectedRole);
			const response = await dbObject.post(
				"/vacancy/fetch-vacancies.php",
				formData
			);
			if (!response.data.error) {
				setvacancyList(response.data.response);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	}

	async function fetchStates() {
		try {
			const response = await dbObject.get("/states/fetch-states.php");
			if (!response.data.error) {
				setstatesList(response.data.response);
			}
		} catch (error) {}
	}

	async function clearFilter() {
		setselectedRole("1");
		setselectedDistance("");
		setSearchKey("");
		setCitySearch("");
		setSelectedState("Pan India");
		setpageNo(0);
		await fetchVacancies();
	}

	useEffect(() => {
		fetchRoles();
		fetchStates();
	}, []);

	useEffect(() => {
		fetchVacancies();
	}, [selectedRole, pageNo, selectedDistance, selectedState]);

	const contentRef = useRef(null);
	const [contentHeight, setContentHeight] = useState(0);

	useEffect(() => {
		setContentHeight(contentRef.current.scrollHeight + 12);
	}, [rolesList]);

	return (
		<Scaffold isLoading={loading}>
			<Hero
				title="Healthcare jobs & opportunities"
				subtitle="curated job openings for Physicians, Nurses, Doctors ..."
				buttonLabel="Search company"
			>
				<div className="items-center">
					<h1 className="font-semibold text-gray-700 text-center md:text-2xl text-lg tracking-wide">
						Trending Job searches
					</h1>
					<p className="font-medium text-gray-400 text-center mt-2 md:text-sm text-[10px]">
						Most frequent searches by healthcare job seekers like you
					</p>
				</div>
			</Hero>

			<div className="grid md:grid-cols-[25%_75%] gap-5 md:p-10 p-2 min-h-screen max-w-[1500px] mx-auto">
				<div
					ref={contentRef}
					className={`w-full md:sticky top-[90px] h-[${contentHeight}px] bg-white rounded-xl pt-[12px] px-[12px] flex flex-col gap-5`}
				>
					<div>
						<label className="kLabel mb-3">Filter by Role</label>
						<div className="flex flex-wrap">
							{rolesList.map((data, index) => (
								<div key={index}>
									<KOutlinedButton
										onClick={() => {
											setselectedRole(data.id);
										}}
										isActive={selectedRole == data.id}
										label={data.title}
									/>
								</div>
							))}
						</div>
					</div>
					<div>
						<label className="kLabel mb-3">Distance (KM)</label>
						<div className="flex flex-wrap">
							<KOutlinedButton
								id={0}
								label="0 - 100 kms"
								isActive={selectedDistance === "0-100"}
								onClick={() => {
									setselectedDistance("0-100");
								}}
							/>
							<KOutlinedButton
								id={0}
								label="100 - 200 kms"
								isActive={selectedDistance === "100-200"}
								onClick={() => {
									setselectedDistance("100-200");
								}}
							/>
							<KOutlinedButton
								id={0}
								label="200 - 300 kms"
								isActive={selectedDistance === "200-300"}
								onClick={() => {
									setselectedDistance("200-300");
								}}
							/>
						</div>
					</div>

					<div>
						<input
							type="search"
							name="city"
							id="city"
							className="rounded-full border border-gray-300 text-gray-900 text-sm w-full"
							placeholder="Search city"
							value={citySearch}
							onChange={(e) => {
								setCitySearch(e.target.value);
							}}
						/>

						<KDropDown
							id="state"
							name="state"
							label="Search by state"
							margin="mt-2"
							onChange={(e) => {
								setSelectedState(e.target.value);
							}}
							value={selectedState}
						>
							{statesList.map((data, index) => (
								<option key={index} value={data.stateName}>
									{data.stateName}
								</option>
							))}
						</KDropDown>
					</div>

					<div className="grid md:grid-cols-2 grid-cols-1 gap-2">
						<button
							onClick={fetchVacancies}
							className="rounded-full py-2 px-3 bg-blue-900 text-white text-[12px]"
						>
							Apply
						</button>
						<button
							onClick={clearFilter}
							className="rounded-full py-2 px-3 bg-amber-200 text-black text-[12px]"
						>
							Clear
						</button>
					</div>
				</div>

				{vacancyList && vacancyList.length > 0 ? (
					<div className="bg-white rounded-xl">
						<div className="px-0 md:px-5">
							<h2
								ref={openingsRef}
								className="my-10 font-medium text-gray-700 text-center text-xl"
							>
								Recent Openings
							</h2>
							{vacancyList.map((data, index) => (
								<div key={index}>
									<JobCard data={data} />
								</div>
							))}
							<nav
								className="flex items-center flex-column flex-wrap md:flex-row justify-around p-4"
								aria-label="Table navigation"
							>
								<span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
									Showing{" "}
									<span className="font-semibold text-gray-900 light:text-white">
										{vacancyList.length}
									</span>{" "}
									of Page
									<span className="font-semibold text-gray-900 light:text-white">
										{" "}
										{pageNo + 1}
									</span>
								</span>
								<ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
									<li>
										<button
											onClick={() => {
												if (pageNo > 0) {
													setpageNo(pageNo - 1);
												}
											}}
											className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
										>
											Previous
										</button>
									</li>
									<li>
										<button
											onClick={() => {
												setpageNo(pageNo + 1);
											}}
											className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
										>
											Next
										</button>
									</li>
								</ul>
							</nav>
						</div>
					</div>
				) : (
					<div className="flex flex-col justify-center items-center gap-5">
						<img src={noData} alt="no-data" className="mx-auto h-48 w-4h-48" />
						<h1 className="text-2xl text-gray-800 font-medium mx-auto text-center">
							Sorry! No data found
						</h1>
					</div>
				)}
			</div>
		</Scaffold>
	);
}

export default HomePage;
