type messageType = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
};

import { collection, onSnapshot, orderBy, query , Timestamp, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect , useState} from "react";


const useFetch = (value: boolean) => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const [messages, setMessages] = useState<messageType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages");

    const q = value
      ? query(messagesRef,orderBy("timestamp"), where("timestamp", ">=", Timestamp.fromDate(startDate)) )
      : query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData: messageType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as messageType[];
        setMessages(messagesData);
      },
      (err) => {
        setError("An error occurred while fetching data: " + err.message);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, [value ]); // Added where1 as a dependency

  return { messages, error };
};

export default useFetch;


