import renderMain from "./fragments/main/main.js";
import renderFriends from "./fragments/user/friends.js"
import renderRequests from "./fragments/user/requests.js"

export default function () {
  window.router = new Navigo("/", { hash: true });

  router
    .on({
      "/": () => {
        renderMain().then(router.updatePageLinks);;
      },
      friends: () => {
        renderFriends().then(router.updatePageLinks);;
      },
      requests: () => {
        renderRequests().then(router.updatePageLinks);;
      }
    })
    .resolve();
}