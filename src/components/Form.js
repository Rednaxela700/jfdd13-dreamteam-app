import React from 'react';
import { Form, Input, TextArea, Button, Checkbox, Radio } from 'semantic-ui-react';
import styles from './Form.module.css';
import * as Yup from "yup";
import { Formik } from "formik";

const accountFormSchema = Yup.object().shape({
  title: Yup.string()
    .max(20, 'Tytuł za długi, skróć do 20 znaków.')
    .required("Required!")
    .matches(new RegExp(/^[A-Za-z]+$/), "Możesz używac tylko liter."),
  date: Yup.string()
    .matches(new RegExp(/^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/), 'Zły format daty.')
    .required("Required!"),
  price: Yup.string()
    .matches(new RegExp(/^[0-9]*$/), 'Podaj cenę, użyj cyfr.')
    .required("Required!"),
  place: Yup.string()
    .matches(new RegExp(/^[A-Za-z]+$/), "Możesz używac tylko liter.")
    .required("Required!"),
  description: Yup.string()
    .max(200, "Opis za długi, skróć tekst do 200 znaków.")
    .required("Required!"),
  email: Yup.string()
    .required("Required!")
    .matches(new RegExp(/^\S+@\S+\.\S+$/), 'Podaj e-maila.')
});


class Formularz extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {}
  handleChange = (e, { value }) =>
    this.setState(
      { value }
    )

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            title: "",
            date: "",
            price: "",
            place: "",
            description: "",
            email: ""
          }}
          validationSchema={accountFormSchema}
          onSubmit={(values, actions) => {
            fetch('https://dreamteam-app.firebaseio.com/trip.json', {
                method: 'POST',
                body: JSON.stringify({ ...values, active: true })
            }).then(() => {
                actions.setSubmitting(false);
            });
        }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
              <Form className={styles.formContainer} onSubmit={handleSubmit}>
                <Form.Field>
                  <h1> Formularz dodawania wycieczki</h1>
                  <label>Tytuł wycieczki</label>
                  <Input placeholder='Wpisz zaproponowany tytuł wycieczki'
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    touched={touched}
                    errors={errors} />
                    <div className={styles.error}>
                  {errors.title && touched.title && errors.title}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Data wyjazdu w formacie DD/MM/YYYY</label>
                  <Input placeholder='Wpisz datę wyjazdu'
                    type="text"
                    name="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.date}
                    touched={touched}
                    errors={errors}
                    />
                  <div className={styles.error}>
                  {errors.date && touched.date && errors.date}
                  </div>
                </Form.Field>
                <Form.Field>
                  <b>Typ wycieczki</b>
                </Form.Field>
                <div className={styles.radioButtons}>
                  <Form.Field>
                    <Radio
                      label='Dla rodzin'
                      name='radioGroup'
                      value='this'
                      checked={this.state.value === 'this'}
                      onChange={this.handleChange}
                      checked
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Dla seniorów'
                      name='radioGroup'
                      value='that'
                      checked={this.state.value === 'that'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label='Dla x'
                      name='radioGroup'
                      value='thut'
                      checked={this.state.value === 'thut'}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </div>
                <Form.Field>
                  <label>Cena w złotówkach za dobę</label>
                  <Input placeholder='Wpisz cenę za dobę'
                    type="text"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    touched={touched}
                    errors={errors} />
                    <div className={styles.error}>
                  {errors.price && touched.price && errors.price}
                  </div>
                </Form.Field>
                <Form.Field>
                  <label>Lokalizacja</label>
                  <Input placeholder='Wpisz miasto'
                    type="text"
                    name="place"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.place}
                    touched={touched}
                    errors={errors} />
                    <div className={styles.error}>
                  {errors.place && touched.place && errors.place}</div>
                </Form.Field>
                <Form.Field>
                  <label>Opis wycieczki</label>
                  <TextArea label='Opis wycieczki' placeholder='Opisz wycieczkę w kilku zdaniach, uwzględniając średni budzet oraz ciekawe miejsca, które warto odwiedzić.'
                    type="text"
                    name="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    touched={touched}
                    errors={errors} />
                    <div className={styles.error}>
                  {errors.description && touched.description && errors.description}</div>
                </Form.Field>
                <Form.Field>
                  <label>Twój e-mail</label>
                  <Input placeholder='Wpisz e-mail'
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    touched={touched}
                    errors={errors} />
                    <div className={styles.error}>
                  {errors.email && touched.email && errors.email}
                  </div>
                </Form.Field>
                <Form.Field>
                  <Checkbox label='Zgadzam się na otrzymywanie maili związanych z wprowadzoną przeze mnie ofertą.' />
                </Form.Field>
                <Button type='submit' disabled={isSubmitting}>Dodaj</Button>
              </Form>
            )}
        </Formik>
      </div>
    )
  };
};

export default Formularz;