const backendUrl = window.location.origin; // same shit instead of ""

async function createPost() {
  const userId = document.getElementById('postUserId').value;
  const content = document.getElementById('postContent').value;

  const res = await fetch(`${backendUrl}/post`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, content })
  });

  const data = await res.json();
  alert(`Post submitted with ID: ${data._id}`);
}

async function getNotifications() {
  const userId = document.getElementById('notifUserId').value;
  const list = document.getElementById('notifList');
  list.innerHTML = "<li>Loading...</li>";

  const res = await fetch(`${backendUrl}/notifications/${userId}`);
  const notifications = await res.json();

  list.innerHTML = "";
  if (notifications.length === 0) {
    list.innerHTML = "<li>No notifications found.</li>";
    return;
  }

  notifications.forEach(n => {
    const li = document.createElement("li");
    li.textContent = n.message;
    list.appendChild(li);
  });
}