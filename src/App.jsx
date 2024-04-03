import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import moment from "moment";
// حتى يتم تفعيل اللغة العربية عليك استيراد ملفات ال local 
import 'moment/min/locales.js';
moment.locale("ar"); // تعيين اللغة العربية لـ moment.js


// MATERIAL UI COMPONENTS
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"],
  },
});

let cancelAxios = null;
function App() {
  // states
  const { t, i18n } = useTranslation();
  const [dateAndTime, setDateAndTime] = useState("");
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null, 
    max: null,
    icon: "",
  }); // for the all keys

  // event handlers
  function handleLanguageClick() {
    i18n.changeLanguage(i18n.language === "ar"? "en" : "ar");
    moment.locale(i18n.language === "ar"? "en" : "ar");
    setDateAndTime(moment().format('LLLL')); // تنسيق التاريخ والوقت باللغة العربية
  }
  // === event handlers ====

  // language change
  useEffect(() => {
    i18n.changeLanguage("ar");
  },[])
  // moment and api
  useEffect(() => {
    moment.locale("ar"); // تعيين اللغة العربية لـ moment.js
    setDateAndTime(moment().format('LLLL')); // تنسيق التاريخ والوقت باللغة العربية
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=35.56200&lon=45.31700&appid=24f7438ece98c2de5a5ce455b4f63b43",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancelAxios = c;
          }),
        }
      )
      .then((response) => {
        const number = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        setTemp((prevTemp) => ({
          ...prevTemp,
          min: min,
          max: max,
          description: description,
          number: number,
          icon: icon
        }));})
      .catch((error) => {
        console.log(new Error(error));
      });

      return () => {      // clean up
        console.log("clean up")
        // التحقق من وجود قيمة معينة قبل استدعاء الدالة
        if (cancelAxios) {
          cancelAxios();
        }
      }
  }, []);
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
                    {t("Sulaymaniyah")}
                  </Typography>

                  <Typography variant="body1" style={{ marginRight: "20px" }}>
                    {dateAndTime}
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
                      <Typography variant="h1" style={{ textAlign: "right" }}>
                        {temp.number}
                      </Typography>

                      {/* <img src={`https://openweathermap.org/img/wn/${temp.icon}@4x.png`} alt="icon-weather" /> */}
                    </div>
                    {/*== TEMP ==*/}

                    <Typography variant="h6">{t(temp.description)}</Typography>

                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h5>{t("min")}: {temp.min}</h5>
                      <h5 style={{ margin: "0px 20px" }}>|</h5>
                      <h5>{t("max")}: {temp.max}</h5>
                    </div>
                  </div>
                  {/*== DEGREE & DESCRIPTION ==*/}

                  <img src={`https://openweathermap.org/img/wn/${temp.icon}@4x.png`} alt="icon-weather" />
                  {/* <CloudIcon
                    style={{
                      fontSize: "200px",
                      color: "white",
                    }}
                  /> */}
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
              <Button style={{ color: "white" }} variant="text"
                      onClick={handleLanguageClick}>
                {i18n.language === "en" ? "Arabic" : "انكليزي"}
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
