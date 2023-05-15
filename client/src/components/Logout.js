
export default function Logout(){

    function handleLogout(){
        fetch("logout", {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(() => {
            // reset states
        })
    }

    return (
      <button onClick={handleLogout}>Logout</button>
    )
}