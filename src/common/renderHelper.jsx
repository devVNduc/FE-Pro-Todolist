import { Button, Result, Spin } from 'antd';
export function render(loading, error, element){
    if(error){
      return  <Result
      status="500"
      title="500"
      subTitle={error.message}
      extra={<Button type="primary">Back Home</Button>}
    />
    }
  
    return <Spin tip="Loading" size="large" spinning={loading}>
      {element}
    </Spin>
}