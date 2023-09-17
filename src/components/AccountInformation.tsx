import React, { useState } from 'react'
import { Button, Input, Space, message } from 'antd'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'

interface Props {
    PrevStep: () => void
    onSubmit: (data: {username: string; password:string}) => void
}

interface UsersRegist {
    [key: string]: string
    username: string
    password: string
}

const AccountInformation: React.FC<Props> = ({PrevStep, onSubmit}) => {
    const [UsersRegist, setUsersRegist] = useState<UsersRegist> ({
        username: '',
        password: '',
    })

    const [messageApi, contextHolder] = message.useMessage()
    const info = () => {
        messageApi.info('Data Successfully Register')
    }

    return(
        <div>
            <Formik initialValues={UsersRegist} validationSchema={Yup.object().shape({
                username: Yup.string().required(),
                password: Yup.string().required().matches(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/,'Strong Password Validation (at least 8 Characters with alphanumeric)'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                if(Object.keys(values).some((key) => values[key] === '')){
                    setSubmitting(false)
                }

                else {
                    setUsersRegist ({...UsersRegist, ...values})
                    onSubmit(values)
                }
            }}
            >
                <Form>
                    <div>
                        <label htmlFor='username'>Username:</label>
                        <Field type="text" id="username" name="username" as={Input} className='field' rules={[{ required: true }]}/>
                        <ErrorMessage name="username" component="div" className="Error Message"/>
                    
                        <label htmlFor='password'>Password:</label>
                        <Field type="password" id="password" name="password" as={Input.Password} className='field' rules={[{ required: true }]}/>
                        <ErrorMessage name="password" component="div" className="Error Message"/>
                    </div>

                    <Space wrap>
                        <Button onClick={PrevStep}>Previous Page</Button>
                        {contextHolder}
                        <Button type='primary' htmlType='submit' onClick={info}>Register</Button>
                    </Space>
                </Form>
            </Formik>
        </div>
    )
}

export default AccountInformation