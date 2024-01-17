"use client";

import { React, useEffect, useState } from 'react';
import ToDoList from '@/components/ToDoList';

const page = ({ params }) => {
  const [allToDos, setAllToDos] = useState([]);

  //quickly create the calls to the rest api

  //Get
  async function getToDos() {
    const apiUrl = `http://192.168.1.14:3000/data/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error updating data: ${response.statusText}`);
      }

      const getData = await response.json();
      console.log('Successfully called GET for:', getData);
      setAllToDos(getData);
    } catch (error) {
      console.error('Error getting data:', error.message);
      throw error;
    }
  }


  //Post
  async function postToDo(event) {
    event.preventDefault();
    console.info(event)
    const newTodo = document.getElementById('newtodo');
    const newTodoValue = newTodo.value.trim();

    if (newTodoValue.length > 0) {
      //we are good to go and can move on

    } else {
      alert('Please provide a value for your todo list item.')
      return;
    }

    const apiUrl = `http://192.168.1.14:3000/data/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": newTodoValue
        })
      });

      if (!response.ok) {
        throw new Error(`Error updating data: ${response.statusText}`);
      }

      const postedData = await response.json();
      newTodo.value = "";
      getToDos();
      // console.log('Data updated successfully:', postedData);
      // return postedData;
    } catch (error) {
      console.error('Error updating data:', error.message);
      throw error;
    }
  }

  //Update
  async function updateToDo(id, updatedText, targetElm) {
    const apiUrl = `http://192.168.1.14:3000/data/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": updatedText
        }),
      });

      if (!response.ok) {
        throw new Error(`Error updating data: ${response.statusText}`);
      }

      const updatedData = await response.json();
      //I know this is the easy way out to updating the list as it changes...
      getToDos();

      // return updatedData;
    } catch (error) {
      console.error('Error updating data:', error.message);
      throw error;
    }
  }

  //Delete
  async function deleteToDo(id, targetElm) {
    const apiUrl = `http://192.168.1.14:3000/data/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Error updating data: ${response.statusText}`);
      }

      const deletedData = await response.json();
      if (deletedData.acknowledged === true) {
        targetElm.remove();
      }
      // return deletedData; //not really needed in this setup
    } catch (error) {
      console.error('Error updating data:', error.message);
      throw error;
    }
  }

  useEffect(() => {
    console.log('i fire once');
    getToDos();
  }, []);

  return (
    
        <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
          <h3>ToDo List:</h3>
          <form onSubmit={(e) => postToDo(e)} className="mb-5">
            <div className="mt-2 flex rounded-md shadow-sm">
              <div className="relative flex flex-grow items-stretch focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                </div>
                <input type="text" name="newtodo" id="newtodo" className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Enter new todo..." />
              </div>
              <button type="submit" className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Add ToDo
              </button>
            </div>

          </form>
          <ToDoList data={allToDos} deleteFunc={deleteToDo} updateFunc={updateToDo} />
        </div>
  )
}

export default page