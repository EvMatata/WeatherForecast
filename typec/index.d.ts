export interface WeatherData {
	name: string;
	dt: number;
	sys: {
		country: string;
		sunrise: number;
		sunset: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		humidity: number;
		pressure: number;
	};
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	temp: {
		day: number;
		min: number;
		max: number;
	};
	rain?: {
		"1h"?: number;
		"3h"?: number;
	};
	snow?: {
		"1h"?: number;
		"3h"?: number;
	};
}

export interface ForecastItem {
	date: string;
	tempMin: number;
	tempMax: number;
	weatherDescription: string;
	weatherIcon: string;
	details: any[];
}
