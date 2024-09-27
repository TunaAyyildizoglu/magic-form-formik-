import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './App.css';

const App = () => {

  const validationSchema = Yup.object({
    name: Yup.string().required("İsim boş bırakılamaz"),
    email: Yup.string().email("Geçerli bir email girin").required("Email boş bırakılamaz"),
    agree: Yup.boolean().oneOf([true], "Koşulları kabul etmelisiniz"),
    favoriteColor: Yup.string().required("Hadi ama herkesin sevdiği bir renk vardır")
      .oneOf(["red", "blue", "green"], "Geçersiz renk seçimi")
  });

  const initialValues = {
    name: "",
    email: "",
    agree: false,
    favoriteColor: ""
  }

  return (
    <div className="container">
      <div className="brand-box">
        <h1>Magic Form</h1>
        <p>Build forms in React without the tears.</p>
      </div>

      <div className="magic-form">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            console.log(values); // Verileri konsolda göster
            setTimeout(() => {
              resetForm();
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ values, errors, handleChange, handleSubmit, dirty, isSubmitting, touched }) => (
            <form onSubmit={handleSubmit}>
              <h2>Kaydol</h2>

              <div className="input-box">
                <label htmlFor="name">İsim Soyisim</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Tuna"
                  className="input"
                  value={values.name}
                  onChange={handleChange}
                />
                {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}
              </div>
              

              <div className="input-box">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="tuna@gmail.com"
                  className="input"
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
              </div>
              

              <div className="input-box">
                <label htmlFor="favoriteColor">Favori Renk</label>
                <select
                  id="favoriteColor"
                  name="favoriteColor"
                  value={values.favoriteColor}
                  onChange={handleChange}
                  style={{
                    padding: "10px 15px",
                    outline: "none",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                  }}
                >
                  <option value="" label="Renklendir Hayatı"></option>
                  <option value="red" label="Kırmızı"></option>
                  <option value="blue" label="Mavi"></option>
                  <option value="green" label="Yeşil"></option>
                </select>
                {errors.favoriteColor && touched.favoriteColor && (
                <div className="input-feedback">{errors.favoriteColor}</div>
              )}
              </div>
             

              <div className="check-box">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={values.agree}
                  onChange={handleChange}
                />
                <label htmlFor="agree">Sözleşmeyi okudum kabul ediyorum</label>
                
              
              </div>
              {errors.agree && touched.agree && (
                <div className="input-feedback">{errors.agree}</div>
              )}
              <button type="submit" disabled={!dirty || isSubmitting}>Kaydol</button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default App;
