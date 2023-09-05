import { Skeleton, Pagination } from 'antd'
import { useFetching } from '@/customHook/useFetching'
import { render } from '@/common/renderHelper'
import { ReloadOutlined } from '@ant-design/icons'
import {Button} from 'antd'

export default function TaskList(props){
    const {data, loading, error, page, loadPage, reload} = useFetching('/tasks')
    const element = <div className="list">
    <h3 className="list-title">{props.title}</h3>
    <Pagination 
    showSizeChanger
    onChange={(pageNumber, pageSize)=>{
      loadPage(pageNumber, pageSize)
    }} current={page.page} total={page.total} pageSize={page.pageSize}/>;
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

    let btnReload = <Button 
      icon={<ReloadOutlined />} 
      onClick={()=>{
        reload()
      }}>Reload</Button>
    return render(
      loading,
      error,
      element,
      btnReload
    )
}