import { Colors } from "@/constants/Colors";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import CustomSemiBoldText from "@/UI/Text/CustomSemiBoldText";
import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { styles } from "./outfitForm.style";
import Button from "../Button/Button";
import AddImage from "./AddImage";
import { router } from "expo-router";

const OutfitForm = () => {
  const categories = [
    { value: "freeze", title: "🥶" },
    { value: "chill", title: "😣" },
    { value: "neutral", title: "🙂" },
    { value: "warm", title: "😎" },
    { value: "hot", title: "🥵" },
  ];
  const [category, setCategory] = useState(categories[0].value);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      stickyHeaderIndices={[0]}
      style={styles.container}
    >
      <Pressable onPress={() => router.back()}>
        <CustomRegularText style={styles.closeText}>❌</CustomRegularText>
      </Pressable>
      <CustomSemiBoldText style={styles.title}>
        Создание нового образа
      </CustomSemiBoldText>
      <View style={styles.inputsWrapper}>
        <AddImage />

        <View style={styles.inputWrapper}>
          <CustomRegularText style={styles.label}>
            Выбери, в какую погоду ты бы надела этот образ
          </CustomRegularText>
          <View style={styles.categories}>
            {categories.map((item) => (
              <Pressable
                key={item.value}
                style={[
                  styles.category,
                  item.value === category && { backgroundColor: Colors.gray },
                ]}
                onPress={() => setCategory(item.value)}
              >
                <CustomRegularText style={styles.categoryText}>
                  {item.title}
                </CustomRegularText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <CustomRegularText style={styles.label}>
            Добавь описание (необязательно)
          </CustomRegularText>

          <TextInput multiline={true} numberOfLines={4} style={styles.input} />
        </View>

        <Button style={styles.saveBtn}>Сохранить</Button>
      </View>
    </ScrollView>
  );
};

export default OutfitForm;
