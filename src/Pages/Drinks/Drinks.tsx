import { useContext, useEffect } from "react";
import AppContext from "../../Context/AppContext";

function Drinks() {

  const { setHeaderTitle } = useContext(AppContext)

  useEffect((
  ) => {
    setHeaderTitle('Drinks')
  }, []);

  return (
    <section>
      <h1>Drinks</h1>
    </section>
  )
};

export default Drinks;