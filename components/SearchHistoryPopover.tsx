import React, {useRef, useState} from "react";
import {Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Popover from "react-native-popover-view";
import {MaterialIcons} from "@expo/vector-icons";

interface Props {
	history: string[];
	onSelect: (city: string) => void;
	onDelete: (city: string) => void;
}

export function SearchHistoryPopover({ history, onSelect, onDelete }: Props) {
	const touchableRef =  useRef<any>(null)
	const [visible, setVisible] = useState(false);
	
	if (history.length === 0) return null;
	
	return (
		<View>
			<TouchableOpacity
				ref={touchableRef}
				onPress={() => setVisible(true)}
			>
				<MaterialIcons name="history" size={34} color="#FF453A" />
			</TouchableOpacity>
			
			<Popover
				isVisible={visible}
				from={touchableRef}
				onRequestClose={() => setVisible(false)}
				backgroundStyle={{ backgroundColor: "rgba(0,0,0,0.1)" }}
				popoverStyle={styles.popover}
			>
				<ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
					{history.map((item, index) => (
						<View key={index} style={styles.historyItemRow}>
							<Pressable
								style={{ flex: 1 }}
								onPress={() => {
									onSelect(item);
									setVisible(false);
								}}
							>
								<Text>{item}</Text>
							</Pressable>
							
							<TouchableOpacity
								style={styles.deleteButton}
								onPress={() => {
									onDelete(item)
									setVisible(false);
								}}
							>
								<MaterialIcons name="close" size={18} color="#ff3b30" />
							</TouchableOpacity>
						</View>
					))}
				</ScrollView>
			</Popover>
		</View>
	);
}

const styles = StyleSheet.create({
	historyItemRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 8,
		paddingVertical: 6,
		
	},
	deleteButton: {
		marginLeft: 8,
		padding: 4,
	},
	popover: {
		backgroundColor: "#fff",
		borderRadius: 14,
		padding: 10,
		width: 180,
		maxHeight: 300,
	},
	historyItem: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
});
