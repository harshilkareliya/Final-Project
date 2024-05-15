import React from 'react'
import { FaRegCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

function Showtask() {
  let stored = localStorage.getItem("alltasks")
  let todo = JSON.parse(stored)
  return (
    <div>
      {
        todo && todo.map((e, i) => (
          <div key={i} className='showTask'>
            <span className='showRound'>
              <FaRegCircle />
            </span>
            <p className='showedTasks'>
              {e.text}
            </p>
            <span className='showedFavorites'>
              <FaRegStar/>
            </span>
          </div>
        ))
      }
    </div>
  )
}

export default Showtask
