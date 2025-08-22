import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getWindDirection} from "@/utils/getWindDirection";
import {BlurView} from "expo-blur";

export default function WeatherDetails({ day, onClose }: { day: any; onClose: () => void }) {
	if (!day) return null;
	
	const main = day.details[0].main;
	const weather = day.details[0].weather[0];
	const wind = day.details[0].wind;
	const clouds = day.details[0].clouds;
	const rain = day.details[0].rain;
	const snow = day.details[0].snow;
	
	return (
		<BlurView intensity={30} tint="light"  style={styles.container}>
			<Text style={styles.title}>
				{new Date(day.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
			</Text>
			<Text style={styles.description}>{weather.description}</Text>
			
			<View style={styles.row}>
				<Image
					source={{ uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png` }}
					style={{ width: 100, height: 100 }}
				/>
				<Text style={styles.temp}>{Math.round(main.temp)}°C</Text>
			</View>
			{rain && <Text>🌧 Rain: {rain["3h"] || rain["1h"]} мм</Text>}
			{snow && <Text>❄️ Snow: {snow["3h"] || snow["1h"]} мм</Text>}
			
			<View style={styles.rowBlock}>
				<View style={styles.block}>
					<Text>Feels like: {Math.round(main.feels_like)}°C</Text>
					<Text>Humidity: {main.humidity}%</Text>
					<Text>Pressure: {main.pressure} hPa</Text>
				</View>
				
				<View style={styles.block}>
					<Text>Wind: {wind.speed} m/s, {getWindDirection(wind.deg)}</Text>
					<Text>Cloudiness: {clouds.all}%</Text>
				</View>
			</View>
		
			
			<TouchableOpacity style={styles.closeButton} onPress={onClose}>
				<Text style={{ color: "#fff" }}>Close</Text>
			</TouchableOpacity>
		</BlurView>
	);
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		borderRadius: 16,
		padding: 25,
		width: '93%',
		overflow: "hidden",
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 1
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},
	rowBlock: {
		marginTop: 10,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	temp: {
		fontSize: 36,
		fontWeight: "bold",
		marginLeft: 10
	},
	description: {
		fontSize: 16,
		fontStyle: "italic",
		marginBottom: 16 },
	block: {
		marginBottom: 12
	},
	closeButton: {
		marginTop: 16,
		padding: 12,
		borderRadius: 6,
		backgroundColor: "#007AFF",
		alignItems: "center",
	},
});
