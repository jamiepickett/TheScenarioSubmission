"use client";

import { useEffect, useState } from "react"

export default () => {

  const revalidatedData = async () => {
    const result = await fetch(`http://127.0.01:3000/data`, {
        method: 'GET',
        mode: 'no-cors',
    });

    console.log(result);

    return result;
  }
  
  const [state, setState] = useState<Response>();
  const [loadData, setLoadData] = useState(true);

  useEffect(()=>{

    if (!loadData)
      return;

    setLoadData(false)

    revalidatedData()
    .then(res=>{
      setState(res)
    })
  })


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          This is a empty shell for a Next.js app.<br />
          Libraray's pre-installed to keep things simple: 
        </p>
         <ul>
            <li>Tailwind CSS - https://tailwindcss.com/</li>
            <li>Nextui - </li>
            <li>Formik - </li>
          </ul>
          {state && <p>{JSON.stringify(state)}</p>}
      </div>
    </main>
  )
}
