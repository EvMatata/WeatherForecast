import React from "react";
import {StyleSheet, Text as RNText, TextInput, TouchableOpacity, View,} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import {SearchHistoryPopover} from "@/components/SearchHistoryPopover";

interface Props {
	inputValue: string;
	setInputValue: (value: string) => void;
	handleSearch: (queryCity?: string) => void;
	history: string[];
	deleteCity: (city: string) => void;
	lastDeleted: string | null;
	undoDelete: () => void;
	closeUndo: () => void;
}

export function WeatherSearchBar({
	inputValue,
	setInputValue,
	handleSearch,
	history,
	deleteCity,
	lastDeleted,
	undoDelete,
	closeUndo,
}: Props) {
	return (
		<View>
			<View style={styles.weatherHeader}>
				<View style={styles.weatherSearch}>
					<SearchHistoryPopover
						history={history}
						onSelect={(city) => {
							setInputValue(city);
							void handleSearch(city);
						}}
						onDelete={deleteCity}
					/>
					<TextInput
						style={styles.input}
						placeholder="Enter city"
						value={inputValue}
						onChangeText={setInputValue}
					/>
				</View>
				
				<TouchableOpacity
					disabled={inputValue.length < 3}
					onPress={() => handleSearch()}
				>
					<Feather name="search" size={24} color="black" />
				</TouchableOpacity>
			</View>
			
			{lastDeleted && (
				<View style={styles.undoContainer}>
					<TouchableOpacity onPress={undoDelete} style={styles.undoButton}>
						<RNText style={{ color: "#fff" }}>
							Undo Delete: {lastDeleted}
						</RNText>
					</TouchableOpacity>
					
					<TouchableOpacity onPress={closeUndo} style={styles.closeUndoButton}>
						<RNText style={{ color: "#fff" }}>Delete: {lastDeleted}</RNText>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	weatherHeader: {
		paddingHorizontal: 20,
		width: "88%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		borderRadius: 16,
	},
	weatherSearch: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	input: {
		width: 100,
	},
	undoContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		gap: 5,
	},
	undoButton: {
		marginTop: 0,
		padding: 5,
		backgroundColor: "#007AFF",
		borderRadius: 6,
	},
	closeUndoButton: {
		padding: 5,
		backgroundColor: "#FF453A",
		borderRadius: 6,
	},
});
