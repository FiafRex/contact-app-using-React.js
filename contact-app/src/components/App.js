// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";


function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[searchResults, setSearchResults] = useState([]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

 const searchHandler = (searchTerm) =>{
  setSearchTerm(searchTerm);
  if (searchTerm !== "")
  {
    const newContactList = contacts.filter((contact)=>{
    return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(newContactList);
  } else {
    setSearchResults(contacts);
  }
 };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const response = await api.get("/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} 
            term = {searchTerm}
            searchKeyword = {searchHandler} />}
          />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
         
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
