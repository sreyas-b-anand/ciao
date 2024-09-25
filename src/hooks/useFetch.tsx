type messageType = {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
};

import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  Query,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import useAuthContext from "./useAuthContext";

const useFetch = (value: boolean) => {
  const { user } = useAuthContext();
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);

  const [messages, setMessages] = useState<messageType[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const messagesRef = collection(db, "messages");
  
    // Define the query only if the user has an email
    const q: Query<DocumentData> | null = user?.email
      ? value
        ? query(
            messagesRef,
            orderBy("timestamp"),
            where("timestamp", ">=", Timestamp.fromDate(startDate)),
            where("sender", "in", [user.email , `${user?.email}assistant`]) // Use non-optional email
          )
        : query(
            messagesRef,
            orderBy("timestamp"),
            where("sender", "in", [user.email , `${user?.email}assistant`]) // Use non-optional email
          )
      : null; // Handle the case when the user is not authenticated
  
    if (!q) {
      // If q is null, exit early or show an appropriate message
      setError("No query created. User is not authenticated or email is missing.");
      return;
    }
  
    // Subscribe to Firestore query snapshot
    const unsubscribe = onSnapshot(
      q, // Query will only be passed if it's non-null
      (snapshot) => {
        const messagesData: messageType[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as messageType[];
        setMessages(messagesData);
        console.log(messagesData)
      },
      (err: Error) => {
        setError("An error occurred while fetching data: " + err.message);
        //console.log(err)
      }
    );
  
    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, [value, user , startDate]); // Make sure 'user' is also a dependency
  
  return { messages, error };
};

export default useFetch;
