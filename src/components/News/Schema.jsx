import * as Yup from "yup";

export const Schema = Yup.object({
  title: Yup.string().min(4).required("Please enter title for news"),
  text: Yup.string().min(10).required("Please enter some text for news"),
});
