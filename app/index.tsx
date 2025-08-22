import React from "react";
import {ImageBackground, StyleSheet, View} from "react-native";
import CurrentWeather from "@/components/CurrentWeather";
import WeatherForecastDays from "@/components/WeatherForecastDays";

export default function HomeScreen() {
	return (
		<ImageBackground
			source={require("../assets/wf_1.jpg")}
			style={styles.background}
			resizeMode="cover" // "contain" / "stretch"
		>
			<View style={styles.container}>
				<>
					<CurrentWeather />
					<WeatherForecastDays />
				</>
				
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		width: "100%",
		height: "100%",
	},
	container: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.3)",
	},
});
