import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, current, clearCurrent } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        phone: '',
        email: '',
        type: 'personal',
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'personal',
  });

  const { name, phone, email, type } = contact;

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onClear = () => {
    clearCurrent();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    onClear();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary text-center'>
        {current ? 'Update contact' : 'Add contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professionel'
        checked={type === 'professionel'}
        onChange={onChange}
      />{' '}
      Professionel
      <div>
        <input
          type='submit'
          value={current ? 'Update contact' : 'Add contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <input
            type='submit'
            value='Clear'
            className='btn btn-light btn-block'
            onClick={onClear}
          />
        </div>
      )}
    </form>
  );
};

export default ContactForm;
