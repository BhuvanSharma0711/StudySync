import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import BasicExample from '@/components/navbar';
import Image from '@/components/image';
import Message from '@/components/message';
import Hey from '@/components/hey';
import PeopleCard from '@/components/card';
import Footer from '@/components/foot';

export function Home() {
  return (
    <>
      <BasicExample />
      <Hey user="Rohan" />
      <Image />
      <Message />
      <div className="flex justify-around flex-wrap items-center mb-5">
        <PeopleCard user="Rohan" achivment="NIT KKR" />
        <PeopleCard user="Rohan" achivment="NIT KKR" />
        <PeopleCard user="Rohan" achivment="NIT KKR" />
      </div>
      <div className="bg-black text-white text-center py-6">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi quaerat hic harum nobis vel a quisquam pariatur ab aut error dolorum, mollitia quo sint ducimus autem? Aspernatur modi dolorum earum.
        </p>
        <p className="mt-4">Copyright © All Rights Reserved</p>
      </div>
    </>
  );
}
