export default function layout({ children }: { children: React.ReactNode }) {
  return (

      <div className="w-full px-4 lg:px-8 xl:px-16 2xl:px-24">
        {children}
      </div>
      

  )
}