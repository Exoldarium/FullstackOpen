import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer";

export default function Filter() {
  const dispatch = useDispatch();

  function handleChange(e) {
    const { value } = e.target;
    return dispatch(setFilter(value));
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}