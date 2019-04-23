import React, { useState, useEffect } from "react";
import CustomersAPI from "../services/CustomersAPI";
import Field from "../components/form/Field";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const mapApiCustomer = ({
  id,
  firstName,
  lastName,
  email,
  avatar,
  company
}) => ({ id, firstName, lastName, email, avatar, company });

const Customer = ({ match: url, history: navigation }) => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    company: "",
    avatar: "",
    email: ""
  });
  const [isEditing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const { id } = url.params;
    if (id && id !== "new") {
      CustomersAPI.find(id)
        .then(mapApiCustomer)
        .then(final => {
          setCustomer(final);
          setEditing(true);
        });
    }
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (isEditing) {
        await CustomersAPI.update(customer);
      } else {
        await CustomersAPI.create(customer);
      }

      toast.success(
        <>
          Le client{" "}
          <strong>
            {customer.firstName} {customer.lastName}
          </strong>{" "}
          a bien été enregistré :-)
        </>
      );
      navigation.replace("/clients");
    } catch (error) {
      const updatedErrors = {};
      const { violations } = error.data;

      violations.forEach(({ propertyPath, message }) => {
        updatedErrors[propertyPath] = message;
      });

      setErrors(updatedErrors);

      toast.error(
        <>
          <strong>Erreur : </strong> des erreurs sont apparues dans votre
          formulaire !
        </>
      );
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const updatedCustomer = { ...customer };
    updatedCustomer[name] = value;
    setCustomer(updatedCustomer);
  };

  return (
    <>
      {(isEditing && <h1>Modification du client</h1>) || (
        <h1>Création d'un client</h1>
      )}
      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Le prénom du client"
          value={customer.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Le nom du client"
          value={customer.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          name="email"
          label="Email"
          placeholder="L'adresse email"
          value={customer.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Field
          name="company"
          label="Entreprise (optionnel)"
          placeholder="Entreprise du client (optionnel)"
          value={customer.company}
          onChange={handleChange}
          error={errors.company}
        />
        <Field
          name="avatar"
          label="Avatar (URL)"
          placeholder="L'URL de l'avatar du client"
          value={customer.avatar}
          onChange={handleChange}
          error={errors.avatar}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <button
            className="btn btn-link"
            onClick={() => navigation.push("/clients")}
          >
            Annuler
          </button>
        </div>
      </form>
    </>
  );
};

export default Customer;
