import renderHeader from '../header/header.js'

export default async () => {
  renderHeader('nav-requests');
  const main = document.querySelector('.main');

  const requestsPageResponse = await fetch('./fragments/user/requests.html');
  const requestsHtml = await requestsPageResponse.text();

  main.innerHTML = requestsHtml;

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

  function actionRequest(event) {
    const method = event.currentTarget.getAttribute("method");
    let username = undefined;
    let userHost = undefined;
    let friendEmail = undefined;
    let friendHost = undefined;
    if(me == event.currentTarget.getAttribute("username")) {
      username = event.currentTarget.getAttribute("username");
      userHost = event.currentTarget.getAttribute("userHost");
      friendEmail = event.currentTarget.getAttribute("friendEmail");
      friendHost = event.currentTarget.getAttribute("friendHost");
    } else {
      username = event.currentTarget.getAttribute("friendEmail");
      userHost = event.currentTarget.getAttribute("friendHost");
      friendEmail = event.currentTarget.getAttribute("username");
      friendHost = event.currentTarget.getAttribute("userHost");
    }
    const friendshipRequest = {
      "request": `${method} ${username} ${userHost} ${friendEmail} ${friendHost} 1\r\n`
    };
    fetch(`${window.apiUrl}/friendship`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
      body: JSON.stringify(friendshipRequest)
    }).then(response => response.json()).then(response => {
      alert(response.response);
      document.location.reload();
    });
  }

  await fetch(`${window.apiUrl}/user/friendship?status=Pending`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    }
  }).then(response => response.json()).then(friendsList => {
    if(friendsList != undefined) {
      const friendsTable = document.querySelector('table');
      friendsList.forEach((friend, index) => {
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
        // if the user is the target of the request
        // then allow to accept/deny it
        if(me == friend.target) {
          const tdActions = document.createElement('td');
          tdActions.innerHTML = `
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-danger button${index}-deny" method="Deny" username="${friend.user.username}" userHost="${friend.userHost}" friendEmail="${friend.friendEmail}" friendHost="${friend.friendHost}">Deny</button>
            <button type="button" class="btn btn-success button${index}-accept" method="Accept" username="${friend.user.username}" userHost="${friend.userHost}" friendEmail="${friend.friendEmail}" friendHost="${friend.friendHost}">Accept</button>
          </div>`;
          tr.appendChild(tdActions);
        } else {
          const tdActions = document.createElement('td');
          tdActions.innerHTML = "Pending";
          tr.appendChild(tdActions);
        }
        friendsTable.appendChild(tr);
        document.querySelector(`.button${index}-deny`).addEventListener("click", actionRequest);
        document.querySelector(`.button${index}-accept`).addEventListener("click", actionRequest);
      });
    }
    return;
  }).catch(error => {
    alert(error);
  });

};