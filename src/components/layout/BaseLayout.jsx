import Header from "./Header";
import BoardInfoBar from "./BoardInfoBar";
function BaseLayout({ children }) {
  return (
    <div className="base-layout">
      <Header/>
      <BoardInfoBar/>
      <main>{children}</main>
    </div>
  );
}

export default BaseLayout;