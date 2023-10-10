import { Skeleton, Pagination, Input, Space, Form } from 'antd'
import { useFetching } from '@/customHook/useFetching'
import { render } from '@/common/renderHelper'
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons'
import {Button} from 'antd'
import {getTasks, createTask} from '@/services/task'
import { useState, useRef } from 'react'
import TaskDetailModal from '../Modals/TaskDetail'
import { openModal } from '@/redux/modal'
import { useDispatch } from 'react-redux'
export default function TaskList(props){
    
    const pendingCallAPI = useRef(null)
    const [form] = Form.useForm();
    const [isAddNew, setIsAddNew] = useState(false) 
    const {data, loading, error, page, loadPage, reload} = useFetching(getTasks)
    const dispatch = useDispatch()
    function toggleAddNew(){
      setIsAddNew(!isAddNew)
    }
    async function handleAddNew(values){
      try {
        let {title} = values
        form.resetFields();
        pendingCallAPI.current.disabled = true
        await createTask(title)
        pendingCallAPI.current.disabled = false
        reload()
        setIsAddNew(false)
      } catch (error) {
        console.log('loi', error);
      }
    }
    function handleOpenModal(task){
      dispatch(openModal(task))
    }
    
    const inputNewArea = (
      <Form 
        onFinish={handleAddNew}
        form={form}
      >
        <Space>
          <Form.Item name='title' style={{marginBottom: 0}}>
            <Input placeholder='Enter Task Title'></Input>
          </Form.Item>
          <Button ref={pendingCallAPI} type='primary' htmlType='submit'>Add</Button>
          <CloseOutlined onClick={toggleAddNew}/>
        </Space>
      </Form>
    )

    const element = (
      <>
        <TaskDetailModal 
          onOk={()=>{
            reload()
          }}
        />
        <div className="list">
          <h3 className="list-title">{props.title}</h3>
          <Pagination 
          showSizeChanger
          onChange={(pageNumber, pageSize)=>{
            loadPage(pageNumber, pageSize)
          }} current={page.page} total={page.total} pageSize={page.pageSize}/>
          <ul className="list-items">
            {
              loading ? Array(10).fill(0).map((item, index)=><Skeleton key={index} active />) : 
              data?.sort((task1, task2)=>{
                let timeTask1 = new Date(task1?.attributes?.createdAt)
                let timeTask2 = new Date(task2?.attributes?.createdAt)
                if(timeTask1 > timeTask2) return 1
                if(timeTask1 < timeTask2) return -1
                if(timeTask1 == timeTask2) return 0
              }).map(item=>{
                return <li key={item?.id} onClick={()=>{
                  handleOpenModal(item)
                }}>{item?.attributes?.title}</li>
              })
            }
          </ul>
        
          {
            isAddNew ? 
            inputNewArea : 
            <button className="add-card-btn btn" onClick={toggleAddNew}>Add a card</button>
          }
        </div>
      </>
    )
    

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