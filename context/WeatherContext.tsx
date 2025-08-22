import React, {createContext, ReactNode, useContext, useState} from "react";

type WeatherContextType = {
	city: string;
	setCity: (city: string) => void;
};

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
	const [city, setCity] = useState("London");
	
	return (
		<WeatherContext.Provider value={{ city, setCity }}>
			{children}
		</WeatherContext.Provider>
	);
};

export const useWeatherContext = () => {
	const context = useContext(WeatherContext);
	if (!context) {
		throw new Error("useWeatherContext must be used within WeatherProvider");
	}
	return context;
};
