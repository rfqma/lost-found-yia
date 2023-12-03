import { View } from "@/app/beranda/View"
import { collection, getDocs, query } from "firebase/firestore"
import { firebaseDB } from "@/lib/databases/firebase"

const getData = async () => {
  const itemCollection = collection(firebaseDB, 'foundItems')
  const itemQuery = query(itemCollection)
  const querySnapshot = await getDocs(itemQuery)
  const results = []

  querySnapshot.forEach((snapshot) => {
    const data = snapshot.data()
    const id = snapshot.id

    results.push({ id, ...data })
  })

  return {
    results: JSON.parse(JSON.stringify(results))
  }
}

export default async function Beranda() {
  const data = await getData()

  return <View data={data} />
}