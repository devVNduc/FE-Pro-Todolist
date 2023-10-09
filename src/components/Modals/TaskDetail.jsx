import { useDispatch, useSelector } from "react-redux"
import { Modal, Form, DatePicker, Input, Select } from "antd"
import { closeModal } from "@/redux/modal"
import dayjs from "dayjs"
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect } from "react"
dayjs.extend(customParseFormat);


export default function TaskDetailModal(props){
    const showDetailTaskModal = useSelector(state => state.modal.showDetailTaskModal)
    const data = useSelector(state => state.modal.dataDetailTaskModal)
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    function handleOk(){
        //todo save
        if(typeof props.ok == 'function') {props.ok()}
        dispatch(closeModal())
        form.submit()
    }
    function handleCancel(){
        if(typeof props.cancel == 'function') {props.cancel()}
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
    function onFinish(values){
        
    }
    useEffect(() => {
        form.setFieldsValue(data?.attributes);
    }, [data?.attributes, form]);
    return (
        <Modal forceRender title={data?.id || "Detail Task"} open={showDetailTaskModal} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                initialValues={{
                    title: data?.attributes?.title,
                    complete: data?.attributes?.complete,
                    date: data?.attributes?.date
                }}
                onFinish={onFinish}
            >
                <Form.Item name="title">
                    <Input value={data?.attributes?.title}></Input>
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
    )
}