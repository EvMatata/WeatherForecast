import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {BlurView} from "expo-blur";
import {getWindDirection} from "@/utils/getWindDirection";
import {WeatherData} from "@/typec";
import {formatDate} from "@/utils/formatDate";

interface WeatherCardProps {
	weather: WeatherData;
}

export const WeatherCard = ({ weather }: WeatherCardProps) => (
	<BlurView intensity={30} tint="light" style={styles.result}>
		<View style={styles.weatherContainer}>
			<View style={styles.weatherCity}>
				<Text style={styles.city}>
					{weather.name}, {weather.sys.country}
				</Text>
				<Text>{weather.weather[0].description}</Text>
			</View>
			
			<Text>{formatDate(weather.dt)}</Text>
		</View>
		
		<View style={styles.weatherContainer}>
			<Text style={styles.temperature}>{Math.round(weather.main.temp)} °C</Text>
			<Image
				source={{
					uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
				}}
				style={styles.icon}
			/>
		</View>
		
		<View style={styles.weatherContainer}>
			<Text>Feels like: {weather.main.feels_like} °C</Text>
			<Text>
				{weather.wind.speed} m/s, {getWindDirection(weather.wind.deg)}
			</Text>
		</View>
	</BlurView>
);

const styles = StyleSheet.create({
	result: {
		width: 410,
		borderRadius: 16,
		padding: 20,
		marginTop: 20,
		overflow: "hidden",
	},
	weatherContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 40,
	},
	weatherCity: {
		flexDirection: "column",
	},
	temperature: {
		color: '#fff',
		fontSize: 45,
		fontWeight: "bold",
	},
	city: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#05172C",
	},
	icon: {
		width: 120,
		height: 120,
	},
});
