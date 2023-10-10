import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, DatePicker, Input, Select } from "antd"
import { closeModal } from "@/redux/modal"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from "react"
import { updateTask } from "@/services/task";
import useNotification from '@/customHook/useNotify'
dayjs.extend(customParseFormat);


export default function TaskDetailModal(props){
    const showDetailTaskModal = useSelector(state => state.modal.showDetailTaskModal)
    const data = useSelector(state => state.modal.dataDetailTaskModal)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const {contextHolder, infoNotify, errorNotify } = useNotification()
    function handleOk(){
        form.submit()
    }
    function handleCancel(){
        if(typeof props.onCancel == 'function') {props.onCancel()}
        dispatch(closeModal())
    }
  
    let arrStatus = [
        {
        value: true,
        label: 'Done',
        },
        {
        value: false,
        label: 'Doing',
        },
    ]
    async function handleUpdate(values){
        try {
            let id = data?.id
            await updateTask(id, values)
            if(typeof props.onOk == 'function') {props.onOk()}
            infoNotify('topRight', 'Cập nhật thành công', `Cập nhật task id: ${id}`)
            dispatch(closeModal())
        } catch (error) {
            errorNotify('topRight', 'Cập nhật thất bại', `Cập nhật task id: ${id}`)
        }
    }
    useEffect(() => {
        let date = data?.attributes?.date ? dayjs(data?.attributes?.date) : undefined
        form.setFieldsValue({
            title: data?.attributes?.title,
            complete: data?.attributes?.complete,
            date: date
        });
    }, [data?.attributes, form]);
    return (
        <>
            {contextHolder}
            <Modal forceRender title={data?.id || "Detail Task"} open={showDetailTaskModal} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    form={form}
                    onFinish={handleUpdate}
                >   
                    <Form.Item name="title">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="complete">
                        <Select
                            options={arrStatus}
                        />
                    </Form.Item>
                    <Form.Item name="date">
                        <DatePicker 
                            format="YYYY/MM/DD"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}