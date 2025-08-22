import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useWeatherContext} from "@/context/WeatherContext";
import {useCurrentWeather} from "@/hooks/useCurrentWeather";

const DEFAULT_CITY = "London";
const STORAGE_KEY = "searchHistory";

export const useSearchHistory = () => {
	const { fetchWeather } = useCurrentWeather();
	const { city, setCity } = useWeatherContext();
	
	const [history, setHistory] = useState<string[]>([]);
	const [lastDeleted, setLastDeleted] = useState<string | null>(null);
	
	const saveToStorage = async (data: string[]) => {
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch (e) {
			console.error("Error loading story:", e);
		}
	};
	
	const loadHistory = useCallback(async () => {
		try {
			const stored = await AsyncStorage.getItem(STORAGE_KEY);
			setHistory(stored ? JSON.parse(stored) : []);
		} catch (e) {
			console.error("Error loading story:", e);
		}
	}, []);
	
	useEffect(() => {
		void loadHistory();
	}, [loadHistory]);
	
	const saveCity = async (newCity: string) => {
		const normalized = newCity.trim().toLowerCase();
		if (!normalized) return;

		const updated = [normalized, ...history.filter((c) => c.toLowerCase() !== normalized)].slice(0, 10);

		setHistory(updated);
		await saveToStorage(updated);
	};
	
	const deleteCity = async (cityToDelete: string) => {
		const normalized = cityToDelete.trim().toLowerCase();
		const newHistory = history.filter((c) => c.toLowerCase() !== normalized);
		setHistory(newHistory);
		setLastDeleted(cityToDelete);
		await saveToStorage(newHistory);
		
		if (city.trim().toLowerCase() === normalized) {
			const fallback = newHistory[0] ?? DEFAULT_CITY;
			setCity(fallback);
			await fetchWeather(fallback);
		}
	};
	
	const undoDelete = async () => {
		if (!lastDeleted) return;
		
		const restored = lastDeleted.trim();
		const newHistory = [restored, ...history.filter((c) => c.toLowerCase() !== restored.toLowerCase())].slice(0, 10);
		setHistory(newHistory);
		await saveToStorage(newHistory);
		setLastDeleted(null);
		setCity(restored);
		await fetchWeather(restored);
	};
	
	return {
		history,
		lastDeleted,
		setLastDeleted,
		saveCity,
		deleteCity,
		undoDelete,
		loadHistory,
	};
};
