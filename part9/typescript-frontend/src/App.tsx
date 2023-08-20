import Content from "./components/Content";
import Header from "./components/Header";
import { courseParts } from "./data/courseData";
import Total from "./components/Total";

export interface CourseData {
  name: string;
  exerciseCount: number;
}


const App = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;