import { useContext, useEffect } from "react"
import AppContext from "../../Context/AppContext"

function Profile() {

  const { setHeaderTitle } = useContext(AppContext)

  useEffect((
  ) => {
    setHeaderTitle('Profile')
  }, [])

  return (
    <section>
      <h1>
        Profile
      </h1>
    </section>
  )
}

export default Profile