import React, {useCallback, useState} from "react";
import {ActivityIndicator, StyleSheet, View,} from "react-native";
import {useCurrentWeather} from "@/hooks/useCurrentWeather";
import {useSearchHistory} from "@/hooks/useSearchHistory";
import {AnimatedWrapper} from "@/components/AnimatedWrapper";
import {WeatherCard} from "@/components/WeatherCard";
import {WeatherSearchBar} from "@/components/WeatherSearchBar";

export default function CurrentWeather() {
	const { city, setCity, weather, loading, fetchWeather, formatTime } =
		useCurrentWeather();
	const [inputValue, setInputValue] = useState(city);
	const { history, saveCity, deleteCity, undoDelete, lastDeleted, setLastDeleted } = useSearchHistory();
	
	const handleSearch = useCallback(async (queryCity?: string) => {
		const c = (queryCity ?? inputValue).trim();
		if (!c) return;
		
		setCity(c);
		await fetchWeather(c);
		await saveCity(c);
		setInputValue('')
	}, [inputValue, setCity, fetchWeather, saveCity, setInputValue]);
	
	// [inputValue, inputValue, setInputValue]
	
	const closeUndo = useCallback(() => setLastDeleted(null), [setLastDeleted]);
	
	return (
		<View style={styles.container}>
			
			<WeatherSearchBar
				inputValue={inputValue}
				setInputValue={setInputValue}
				handleSearch={handleSearch}
				history={history}
				deleteCity={deleteCity}
				lastDeleted={lastDeleted}
				undoDelete={undoDelete}
				closeUndo={closeUndo}
			/>
			
			{loading && <ActivityIndicator size="large" color="#0000ff" />}
			
			<AnimatedWrapper duration={600} delay={50} index={6}>
				{weather && <WeatherCard weather={weather} />}
			</AnimatedWrapper>
		</View>
		
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		justifyContent: "center",
		alignItems: "center",
	},
});
