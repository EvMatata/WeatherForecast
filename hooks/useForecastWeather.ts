import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Constants from "expo-constants";
import {useWeatherContext} from "@/context/WeatherContext";
import {ForecastItem} from "@/typec";

const API_KEY = Constants.expoConfig?.extra?.openWeatherApiKey || "";

export function useForecastWeather() {
	const { city } = useWeatherContext();
	const [forecast, setForecast] = useState<ForecastItem[] | null>(null);
	const [loading, setLoading] = useState(false);
	
	const fetchForecast = useCallback(async () => {
		setLoading(true);
		try {
			const res = await axios.get(
				`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
					city
				)}&units=metric&lang=en&appid=${API_KEY}`
			);
			
			const list = res.data.list;
			
			const dailyMap: Record<string, any[]> = {};
			list.forEach((item: any) => {
				const date = item.dt_txt.split(" ")[0];
				if (!dailyMap[date]) dailyMap[date] = [];
				dailyMap[date].push(item);
			});
			
			const dailyForecast: ForecastItem[] = Object.entries(dailyMap).map(
				([date, values]) => {
					const temps = values.map((v) => v.main.temp);
					const tempMin = Math.min(...temps);
					const tempMax = Math.max(...temps);
					const { description, icon } = values[0].weather[0];
					return {
						date,
						tempMin,
						tempMax,
						weatherDescription: description,
						weatherIcon: icon,
						details: values,
					};
				}
			);
			
			setForecast(dailyForecast.slice(0, 5));
		} catch (error: any) {
			console.error(error.response?.data || error.message);
			setForecast([]);
		} finally {
			setLoading(false);
		}
	}, [city]);
	
	useEffect(() => {
		void fetchForecast();
	}, [city]);
	
	return {
		forecast,
		loading,
		fetchForecast,
	};
}
