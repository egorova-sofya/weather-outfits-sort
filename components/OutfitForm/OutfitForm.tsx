import { Colors } from "@/constants/Colors";
import CustomRegularText from "@/UI/Text/CustomRegularText";
import CustomSemiBoldText from "@/UI/Text/CustomSemiBoldText";
import React, { FC, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { styles } from "./outfitForm.style";
import Button from "../Button/Button";
import AddImage from "./AddImage";
import { router } from "expo-router";
import { IOutfit } from "@/types/types";
import { categories } from "@/constants";

interface Props {
  onSubmit: (values: FormData) => void;
  initialValues?: IOutfit;
}

const OutfitForm: FC<Props> = ({ onSubmit, initialValues }) => {
  const [values, setValues] = useState<IOutfit>(
    initialValues || {
      image: "",
      description: "",
      category: categories[0].value,
    }
  );

  const handleValues = (value: any, key: keyof IOutfit) => {
    if (values) {
      setValues({ ...values, [key]: value });
    } else {
      setValues({ [key]: value } as IOutfit);
    }
  };

  const handleSubmit = () => {
    const form = new FormData();

    form.append("description", values.description);
    form.append("category", values.category);

    form.append("image", {
      uri: values.image.uri,
      name: values.image.fileName,
      filename: values.image.fileName,
      type: values.image.mimeType,
    } as any);

    onSubmit(form);
  };

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
        <AddImage
          image={values?.image}
          setImage={(value) => handleValues(value, "image")}
        />

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
                  item.value === values.category && {
                    backgroundColor: Colors.gray,
                  },
                ]}
                onPress={() => handleValues(item.value, "category")}
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

          <TextInput
            value={values.description}
            onChangeText={(value) => handleValues(value, "description")}
            multiline={true}
            numberOfLines={4}
            style={styles.input}
          />
        </View>

        <Button onPress={handleSubmit} style={styles.saveBtn}>
          Сохранить
        </Button>
      </View>
    </ScrollView>
  );
};

export default OutfitForm;
