import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";

// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";


const theme = createTheme({
	typography: {
		fontFamily: ["IBM"],
	},
});
function App() {

  const [temp, setTemp] = useState(0)
  useEffect(() => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35.56200&lon=45.31700&appid=24f7438ece98c2de5a5ce455b4f63b43").then((response) => {
      const responseTemp = Math.round(response.data.main.temp - 273.15);
      setTemp(responseTemp)
      console.log(temp)
    })
  },[])
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Container maxWidth="sm">
					{/* CONTENT CONTAINER */}
					<div
						style={{
							height: "100vh",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						{/* CARD */}
						<div
							dir="rtl"
							style={{
								width: "100%",
								background: "rgb(28 52 91 / 36%)",
								color: "white",
								padding: "20px",
								borderRadius: "15px",
								boxShadow: "0px 11px 1px rgba(0,0,0,0.05)",
							}}
						>
							{/* CONTENT */}
							<div>
								{/* CITY & TIME */}
								<div
									style={{
										display: "flex",
										alignItems: "end",
										justifyContent: "start",
									}}
									dir="rtl"
								>
									<Typography
										variant="h2"
										style={{
											marginRight: "20px",
											fontWeight: "600",
										}}
									>
										الرياض
									</Typography>

									<Typography
										variant="h5"
										style={{ marginRight: "20px" }}
									>
										الإثنين ١٠-١٠-٢٠٤٠
									</Typography>
								</div>
								{/* == CITY & TIME == */}

								<hr />

								{/* CONTAINER OF DEGREE + CLOUD ICON */}
								<div
									style={{
										display: "flex",
										justifyContent: "space-around",
									}}
								>
									{/* DEGREE & DESCRIPTION */}
									<div>
										{/* TEMP */}
										<div>
											<Typography
												variant="h1"
												style={{ textAlign: "right" }}
											>
												{temp}
											</Typography>

											{/* TODO: TEMP IMAGE */}
										</div>
										{/*== TEMP ==*/}

										<Typography variant="h6">
											broken clouds
										</Typography>

										{/* MIN & MAX */}
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}
										>
											<h5>الصغرى: 34</h5>
											<h5 style={{ margin: "0px 5px" }}>
												|
											</h5>
											<h5>الكبرى: 34</h5>
										</div>
									</div>
									{/*== DEGREE & DESCRIPTION ==*/}

									<CloudIcon
										style={{
											fontSize: "200px",
											color: "white",
										}}
									/>
								</div>
								{/*= CONTAINER OF DEGREE + CLOUD ICON ==*/}
							</div>
							{/* == CONTENT == */}
						</div>
						{/*== CARD ==*/}

						{/* TRANSLATION CONTAINER */}
						<div
							dir="rtl"
							style={{
								width: "100%",
								display: "flex",
								justifyContent: "end",
								marginTop: "20px",
							}}
						>
							<Button style={{ color: "white" }} variant="text">
								إنجليزي
							</Button>
						</div>
						{/*== TRANSLATION CONTAINER ==*/}
					</div>
					{/*== CONTENT CONTAINER ==*/}
				</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;
