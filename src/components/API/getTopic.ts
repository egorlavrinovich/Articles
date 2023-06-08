import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../../config/fireBaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getTopic = async(id:string,url:string) =>{
    const docRef = doc(db, `${url}`, `${id}`);
    const docs = await getDoc((docRef))
    return docs.data()
} 