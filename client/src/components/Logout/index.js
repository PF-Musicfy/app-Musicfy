export default function Logout(){
  return (
    <button
      onClick={() => localStorage.clear()}
    >
      Logout
    </button>
  )
}
