import { healthCheckApi } from "./api/apis/healthCheckApi";
import { Route, Routes, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import { Container } from "@mui/material";
import AuthRoute from "./routes/AuthRoute/AuthRoute.jsx";
import { userApi } from "./api/apis/userApi.js";
import { jwtDecode } from "jwt-decode";
import UserRoute from "./routes/UserRoute/UserRoute.jsx";
import { useQuery } from "@tanstack/react-query";
import { api } from "./api/config/axiosConfig.js";
import MainHeader from "./components/MainHeader/MainHeader.jsx";

function App() {
	const navigate = useNavigate();

	const healthCheckQuery = useQuery({ //쿼리 3버전으로 업글함.쿼리 5버전부터는 객체로 입력. fn은funtion
		queryKey: ["healthCheckQuery"], 
		queryFn: healthCheckApi,
		cacheTime: 1000 * 60 * 10, //캐시 유지 시간(언마운트 이후),
		staleTime: 1000 * 60 * 10, //10분마다 최신의 캐시 상태 유지(refetch)
	});

	if(!healthCheckQuery.isLoading) {
		console.log(healthCheckQuery.data.data.status);
	}

	const userQuery = useQuery({
		queryKey: ["userQuery"],
		queryFn: async () => {
			const accessToken = localStorage.getItem("AccessToken");
			if(!accessToken) {
				return null;
			}
			const decodedJwt = jwtDecode(accessToken);
			//console.log(decodedJwt);
			return await userApi(decodedJwt.userId);
		}
	});

  	return (
    	<Container maxWidth="lg">
			{
				(!userQuery.isLoading && !userQuery.isRefetching) &&
				<>
					<MainHeader />
					<Routes>
						<Route path="/" element={<IndexPage />} />
						<Route path="/user/*" element={<UserRoute />} />
						<Route path="/auth/*" element={<AuthRoute />} />
					</Routes>
				</>
			}
    	</Container>
  	);
}

export default App;