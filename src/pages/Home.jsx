import TaskList from '@/components/taskList';
import {
    DatePicker
} from 'antd'
import { useDispatch } from 'react-redux';
import { updateFilterDate } from '@/redux/taskList';
const { RangePicker } = DatePicker;
export default function Home(){
    const dispatch = useDispatch()
    return (
        <section className="lists-container">
              <RangePicker 
                onChange={(values)=>{
                    if(!values){
                        values = [null, null]
                    }
                    let startDate = values[0]?.format('YYYY-MM-DD') 
                    let endDate = values[1]?.format('YYYY-MM-DD')
                    dispatch(updateFilterDate({
                        startDate: startDate,
                        endDate: endDate,
                    }))
                }}
            />
                <TaskList title="Đã xong" topic='done'></TaskList>
                <TaskList title="Chưa hoàn thành" topic='doing'></TaskList>
        </section>
    )
}