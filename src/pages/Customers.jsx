import React, { useState, useEffect } from "react";
import CustomersAPI from "../services/CustomersAPI";
import { Link } from "react-router-dom";

const Customer = ({ customer, onDelete }) => {
  return (
    <tr>
      <td>{customer.id}</td>
      <td>
        <Link to={"/clients/" + customer.id}>
          {customer.firstName} {customer.lastName}
        </Link>
      </td>
      <td>{customer.invoices.length}</td>
      <td>{customer.totalAmount.toLocaleString("fr-FR")} €</td>
      <td>{customer.unpaidAmount.toLocaleString("fr-FR")} €</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(customer.id)}
        >
          Supprimer
        </button>
      </td>
    </tr>
  );
};

const Customers = props => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    CustomersAPI.findAll().then(customers => setCustomers(customers));
  }, []);

  const handleDelete = id => {
    const updatedCustomers = [...customers];
    const index = updatedCustomers.findIndex(c => c.id === id);
    updatedCustomers.splice(index, 1);
    setCustomers(updatedCustomers);
  };

  return (
    <>
      <h1>Gestion des clients</h1>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>Client</th>
            <th>Factures</th>
            <th>Montant total</th>
            <th>Montant du</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <Customer
              customer={c}
              key={c.id}
              onDelete={id => handleDelete(id)}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Customers;
