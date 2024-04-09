import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  get,
  getDatabase,
  ref,
  remove,
  serverTimestamp,
  set,
} from 'firebase/database';
import { getDate } from '../js/CommonFunction';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase();

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export async function getTodos(uid) {
  const snapshot = await get(ref(database, `todos/${uid}`));
  const items = Object.values(snapshot.val()) || [];

  const sortedItems = items.sort((a, b) => {
    if (a.deadline && b.deadline)
    {
      return a.deadline.localeCompare(b.deadline);
    } else if (a.deadline)
    {
      return -1;
    } else if (b.deadline)
    {
      return 1;
    } else
    {
      return 0;
    }
  });
  return sortedItems;
}

export async function addNewTodo(uid, todo) {
  const id = uuid();

  set(ref(database, `todos/${uid}/${id}`), {
    ...todo,
    id,
    status: 'active',
    done: 0,
    createdDate: serverTimestamp(),
  });
}

export async function editTodo(uid, todo) {
  return set(ref(database, `todos/${uid}/${todo.id}`), todo);
}

export async function removeTodo(uid, todoId) {
  return remove(ref(database, `todos/${uid}/${todoId}`));
}

export async function getPomodoro(uid) {
  const date = getDate();
  return get(ref(database, `pomodoroCounts/${uid}/${date}`)).then(
    (snapshot) => {
      const items = snapshot.val() || 0;
      return items;
    }
  );
}

export async function setPomodoro(uid, pomodoro) {
  const date = getDate();
  await set(ref(database, `pomodoroCounts/${uid}/${date}`), pomodoro + 1);
}


export async function getProjects(uid) {
  return await get(ref(database, `projects/${uid}`)).then((snapshot) => {
    const items = Object.values(snapshot.val()) || [];

    console.log(items);
    const sortedItems = items.sort((a, b) => {
      return a.createdDate - b.createdDate;
    });
    return sortedItems;
  });
}


export async function addNewProject(uid, name) {
  const id = uuid();
  set(ref(database, `projects/${uid}/${id}`), {
    id,
    name,
    createdDate: serverTimestamp(),
  });
}