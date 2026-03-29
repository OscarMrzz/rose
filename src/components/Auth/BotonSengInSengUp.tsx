'use client'
type Props = {
  onClick: () => void;
  haySesion: boolean;
}

export default function BotonSengInSengUp({ onClick, haySesion }: Props) {
  return (
    <div className="  ">
      {haySesion ? (
        <button className="bg-slate-400 px-4 py-2 rounded hover:bg-slate-500 transition-colors" onClick={onClick}>
          Cerrar sesion
        </button>
      ) : (
        <button className="bg-slate-400 px-4 py-2 rounded hover:bg-slate-500 transition-colors text-slate-800 font-bold" onClick={onClick}>
          Iniciar sesion
        </button>
      )}
    </div>
  )
}
