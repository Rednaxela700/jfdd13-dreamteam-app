import * as Yup from "yup";

export const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(40, 'Title can be set up to 40 characters')
    .required("This field is mandatory")
    .matches(new RegExp(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/), "This field can contain only letters"),
  date: Yup.string()
    .required("This field is mandatory"),
  price: Yup.number()
    .moreThan(20, "Minimum price per night is 2000 EUR")
    .lessThan(2001, "Maximum price per night is 2000 EUR")
    .positive("Price must be a positive number")
    .required("This field is mandatory"),
  city: Yup.string()
    .matches(new RegExp(/^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s]+$/), "This field can contain only letters")
    .required("This field is mandatory"),
  continent: Yup.string()
    .required("This field is mandatory"),
  description: Yup.string()
    .max(400, "Description can be set up to 400 characters"),
  email: Yup.string()
    .required("This field is mandatory")
    .matches(new RegExp(/^\S+@\S+\.\S+$/), 'Unrecognized email'),
  terms: Yup.boolean()
    .oneOf([true], 'This field must be marked.'),
  tripImageUrl: Yup.string()
    .required("Photo is mandatory")
});