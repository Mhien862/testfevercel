import { RouterProvider } from "react-router-dom";
import router from "./router";

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};
export default App;
