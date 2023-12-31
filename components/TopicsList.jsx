import clientPromise from "../libs/mongodb";

import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";


export const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MY_LOCALHOST}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

// export async function getServerSideProps() {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`)
//   const res = await fetch(`${process.env.NEXT_PUBLIC_MY_LOCALHOST}/api/topics`, {
//     cache: "no-store",
//   });
//   //const topics = await res.json()

//   // Pass data to the page via props
//   return { props: { topics } }
// }

// export async function getServerSideProps() {
//   try {
//       const client = await clientPromise;
//       const db = client.db("test");

//       const topics = await db
//           .collection("topics")
//           .find({})
//           .toArray();

//       return {
//           props: { topics: JSON.parse(JSON.stringify(topics)) },
//       };
//   } catch (e) {
//       console.error(e);
//   }
// }

export default async function TopicsList() {

  const { topics } = await getTopics();
  //const { topics } = await getServerSideProps();

  return (
    <>
      {topics.map((t) => (
        <div
          key={t._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`${process.env.NEXT_PUBLIC_MY_LOCALHOST}/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
