"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Table } from "react-bootstrap";

export default function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const deleteCountry = async (id) => {
    if (!confirm("Are you sure you want to delete this country?")) return;

    await fetch(`/api/countries/${id}`, { method: "DELETE" });
    setCountries(countries.filter((c) => c._id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Countries</h2>
      <div className="mb-3">
        <Link href="/admin/country-editor" className="btn btn-primary">
          Add New Country
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Flag</th>
            <th>Country Name</th>
            <th>Country Code</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr key={country._id}>
              <td>
                {country.countryImage && (
                  <img
                    src={country.countryImage}
                    alt={country.countryName}
                    style={{ width: "50px" }}
                  />
                )}
              </td>
              <td>{country.countryName}</td>
              <td>{country.countryCode}</td>
              <td>{country.activeStatus ? "✅" : "❌"}</td>
              <td>
                <Link
                  href={`/admin/country-editor?id=${country._id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteCountry(country._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
