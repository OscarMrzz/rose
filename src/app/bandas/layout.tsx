export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full ">
      <div className="w-full">
        {children}
      </div>
      
    </div>
  )
}