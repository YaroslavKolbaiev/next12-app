import axios from 'axios';

export default async function addContactHandler(
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  email: string,
  message: string,
  setNotification: (value: string) => void,
) {
  e.preventDefault();

  const newContact = {
    name,
    email,
    message,
  };

  try {
    axios.post('/api/contacts', newContact);
    setNotification('ok');
  } catch (error) {
    console.log('Fetching failed');
    setNotification('error');
  }
}
