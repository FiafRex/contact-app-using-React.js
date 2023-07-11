import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import { v4 as uuid } from "uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from './ContactDetail';

function App() {
  // Key for storing and retrieving contacts in local storage
  const LOCAL_STORAGE_KEY = "contacts";

  // State variable for storing the list of contacts
  const [contacts, setContacts] = useState(
    // Retrieve contacts from local storage, or use an empty array as default
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );

  // Function to add a new contact to the list
  const addContactHandler = (contact) => {
    // Generate a unique ID for the new contact using UUID library
    const newContact = { id: uuid(), ...contact };

    // Update the contacts state by adding the new contact
    setContacts([...contacts, newContact]);
  };

  // Function to remove a contact from the list
  const removeContactHandler = (id) => {
    // Filter out the contact with the specified ID from the contacts list
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    // Update the contacts state by setting the new list without the removed contact
    setContacts(newContactList);
  };

  // Save the contacts to local storage whenever the contacts state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      
      {/*Router Component */}
      <Router>
      {/* Header component */}
      
      <Routes>

      <Route path="/" element={<ContactList
       contacts={contacts} 
       getContactId={removeContactHandler} />} />
       
      <Route path="/add" element={<AddContact
       addContactHandler= 
       {addContactHandler} />} />
      
      
      {/* AddContact component */}
      {/* <AddContact addContactHandler={addContactHandler} /> */}
      {/* ContactList component
      //<Cont actList contacts={contacts} getContactId={removeContactHandler}/> */}
      <Route
  path="/contact/:id"
  element={<ContactDetail contacts={contacts} />}
/>
      </Routes>
      </Router>
      
      
    </div>
  );
}


export default App;