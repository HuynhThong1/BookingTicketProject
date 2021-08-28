import React from "react";

export default function Card() {
  return (
    <div className="card w-full">
      <div className="card-content bg-gray-200 py-5 rounded-t-lg">
        <h3 className="text-purple-800 font-bold text-xs">Category</h3>
        <p className="text-xl m-2">Cybersoft frontend developer</p>

        <p className="px-5 font-thin my-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
          exercitationem facere itaque similique. Excepturi, perferendis
          recusandae, temporibus nobis cumque sint rem ad dignissimos illo iure
          nam, voluptatibus et delectus quibusdam?
        </p>
      </div>

      <div className="bg-purple-200 p-5 card-bottom flex justify-between rounded-b-lg">
        <p className="p-3">1 BTC</p>
        <button className="rounded-lg bg-purple-500 text-white p-3 hover:text-purple-500 hover:bg-white transition duration-500">Register</button>
      </div>
    </div>
  );
}
