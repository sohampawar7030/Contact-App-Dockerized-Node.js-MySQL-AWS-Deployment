document.getElementById('showContacts').addEventListener('click', async () => {
  const response = await fetch('/contacts');
  const contacts = await response.json();

  const list = document.getElementById('contactsList');
  list.innerHTML = ''; // Clear old list

  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${contact.username}</strong><br>
      📞 ${contact.phone}<br>
      📧 ${contact.email}
    `;
    list.appendChild(li);
  });
});
