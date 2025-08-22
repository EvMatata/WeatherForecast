import React, {useState} from "react";
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BlurView} from "expo-blur";
import WeatherDetails from "./WeatherDetails";
import {ForecastItem} from "@/typec";
import {useForecastWeather} from "@/hooks/useForecastWeather";
import {AnimatedWrapper} from "@/components/AnimatedWrapper";

export default function WeatherForecastDays() {
	const { forecast, loading } = useForecastWeather();
	const [selectedDay, setSelectedDay] = useState<ForecastItem | null>(null);
	
	if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
	if (forecast?.length === 0) return <Text>No forecast data</Text>;
	
	return (
		<View style={{ flex: 1, marginTop: 20, marginLeft: 10 }}>
			{selectedDay ? (
				<AnimatedWrapper duration={400} delay={100}>
					<WeatherDetails day={selectedDay} onClose={() => setSelectedDay(null)} />
				</AnimatedWrapper>
				
			) : (
				<FlatList
					data={forecast}
					horizontal
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.date}
					renderItem={({ item }) => (
						<AnimatedWrapper duration={600} delay={100}>
							<BlurView intensity={50} tint="light" style={styles.blurCard}>
								<TouchableOpacity style={styles.card} onPress={() => setSelectedDay(item)}>
									<Text style={styles.date}>
										{new Date(item.date).toLocaleDateString("en-GB", {
											weekday: "short",
											day: "numeric",
											month: "short",
										})}
									</Text>
									
									<Text style={styles.temp}>{Math.round(item.tempMax)}°C</Text>
									
									<Image
										source={{
											uri: `https://openweathermap.org/img/wn/${item.weatherIcon}@2x.png`,
										}}
										style={styles.icon}
									/>
									
									<Text>
										{Math.round(item.tempMin)}°C / {Math.round(item.tempMax)}°C
									</Text>
									
									<Text style={styles.description}>{item.weatherDescription}</Text>
								</TouchableOpacity>
							</BlurView>
						</AnimatedWrapper>
						
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: 140,
		height: 170,
		paddingVertical: 5,
		margin: 5,
		borderRadius: 8,
		alignItems: "center",
	},
	blurCard: {
		borderRadius: 12,
		overflow: "hidden",
		margin: 5,
	},
	temp: {
		fontSize: 22,
		fontWeight: "500",
		textTransform: "capitalize",
		marginVertical: 4,
	},
	description: {
		fontSize: 12,
		textTransform: "capitalize",
		marginVertical: 4,
	},
	icon: {
		width: 50,
		height: 50,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	date: {
		fontWeight: "bold",
		fontSize: 14,
		marginBottom: 4
	},
});
