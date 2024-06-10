import { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";

function Meals() {
  const { setHeaderTitle } = useContext(AppContext)

  useEffect((
  ) => {
    setHeaderTitle('Meals')
  }, [])

  return (
    <section>
      <h1>Meals</h1>
    </section>
  )
}

export default Meals;