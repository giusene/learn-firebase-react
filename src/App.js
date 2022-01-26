import { useState, useEffect } from 'react';
import { db } from './firebase';
//  PER VERSIONE STATICA
// import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { collection, onSnapshot, addDoc } from 'firebase/firestore'
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const user = 'User ' + Math.floor(Math.random() * 100);

  useEffect(() => {
    const getData = () => {
      // 2 paramentri: db al quale collegarsi e l'oggetto

      // TEMPO REALE - REALTIME
     onSnapshot(collection(db, "messages"), (collection) => {
        const currentMessages = collection.docs.map(doc => {
          const obj = {
            id: doc.id,
            // la funzione data() risolve lasincronicità del db
            ...doc.data()
          }
          return obj;
        })
        console.log(currentMessages)
        setMessages(currentMessages)
      });

      //VVERSIONE STATICA
      // const querySnapshot = await getDocs(collection(db, "messages"));
      // console.log(querySnapshot.docs);
      // const currentMessages = querySnapshot.docs.map(doc => {
      //     const obj = {
      //       id: doc.id,
      //       // la funzione data() risolve lasincronicità del db
      //       ...doc.data()
      //     }
      //     return obj;
      //   })
      //   console.log(currentMessages)
      //   setMessages(currentMessages)
      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => ${doc.data().text}`);
      // })
    }

    getData();

  }, [])

  


const handleSubmit = (event) => {
  event.preventDefault();
  const newMessage = { user, text };
  console.log(newMessage)
  addDoc(collection(db, "messages"), newMessage);
  setText('')
  }


  return (
    <div className="App">
      <h1>Learnig Firebase</h1>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      </form>
      <ul>
        {messages.map((mess, index) =>
          <li key={index}>
            <h4>{mess.user}</h4>
            <p>{mess.text}</p>
          </li>)}
      </ul>
    </div>
  );
}

export default App;
