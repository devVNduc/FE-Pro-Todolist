import './App.css'
import { useFetching } from './customHook/useFetching'
import { render } from './common/renderHelper';
import { Skeleton } from 'antd'
function App() {
  const {data, loading, error} = useFetching('/tasks')
  const screen = <>
  <header className="masthead">
    <div className="boards-menu">
      <button className="boards-btn btn"><i className="fab fa-trello boards-btn-icon"></i>Boards</button>
      <div className="board-search">
        <input type="search" className="board-search-input" aria-label="Board Search" />
        <i className="fas fa-search search-icon" aria-hidden="true"></i>
      </div>
    </div>
    <div className="logo">
      <h1><i className="fab fa-trello logo-icon" aria-hidden="true"></i>TodoList Pro</h1>
    </div>
    <div className="user-settings">
      <button className="user-settings-btn btn" aria-label="Create">
        <i className="fas fa-plus" aria-hidden="true"></i>
      </button>
      <button className="user-settings-btn btn" aria-label="Information">
        <i className="fas fa-info-circle" aria-hidden="true"></i>
      </button>
      <button className="user-settings-btn btn" aria-label="Notifications">
        <i className="fas fa-bell" aria-hidden="true"></i>
      </button>
      <button className="user-settings-btn btn" aria-label="User Settings">
        <i className="fas fa-user-circle" aria-hidden="true"></i>
      </button>
    </div>
  </header>

  <section className="board-info-bar">
    <div className="board-controls">
      <button className="board-title btn">
        <h2>Web Development</h2>
      </button>
      <button className="star-btn btn" aria-label="Star Board">
        <i className="far fa-star" aria-hidden="true"></i>
      </button>
      <button className="personal-btn btn">Personal</button>
      <button className="private-btn btn"><i className="fas fa-briefcase private-btn-icon" aria-hidden="true"></i>Private</button>
    </div>
    <button className="menu-btn btn"><i className="fas fa-ellipsis-h menu-btn-icon" aria-hidden="true"></i>Show Menu</button>
  </section>
  <section className="lists-container">
    <div className="list">
      <h3 className="list-title">Tasks to Do</h3>
      <ul className="list-items">
        {
          loading ? Array(10).fill(0).map((item, index)=><Skeleton key={index} active />) : 
          data?.map(item=>{
            return <li key={item?.id}>{item?.attributes?.title}</li>
          })
        }
      </ul>
      <button className="add-card-btn btn">Add a card</button>
    </div>
    <button className="add-list-btn btn">Add a list</button>
  </section>
  </> 
  return render(loading, error, screen)
}

export default App
