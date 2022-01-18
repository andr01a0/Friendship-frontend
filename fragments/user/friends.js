import renderHeader from '../header/header.js'

export default async () => {
  renderHeader('nav-friends');
  const main = document.querySelector('.main');

  const friendsPageResponse = await fetch('./fragments/user/friends.html');
  const friendsHtml = await friendsPageResponse.text();

  main.innerHTML = friendsHtml;

  let me = undefined;
  await fetch(`${window.apiUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    }
  }).then(response => response.text()).then(response => {
    me = response;
  });

  fetch(`${window.apiUrl}/user/friendship?status=Friends`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    }
  }).then(response => response.json()).then(friendsList => {
    if(friendsList != undefined) {
      const friendsTable = document.querySelector('table');
      friendsList.forEach(friend => {
        const tr = document.createElement('tr');
        const tdEmail = document.createElement('td');
        const tdHost = document.createElement('td');
        if(me != friend.friendEmail) {
          tdEmail.innerHTML = friend.friendEmail;
          tdHost.innerHTML = friend.friendHost;
        } else {
          tdEmail.innerHTML = friend.user.username;
          tdHost.innerHTML = friend.userHost;
        }
        tr.appendChild(tdEmail);
        tr.appendChild(tdHost);
        friendsTable.appendChild(tr);
      });
    }
    return;
  }).catch(error => {
    alert(error);
  });

};