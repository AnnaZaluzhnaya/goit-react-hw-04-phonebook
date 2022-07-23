import React from 'react';
import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';

const ContactList = ({ contactNames, removeContact }) => {
  return (
    <div>
      {contactNames.map(({ id, number, name }) => {
        return (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            removeContact={removeContact}
          />
        );
      })}
    </div>
  );
};

ContactList.propTypes = {
  removeContact: PropTypes.func,
  contactNames: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
