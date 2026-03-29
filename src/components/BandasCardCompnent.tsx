import Image from 'next/image'
import React from 'react'
type Props = {
  nombre: string
  categoria: string
  grupo:  "Grupo 1" | "Grupo 2" 
  subcGrupo: "1" |"2"
}

export default function BandasCardCompnent({nombre, categoria, grupo, subcGrupo}: Props) {
  return (
    <div className='flex flex-col w-full h-90 bg-white shadow'>
      <div className='bg-slate-300 h-56'>
        <Image src="/banda.jpg" alt="Banda" width={100} height={100} />

      </div>
      <div className='p-4'>
        <h2>{nombre}</h2>
        <p>{categoria}</p>
        <p>{grupo} - {subcGrupo}</p> 
      </div>
      
      
    </div>
  )
}
