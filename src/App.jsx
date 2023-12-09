import { BrowserRouter, Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import Articles from "./components/Articles";
import ArticleDetails from "./components/ArticleDetails";

const App = () => {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path={`/details/:id`} element={<ArticleDetails/>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
