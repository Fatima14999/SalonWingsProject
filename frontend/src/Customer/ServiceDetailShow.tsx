import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

const ServiceDetailShow = () => {
  const [Service] = useState({
    id: "1",
    name: "MakeUp",
    type: ["Signature", "Party"],
    logourl:
      "https://i.pinimg.com/originals/2a/a8/a1/2aa8a17c2c3075daf373f10a7eeea3a4.jpg",
  });

  const [person, setPerson] = useState(1);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);

  const AddPerson = () => setPerson(p1 => p1 + 1);
  const subPerson = () => setPerson(p1 => (p1 > 1 ? p1 - 1 : p1));

  const onchange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // iOS keeps picker open, Android closes
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: Service.logourl }}
        style={{ height: 200, width: "100%" }}
      />
      <View>
        <View style={styles.card1}>
          <Text style={styles.Text}>{Service.name}</Text>
        </View>

        <FlatList
          data={Service.type}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, marginLeft: 10, marginTop: 5 }}>
              {item}
            </Text>
          )}
        />

        <View style={[styles.Person, styles.card1]}>
          <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>
            No of Person
          </Text>
          <TouchableOpacity
            style={[styles.card, { marginLeft: 90 }]}
            onPress={AddPerson}
          >
            <Text style={styles.Icon}>+</Text>
          </TouchableOpacity>
          <Text style={[styles.Icon, { marginLeft: 10 }]}>{person}</Text>
          <TouchableOpacity style={styles.card} onPress={subPerson}>
            <Text style={styles.Icon}>-</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={showDatepicker} style={styles.card1}>
          <Text style={{ fontSize: 16, marginLeft: 10, color: "white" }}>
            Select Date
          </Text>
        </TouchableOpacity>

        <Text style={{ marginLeft: 10, marginTop: 10 }}>
          Selected: {date.toLocaleDateString()} {date.toLocaleTimeString()}
        </Text>
        
        <TouchableOpacity onPress={showTimepicker} style={styles.card1}>
          <Text style={{ fontSize: 16, marginLeft: 10, color: "white" }}>
            Select Date
          </Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onchange}
        />
      )}
    </SafeAreaView>
  );
};

export default ServiceDetailShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  Person: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  Icon: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    width: 30,
    height: 30,
    backgroundColor: "blue",
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  card1: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#3D726D",
    elevation: 5,
  },
});
