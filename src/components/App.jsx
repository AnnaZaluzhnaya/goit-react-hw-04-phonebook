import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  formSubmitHandler = (name, number) => {
    const addedName = this.state.contacts.find(
      contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (addedName) {
      alert(`${name.toLowerCase()} is already in contacts`);
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  removeContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  getFilteredNames = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (!savedContacts) {
      return;
    }
    const parsedContacts = JSON.parse(savedContacts);
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const contactNames = this.getFilteredNames();

    return (
      <div>
        <div className="phonebook-wrapper top">
          <h2 className="title">Phonebook</h2>
          <ContactForm onSubmit={this.formSubmitHandler} />
        </div>
        <div className="phonebook-wrapper">
          <h2 className="title">Contacts</h2>
          <Filter value={filter} changeFilter={this.changeFilter} />
          <ContactList
            contactNames={contactNames}
            removeContact={this.removeContact}
          />
        </div>
      </div>
    );
  }
}
