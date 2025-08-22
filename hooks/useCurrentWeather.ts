import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {WeatherData} from "@/typec";
import Constants from "expo-constants";
import {useWeatherContext} from "@/context/WeatherContext";

const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey || "";

export function useCurrentWeather() {
	const { city, setCity } = useWeatherContext();
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState(false);
	
	const fetchWeather = useCallback(async (queryCity?: string) => {
		const c = queryCity || city || "London";
		setLoading(true);
		try {
			const response = await axios.get<WeatherData>(
				`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
					c
				)}&appid=${API_KEY}&units=metric&lang=en`
			);
			setWeather(response.data);
			setCity(c);
		} catch (error: any) {
			console.error(error.response?.data || error.message);
			setWeather(null);
		} finally {
			setLoading(false);
		}
	}, [city, setCity]);
	
	useEffect(() => {
		if (!city) {
			setWeather(null);
			return;
		}
		void fetchWeather(city);
	}, [city]);
	
	const formatTime = (timestamp: number, locale = "en-US") =>
		new Date(timestamp * 1000).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
	
	return {
		city,
		setCity,
		weather,
		loading,
		fetchWeather,
		formatTime,
	};
}
