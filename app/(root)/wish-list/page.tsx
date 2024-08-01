'use client'
import React , {useState, useEffect} from 'react'
import WishListForm from "../../components/WishlistForm";
import WishList from '@/app/components/WishList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../firebaseConfig"

const WishlistPage = () => {
  const [emails, setEmails]  = useState<string[]>([]);

  const fetchEmails = async () => {
    const querySnapshot = await getDocs(collection(db, 'wishliist'));
    const emailsList = querySnapshot.docs.map(doc => doc.data().email);
    setEmails(emailsList);
  }

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div>
      <h1 className='head_text'>Wish List</h1>
      <WishListForm fetchEmails={fetchEmails}/>
      <WishList emails = {emails}/>
    </div>
  )
}

export default WishlistPage
