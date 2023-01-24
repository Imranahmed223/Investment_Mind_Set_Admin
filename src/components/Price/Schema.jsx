import * as Yup from "yup";

export const Schema = Yup.object({
  name: Yup.string().min(2).required("Please enter coin Name"),
  title: Yup.string().min(1).required("Please enter coin title"),
  quantity: Yup.number().min(1).required("Please enter coin quantity"),
  price: Yup.number().min(1).required("Please enter coin pirce"),
  presentage: Yup.number().min(1).required("Please enter coin presentage"),
});
