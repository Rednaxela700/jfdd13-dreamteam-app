import React, {Fragment, useState, useContext} from 'react';
import firebase from "../../firebase";
import {Form, Input, Button, Checkbox} from 'semantic-ui-react';
import {Formik, Field} from "formik";
import {accountFormSchema} from "./YupSchema"
import iconUpload from '../../assets/iconUpload.svg'
import AppContext from '../../context/app/AppContext'

const truncateDecimals = (value, digits) => {
  const number = parseFloat(value)
  const multiplier = Math.pow(10, digits),
    adjustedNum = number * multiplier,
    truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);
  return truncatedNum / multiplier;
};

const TripForm = () => {
  const [tYVisible, setTYVisible] = useState(false);
  const appContext = useContext(AppContext);
  const {continents} = appContext;

  const formikInitialValues = {
    title: "",
    date: "",
    price: "",
    city: "",
    continent: "",
    description: "",
    email: "",
    terms: false,
    tripImageUrl: ""
  };
  const handleThankYouVisible = () => {
    setTYVisible(!tYVisible)
  };

  const handleFormSubmit = (values, actions) => {
    fetch('https://dreamteam-app.firebaseio.com/trips.json', {
      method: 'POST',
      body: JSON.stringify({...values, active: true})
    }).then(() => {
      actions.setSubmitting(false);
      actions.resetForm();
      handleThankYouVisible()
    })
      .then(() => {
        localStorage.setItem('form', JSON.stringify({...values, active: true}))
      });
  }

  return (
    <Fragment>
      <h1 className='create__title'> Add your trip in few single steps</h1>
      <Formik
        initialValues={formikInitialValues}
        validationSchema={accountFormSchema}
        onSubmit={handleFormSubmit}>
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            setErrors
          }) => {

          const handleImgUpload = (e) => {
            const firstFile = e.target.files[0]
            const storageRef = firebase.storage().ref('trips')
            const fileName = 'trip-' + new Date().toISOString()
            const fileRef = storageRef.child(fileName + '.jpg')
            const uploadTask = fileRef.put(firstFile)
            uploadTask.on(
              'state_changed',
              () => {
              },
              () => {
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL()
                  .then((downloadURL) => setFieldValue('tripImageUrl', downloadURL));
              })
          }

          return (
            <Form className='create-form' onSubmit={handleSubmit}>
              <div className="create-form__container">
                <div className="create-form__column">
                  <div className="input__container">
                    <label className='input__label'>Title of the trip</label>
                    <Field
                      className='input__field'
                      placeholder='E.g New Years Eve in Thailand'
                      type="text"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      touched={touched}
                    />
                    {errors.title && touched.title && <div className='error__container'>
                      {errors.title}
                    </div>}
                  </div>
                  <div className="input__container">
                    <label className='input__label'>Short description of the trip</label>
                    <Field
                      className='input__field input--description'
                      as="textarea"
                      name="description"
                      placeholder='E.g Whether you want to bring in the new year with the sand between your toes or one too many alcoholic beverages in town, Thailand has the celebration for you. '
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    {touched.description && errors.description &&
                    <div className='error__container'>
                      {errors.description}
                    </div>}
                  </div>
                  <div className="input__container">
                    <label className='input__label'>Country</label>
                    <Field
                      className='input__field'
                      placeholder='Enter country'
                      type="text"
                      name="city"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city}
                      touched={touched}
                      errors={errors}
                    />
                    {touched.city && errors.city && <div className='error__container'>
                      {errors.city}
                    </div>}
                  </div>
                  <div className="input__container">
                    <label className='input__label'>Continent</label>
                    <Field
                      className='input__field select__field'
                      as="select"
                      name="continent"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option label='Select continent'/>
                      {continents.map((continent, idx) => (
                        <option
                          key={idx}
                          value={continent}
                        >
                          {continent}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <div className="create-form__column">
                  <div className="input__container">
                    <label className='input__label'>Estimated price per day</label>
                    <Field
                      className='input__field'
                      placeholder='E.g 50 EUR'
                      type="number"
                      name="price"
                      onChange={(e) => {
                        const {value} = e.target
                        const price = truncateDecimals(value, 2)
                        setFieldValue('price', price)
                      }}
                      onBlur={handleBlur}
                      value={values.price}
                      touched={touched}
                    />
                    <div className='error__container'>
                      {errors.price && touched.price && errors.price}
                    </div>
                  </div>
                  <div className="input__container">
                    <label className='input__label'>Recommended time</label>
                    <Field
                      className='input__field'
                      type="date"
                      name="date"
                      min="2019-12-01"
                      max="2022-01-01"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.date}
                      touched={touched}
                    />
                    {errors.date && touched.date && <div className={'error__container '}>
                      {errors.date}
                    </div>}
                  </div>
                  <div className="input__container">
                    <label className='input__label'>Twój e-mail</label>
                    <Field
                      className='input__field'
                      placeholder='Wpisz e-mail'
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      touched={touched}
                    />
                    {touched.email && errors.email &&
                    <div className='error__container'>
                      {errors.email}
                    </div>}
                  </div>
                  {/* TODO: change this input to Formik field */}
                  <div className="input__container">
                    <Form.Field>
                      <label><span className='input__label'>Trip's main picture</span>
                        <Input
                          className='input__field--hidden'
                          type="file"
                          name="tripImageUrl"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleImgUpload}
                        />
                        <div className="input__faked">
                          <img src={iconUpload} className='input__faked__img' alt=""/>
                          <p className='input__faked__placeholder'>Choose a photo of your trip</p>
                        </div>
                        {errors.tripImageUrl && <div className='error__container'>
                          {errors.tripImageUrl}
                        </div>}
                      </label>
                    </Form.Field>
                  </div>
                </div>
              </div>
              <div className="submit__container">
                <Form.Field className='submit__checkbox'>
                  <Checkbox
                    checked={values.terms}
                    onChange={() => setFieldValue('terms', !values.terms)}
                    label=' I agree with the terms'
                    name="terms"
                  />
                  <div className='error__container'>
                    {errors.terms && touched.terms && errors.terms}
                  </div>
                </Form.Field>
                <Button type='submit' disabled={isSubmitting} className='cta'>Create</Button>
              </div>
              <p className={tYVisible ? 'form__ty' : 'form__ty--visible'}>Dziękujemy za przesłanie wycieczki.</p>
            </Form>
          )
        }}
      </Formik>
    </Fragment>
  )
}

export default TripForm;